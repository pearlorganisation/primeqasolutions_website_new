/**
 * /hire-qa-engineers/[slug] — Hire QA Engineer Detail Page
 * ────────────────────────────────────────────────────────
 * Rendering strategy: SSG + ISR
 *
 *  • generateStaticParams  → pre-renders all known slugs at build time
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
import { getHireQaEngineerPageData, getAllHireQaEngineerSlugs } from "@/http/hire-qa-engineer";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { HireQaEngineerSectionRenderer } from "../section-renderer";
import { toSlugStaticParams } from "@/lib/utils/static-params";

// ─── ISR Config ────────────────────────────────────────────────────────────────


// ─── Static Params (SSG) ───────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllHireQaEngineerSlugs();
  return toSlugStaticParams(slugs);
}

// ─── Metadata (per-slug SEO) ───────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getHireQaEngineerPageData(slug);

  if (!pageData) {
    return {
      title: "Page Not Found",
      robots: { index: false, follow: false },
    };
  }

  return mapStrapiSeoToMetadata(pageData.meta_data);
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function HireQaEngineerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = await getHireQaEngineerPageData(slug);

  // Hard 404 — unknown or unpublished slug
  if (!pageData) {
    notFound();
  }

  const sections = pageData.page_section ?? [];

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(2)]:bg-white! [&>*:nth-child(even)]:bg-section-bg">
      <HireQaEngineerSectionRenderer sections={sections} />
    </main>
  );
}
