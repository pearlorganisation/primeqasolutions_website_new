/**
 * Engagement Model — Dynamic Page (Single Type)
 * ──────────────────────────────────────────────
 * Fetches all page content from Strapi (Single Type: api::engagement-models.engagement-models).
 * Renders dynamic sections via SectionRenderer + engagementModelBlockRegistry.
 *
 * Rendering Strategy:
 *  • SSG  — page is pre-rendered at build time
 *  • ISR  — revalidates every 60 seconds in the background
 *  • SEO  — dynamic metadata via mapStrapiSeoToMetadata utility
 */

import type { Metadata } from "next";
import { getEngagementModelPageData } from "@/http/engagement-model";
import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { engagementModelBlockRegistry } from "@/lib/utils/block-registry";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { generateCompanyPageJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

// ─── ISR Config ───────────────────────────────────────────────────────────────


// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const data = await getEngagementModelPageData();
  return mapStrapiSeoToMetadata(data?.meta_data);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EngagementModelPage() {
  const data = await getEngagementModelPageData();

  if (!data) {
    return <main />;
  }

  const sections = Array.isArray(data.page_section) ? data.page_section : [];

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(even)]:bg-section-bg">
      <JsonLd data={generateCompanyPageJsonLd({
          path: "/company/engagement-model",
          name: "Engagement Model | PrimeQA",
          description: "Explore PrimeQA's flexible engagement models — dedicated teams, project-based, or staff augmentation to match your QA needs.",
          breadcrumbLabel: "Engagement Model",
          pageSections: sections,
        })} />
      <SectionRenderer sections={sections} registry={engagementModelBlockRegistry} />
    </main>
  );
}
