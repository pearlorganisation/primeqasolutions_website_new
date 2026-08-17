/**
 * /industries/[slug] — Industry Detail Page
 * ──────────────────────────────────────────
 * Rendering strategy: SSG + ISR
 *
 *  • generateStaticParams  → pre-renders all known industry slugs at build time
 *  • export revalidate     → revalidates stale pages in the background (ISR)
 *  • dynamicParams = true  → new slugs added in Strapi are rendered on first
 *                            request then cached — no rebuild needed
 *  • notFound()            → hard 404 for slugs that don't exist in Strapi
 *
 * SEO:
 *  • generateMetadata pulls title/description/OG from Strapi per slug
 *  • Canonical URL, OG image, and Twitter card set via mapStrapiSeoToMetadata
 *  • Robots meta falls back to noindex/nofollow on missing pages
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustryPageData, getAllIndustrySlugs } from "@/http/industry";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { IndustrySectionRenderer } from "./section-renderer";
import { generateIndustryJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { toSlugStaticParams } from "@/lib/utils/static-params";

// ─── ISR Config ────────────────────────────────────────────────────────────────

/** Revalidate every 60 seconds in the background (ISR) */

/**
 * Allow slugs not returned by generateStaticParams to be rendered on-demand
 * and then cached. Set to false to hard-404 any unknown slug.
 */

// ─── Static Params (SSG) ───────────────────────────────────────────────────────

/**
 * Pre-render all published industry slugs at build time.
 * Next.js calls this once during `next build`.
 */
export async function generateStaticParams() {
  const slugs = await getAllIndustrySlugs();
  return toSlugStaticParams(slugs);
}

// ─── Metadata (per-slug SEO) ───────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getIndustryPageData(slug);

  if (!pageData) {
    return {
      title: "Industry Not Found",
      robots: { index: false, follow: false },
    };
  }

  return mapStrapiSeoToMetadata(pageData.meta_data, {
    defaultTitle: pageData.name,
    defaultCanonical: `/industries/${slug}`,
    defaultOpenGraphType: "website",
  });
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = await getIndustryPageData(slug);
  // Hard 404 — unknown or unpublished slug
  if (!pageData) {
    notFound();
  }

  const sections = pageData.page_section ?? [];

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(2)]:bg-white! [&>*:nth-child(even)]:bg-section-bg">
      <JsonLd data={generateIndustryJsonLd(pageData)} />
      <IndustrySectionRenderer sections={sections} />
    </main>
  );
}
