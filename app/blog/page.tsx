import { Suspense } from "react";
import type { Metadata } from "next";
import { BlogListing } from "@/components/sections/pages/blog/blog-listing";
import { SectionHero } from "@/components/sections/shared/section-hero";
import { BlogListingSkeleton } from "@/components/sections/pages/blog/blog-listing-skeleton";
import { Container } from "@/components/ui/container";
import { generateBlogListingJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

// ─── ISR — revalidate every 60 seconds ─────────────────────────────────────────

// ─── SEO ───────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Blog & Insights | PrimeQA — Software Quality Engineering",
  alternates:{
    canonical:"/blog",
  },
  description:
    "Expert articles on AI-powered testing, QA automation, software quality strategy, and engineering best practices — written by PrimeQA practitioners.",
  openGraph: {
    title: "PrimeQA Blog — Insights & Resources",
    description:
      "Expert perspectives on AI testing, automation strategy, and software quality — written by practitioners, for practitioners.",
    type: "website",
    url: "/blog",
  },
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const jsonLd = generateBlogListingJsonLd();

  return (
    <main className="bg-white min-h-screen">
      {/* ── JSON-LD Structured Data ── */}
      <JsonLd data={jsonLd} />
      <SectionHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
        title="Blogs"
        description="Catching bugs earlier in the SDLC is no longer optional. Here's how to embed quality from the very first sprint without slowing your developers down."
      />

      {/* ── Listing (SSG + ISR — server-fetched, client-filtered) ── */}
      <Container className="px-4 sm:px-6 lg:px-0 py-8">
        <Suspense fallback={<BlogListingSkeleton />}>
          <BlogListing />
        </Suspense>
      </Container>
    </main>
  );
}
