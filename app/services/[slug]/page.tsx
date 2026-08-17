/**
 * /services/[slug] — Service Detail Page
 * ──────────────────────────────────────
 * Rendering strategy: SSG + ISR
 *
 *  • generateStaticParams  → pre-renders all known service slugs at build time
 *  • export revalidate     → revalidates stale pages in the background (ISR)
 *  • dynamicParams = true  → new slugs added in Strapi are rendered on first request
 *                            then cached — no rebuild needed
 *  • notFound()            → 404 for slugs that don't exist in Strapi
 *
 * SEO:
 *  • generateMetadata pulls title/description/OG from Strapi per slug
 *  • Canonical URL, OG image, Twitter card all set via mapStrapiSeoToMetadata
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePageData, getAllServiceSlugs } from "@/http/service";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { ServiceSectionRenderer } from "@/app/services/section-renderer";
import { CtaForm } from "@/components/sections/shared/cta-form";
import { generateServiceJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { toSlugStaticParams } from "@/lib/utils/static-params";

// ─── ISR Config ────────────────────────────────────────────────────────────────

/** Revalidate every 60 seconds in the background (ISR) */

/**
 * Allow slugs not in generateStaticParams to be rendered on-demand and cached.
 * Set to false if you want a hard 404 for any slug not returned at build time.
 */

// ─── Static Params (SSG) ───────────────────────────────────────────────────────

/**
 * Pre-render all published service slugs at build time.
 * Next.js calls this once during `next build`.
 */
export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return toSlugStaticParams(slugs);
}

// ─── Metadata (per-slug SEO) ───────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServicePageData(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      robots: { index: false, follow: false },
    };
  }

  return mapStrapiSeoToMetadata(service.meta_data, {
    defaultTitle: service.title,
    defaultCanonical: `/services/${slug}`,
    defaultOpenGraphType: "website",
  });
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServicePageData(slug);

  // Hard 404 — unknown or unpublished slug
  if (!service) {
    notFound();
  }

  const sections = service.page_section ?? [];

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(2)]:bg-white [&>*:nth-child(even)]:bg-section-bg [&>*:last-child]:border-0! [&>*:last-child]:bg-white!">
      <JsonLd data={generateServiceJsonLd(service)} />
      <ServiceSectionRenderer sections={sections} />
      <CtaForm/>
    </main>
  );
}
