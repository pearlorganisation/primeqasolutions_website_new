/**
 * Become a Partner — Dynamic Page (Single Type)
 * ──────────────────────────────────────────────
 * Fetches all page content from Strapi (Single Type: api::become-partner.become-partner).
 * Renders dynamic sections via SectionRenderer + becomePartnerBlockRegistry.
 *
 * Rendering Strategy:
 *  • SSG  — page is pre-rendered at build time
 *  • ISR  — revalidates every 60 seconds in the background
 *  • SEO  — dynamic metadata via mapStrapiSeoToMetadata utility
 */

import type { Metadata } from "next";
import { getBecomePartnerPageData } from "@/http/become-partner";
import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { becomePartnerBlockRegistry } from "@/lib/utils/block-registry";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { generateCompanyPageJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

// ─── ISR Config ───────────────────────────────────────────────────────────────


// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const data = await getBecomePartnerPageData();
  return mapStrapiSeoToMetadata(data?.meta_data);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BecomePartnerPage() {
  const data = await getBecomePartnerPageData();

  // Gracefully handle: no entry in Strapi yet, or entry is not published
  if (!data) {
    return <main />;
  }

  const sections = Array.isArray(data.page_section) ? data.page_section : [];

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(even)]:bg-section-bg">
      <JsonLd data={generateCompanyPageJsonLd({
          path: "/company/become-a-partner",
          name: "Become a Partner | PrimeQA",
          description: "Partner with PrimeQA to deliver world-class quality engineering solutions. Explore partnership opportunities.",
          breadcrumbLabel: "Become a Partner",
          pageSections: sections,
        })} />
      <SectionRenderer sections={sections} registry={becomePartnerBlockRegistry} />
    </main>
  );
}
