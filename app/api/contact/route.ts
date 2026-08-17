import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// ─── Input Validation Schema ──────────────────────────────────────────────────

const ContactSchema = z.object({
  fullname: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(/^[\p{L}\p{M}\s'\-\.]+$/u, 'Name contains invalid characters'),
  company: z.string().max(150).optional().default(''),
  email: z.email({ message: 'Invalid email address' }).max(255),
  phone_no: z
    .string()
    .max(30)
    .regex(/^[\d\s\+\-\(\)]*$/, 'Invalid phone number format')
    .optional()
    .default(''),
  how_we_can_help: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message is too long'),
  page_url: z.url().optional().or(z.literal('')),
  cf_token: z.string().optional(),
});

// ─── In-Memory Rate Limiter ───────────────────────────────────────────────────
// Simple sliding window per IP. For production, use @upstash/ratelimit with Redis.
// This in-process store resets on cold starts, but is sufficient for basic abuse prevention.

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3;   // max 3 submissions per IP per minute

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now >= record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: record.resetAt - now };
  }

  record.count++;
  return { allowed: true, retryAfterMs: 0 };
}

// ─── HTML Sanitizer ───────────────────────────────────────────────────────────
// Escapes user input to prevent XSS in the HTML email body.

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  // 1. Rate limit by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const { allowed, retryAfterMs } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please wait before submitting again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) },
      }
    );
  }

  // 2. Parse + validate input
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const parseResult = ContactSchema.safeParse(rawBody);
  if (!parseResult.success) {
    const fieldErrors = parseResult.error.flatten().fieldErrors;
    return NextResponse.json(
      { success: false, error: 'Validation failed.', details: fieldErrors },
      { status: 422 }
    );
  }

  const data = parseResult.data;

  // 3. Verify Cloudflare Turnstile token
  const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
  if (TURNSTILE_SECRET_KEY) {
    if (!data.cf_token) {
      return NextResponse.json(
        { success: false, error: 'Captcha verification failed. Please try again.' },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    formData.append('secret', TURNSTILE_SECRET_KEY);
    formData.append('response', data.cf_token);
    formData.append('remoteip', ip);

    try {
      const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: formData,
      });
      const turnstileData = await turnstileRes.json();
      
      if (!turnstileData.success) {
        return NextResponse.json(
          { success: false, error: 'Captcha verification failed. Please try again.' },
          { status: 400 }
        );
      }
    } catch (err) {
      console.error('Turnstile verification error:', err);
      return NextResponse.json(
        { success: false, error: 'Captcha verification service error.' },
        { status: 500 }
      );
    }
  }

  // 4. Build sanitized HTML email body
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const safeData = {
      fullname: escapeHtml(data.fullname),
      company: escapeHtml(data.company),
      email: escapeHtml(data.email),
      phone_no: escapeHtml(data.phone_no),
      how_we_can_help: escapeHtml(data.how_we_can_help),
      page_url: data.page_url ? escapeHtml(data.page_url) : 'Unknown',
    };

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      replyTo: data.email,
      subject: `New Contact Form Submission from ${safeData.fullname}`,
      html: `
        <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
          <em>This message was submitted via the PrimeQA website contact form.</em>
        </p>
        <table cellpadding="8" style="border-collapse:collapse;">
          <tr><td><strong>Name</strong></td><td>${safeData.fullname}</td></tr>
          <tr><td><strong>Company</strong></td><td>${safeData.company || 'N/A'}</td></tr>
          <tr><td><strong>Email</strong></td><td>${safeData.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${safeData.phone_no || 'N/A'}</td></tr>
          <tr><td><strong>Submitted From</strong></td><td><a href="${safeData.page_url}">${safeData.page_url}</a></td></tr>
        </table>
        <br />
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;background:#f8f9fa;padding:12px;border-radius:4px;">${safeData.how_we_can_help}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
