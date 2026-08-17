import React from 'react';
import type { Metadata } from "next";
import { Inter, Playfair_Display, Mulish } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://primeqasolutions.com"),
  title: "Prime-QA Solutions | AI-Powered Quality Engineering",
  description:
    "PrimeQA delivers enterprise-grade QA services powered by AI — from automated testing to end-to-end quality engineering solutions that help you ship faster with confidence.",
};

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/layout/providers";
import LazyCookieConsent from "@/components/sections/shared/cookie/lazy-cookie-consent";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { AiSummaryButton } from "@/components/ui/ai-summary-button";
import { JsonLd } from "@/components/seo/json-ld";
import { generateGlobalJsonLd } from "@/lib/utils/jsonld";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${inter.variable}  ${playfairDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to Strapi assets CDN for faster image/asset loading */}
        <link rel="preconnect" href="https://assets.primeqasolutions.com" />
        <link
          rel="dns-prefetch"
          href="https://assets.primeqasolutions.com"
        />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          {/* <AiSummaryButton /> */}
        </Providers>

        <LazyCookieConsent />
        <JsonLd data={generateGlobalJsonLd()} />
      </body>
    </html>
  );
}
