/**
 * About Us — Dynamic Page
 * ────────────────────────
 * Fetches all page content from Strapi (Single Type: api::about-us.about-us).
 * Renders dynamic sections via SectionRenderer + aboutUsBlockRegistry.
 * Falls back to static content if Strapi is unavailable (dev/offline).
 */

import type { Metadata } from "next";
import { getAboutUsPageData } from "@/http/about-us";
import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { aboutUsBlockRegistry } from "@/lib/utils/block-registry";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { generateAboutJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

// ─── ISR Config ───────────────────────────────────────────────────────────────


// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutUsPageData();
  return mapStrapiSeoToMetadata(data?.meta_data, {
    defaultTitle: "About Us | PrimeQA",
    defaultDescription:
      "Learn about PrimeQA — our mission, values, and the team behind our quality assurance expertise.",
    defaultCanonical: "/company/about-us",
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AboutUsPage() {
  const data = await getAboutUsPageData();
  const sections = Array.isArray(data?.page_section) ? data.page_section : [];
  const jsonLd = generateAboutJsonLd({ pageSections: sections });

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(2)]:bg-white [&>*:nth-child(even)]:bg-section-bg">
      <JsonLd data={jsonLd} />
      <SectionRenderer sections={sections} registry={aboutUsBlockRegistry} />
  </main>
  );
}
