/**
 * /product/[slug] — Product Detail Page
 * ──────────────────────────────────────
 * Rendering strategy: SSG + ISR
 *
 *  • generateStaticParams  → pre-renders all known product slugs at build time
 *  • export revalidate     → revalidates stale pages in the background (ISR)
 *  • dynamicParams = true  → new slugs added in Strapi are rendered on first request
 *                            then cached — no rebuild needed
 *  • notFound()            → 404 for slugs that don't exist in Strapi
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProductSlugs } from "@/http/product";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { ProductSectionRenderer } from "./section-renderer";
import { generateAcceleratorJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { toSlugStaticParams } from "@/lib/utils/static-params";

// ─── ISR Config ────────────────────────────────────────────────────────────────


// ─── Static Params (SSG) ───────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return toSlugStaticParams(slugs);
}

// ─── Metadata (per-product SEO) ────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  // Use the mapStrapiSeoToMetadata utility, similar to service pages
  return mapStrapiSeoToMetadata(product.meta_data, {
    defaultTitle: product.name,
    defaultCanonical: `/accelerators/${slug}`,
    defaultOpenGraphType: "website",
  });
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // Hard 404 — unknown or unpublished product slug
  if (!product) {
    notFound();
  }

  const sections = product.page_section ?? [];

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(2)]:bg-white [&>*:nth-child(even)]:bg-section-bg">
      <JsonLd data={generateAcceleratorJsonLd(product)} />
      {sections.length > 0 ? (
        <ProductSectionRenderer sections={sections} />
      ) : (
        <div className="py-20 text-center text-neutral-500">
          <p>No content sections found for this product.</p>
        </div>
      )}
    </main>
  );
}
