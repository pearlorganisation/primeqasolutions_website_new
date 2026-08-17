import { NextResponse } from "next/server";
import { STRAPI_URL, STRAPI_TOKEN } from "@/http/client";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const resume = formData.get("resume") as File | null;
    if (!resume) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
    }

    // ── Step 0: Verify Cloudflare Turnstile token ─────────────────────────
    const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;
    if (TURNSTILE_SECRET_KEY) {
      const cf_token = formData.get("cf_token") as string | null;
      if (!cf_token) {
        return NextResponse.json(
          { error: 'Captcha verification failed. Please try again.' },
          { status: 400 }
        );
      }

      const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        request.headers.get('x-real-ip') ??
        'unknown';

      const turnstileFormData = new URLSearchParams();
      turnstileFormData.append('secret', TURNSTILE_SECRET_KEY);
      turnstileFormData.append('response', cf_token);
      turnstileFormData.append('remoteip', ip);

      try {
        const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          body: turnstileFormData,
        });
        const turnstileData = await turnstileRes.json();
        
        if (!turnstileData.success) {
          return NextResponse.json(
            { error: 'Captcha verification failed. Please try again.' },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error('Turnstile verification error:', err);
        return NextResponse.json(
          { error: 'Captcha verification service error.' },
          { status: 500 }
        );
      }
    }

    // ── Step 1: Upload the resume file to Strapi ───────────────────────────
    const uploadForm = new FormData();
    uploadForm.append("files", resume);

    const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: uploadForm,
    });

    if (!uploadRes.ok) {
      const uploadErr = await uploadRes.json().catch(() => null);
      throw new Error(
        uploadErr?.error?.message ?? `Resume upload failed (${uploadRes.status})`
      );
    }

    const uploadedFiles = await uploadRes.json();
    const fileId = uploadedFiles?.[0]?.id;

    if (!fileId) {
      throw new Error("Resume upload failed: no file ID was returned.");
    }

    // ── Step 2: Create the career-application entry ────────────────────────
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || null;
    const linkedin = (formData.get("linkedin") as string) || null;
    const message = (formData.get("message") as string) || null;

    const entryRes = await fetch(`${STRAPI_URL}/api/career-applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          firstName,
          lastName,
          email,
          phone,
          linkedin,
          message,
          resume: fileId,
        },
      }),
    });

    if (!entryRes.ok) {
      const entryErr = await entryRes.json().catch(() => null);
      throw new Error(
        entryErr?.error?.message ?? `Application submission failed (${entryRes.status})`
      );
    }

    const json = await entryRes.json();

    // ── Step 3: Send Email Notification to Admin/HR ─────────────────────────
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const buffer = Buffer.from(await resume.arrayBuffer());

      const safeData = {
        firstName: escapeHtml(firstName),
        lastName: escapeHtml(lastName),
        email: escapeHtml(email),
        phone: escapeHtml(phone || ""),
        linkedin: escapeHtml(linkedin || ""),
        message: escapeHtml(message || ""),
      };

      const linkedinHtml = safeData.linkedin
        ? `<a href="${safeData.linkedin}">${safeData.linkedin}</a>`
        : "N/A";

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.SMTP_TO,
        replyTo: email,
        subject: `New Career Application from ${safeData.firstName} ${safeData.lastName}`,
        html: `
          <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
            <em>This application was submitted via the PrimeQA website careers form.</em>
          </p>
          <table cellpadding="8" style="border-collapse:collapse;">
            <tr><td><strong>Name</strong></td><td>${safeData.firstName} ${safeData.lastName}</td></tr>
            <tr><td><strong>Email</strong></td><td>${safeData.email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${safeData.phone || "N/A"}</td></tr>
            <tr><td><strong>LinkedIn</strong></td><td>${linkedinHtml}</td></tr>
          </table>
          <br />
          <p><strong>Message / Cover Letter:</strong></p>
          <p style="white-space:pre-wrap;background:#f8f9fa;padding:12px;border-radius:4px;">${safeData.message || "No message provided."}</p>
        `,
        attachments: [
          {
            filename: resume.name,
            content: buffer,
            contentType: resume.type,
          },
        ],
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("[CAREER_APPLICATION_EMAIL_ERROR]:", emailError);
      // We don't fail the request if the email fails, since Strapi saved it successfully.
    }

    return NextResponse.json({ data: json?.data ?? json });

  } catch (error: any) {
    console.error("[CAREER_APPLICATION_API_ERROR]:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
