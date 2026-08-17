/**
 * Life at PrimeQA — Dynamic Page (Single Type)
 * ──────────────────────────────────────────────
 * Fetches all page content from Strapi (Single Type: api::life-at-primeqa.life-at-primeqa).
 * Renders dynamic sections via SectionRenderer + lifeAtPrimeqaBlockRegistry.
 *
 * Rendering Strategy:
 *  • SSG  — page is pre-rendered at build time
 *  • ISR  — revalidates every 60 seconds in the background
 *  • SEO  — dynamic metadata via mapStrapiSeoToMetadata utility
 */

import type { Metadata } from "next";
import { getLifeAtPrimeqaPageData } from "@/http/life-at-primeqa";
import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { lifeAtPrimeqaBlockRegistry } from "@/lib/utils/block-registry";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { generateCompanyPageJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

// ─── ISR Config ───────────────────────────────────────────────────────────────


// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const data = await getLifeAtPrimeqaPageData();
  return mapStrapiSeoToMetadata(data?.meta_data);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LifeAtPrimeqaPage() {
  const data = await getLifeAtPrimeqaPageData();

  if (!data) {
    return <main />;
  }

  const sections = Array.isArray(data.page_section) ? data.page_section : [];

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(even)]:bg-section-bg">
      <JsonLd data={generateCompanyPageJsonLd({
          path: "/company/life-at-primeqa",
          name: "Life at PrimeQA",
          description: "Discover what it's like to work at PrimeQA — our culture, values, benefits, and the team behind our quality engineering excellence.",
          breadcrumbLabel: "Life at PrimeQA",
          pageSections: sections,
        })} />
      <SectionRenderer sections={sections} registry={lifeAtPrimeqaBlockRegistry} />
    </main>
  );
}
