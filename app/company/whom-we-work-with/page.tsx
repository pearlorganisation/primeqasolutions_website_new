/**
 * Whom We Work With — Dynamic Page (Single Type)
 * ──────────────────────────────────────────────
 * Fetches all page content from Strapi (Single Type: api::whom-we-work-with.whom-we-work-with).
 * Renders dynamic sections via SectionRenderer + whomWeWorkWithBlockRegistry.
 *
 * Rendering Strategy:
 *  • SSG  — page is pre-rendered at build time
 *  • ISR  — revalidates every 60 seconds in the background
 *  • SEO  — dynamic metadata via mapStrapiSeoToMetadata utility
 */

import type { Metadata } from "next";
import { getWhomWeWorkWithPageData } from "@/http/whom-we-work-with";
import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { whomWeWorkWithBlockRegistry } from "@/lib/utils/block-registry";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { generateCompanyPageJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

// ─── ISR Config ───────────────────────────────────────────────────────────────


// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const data = await getWhomWeWorkWithPageData();
  return mapStrapiSeoToMetadata(data?.meta_data);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function WhomWeWorkWithPage() {
  const data = await getWhomWeWorkWithPageData();

  // Gracefully handle: no entry in Strapi yet, or entry is not published
  if (!data) {
    return <main />;
  }

  const sections = Array.isArray(data.page_section) ? data.page_section : [];

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(even)]:bg-section-bg">
      <JsonLd data={generateCompanyPageJsonLd({
          path: "/company/whom-we-work-with",
          name: "Whom We Work With | PrimeQA",
          description: "Discover the industries and companies PrimeQA partners with to deliver world-class quality engineering solutions.",
          breadcrumbLabel: "Whom We Work With",
          pageSections: sections,
        })} />
      <SectionRenderer sections={sections} registry={whomWeWorkWithBlockRegistry} />
    </main>
  );
}
