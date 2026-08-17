import { Suspense } from "react";
import type { Metadata } from "next";
import { SectionHero } from "@/components/sections/shared/section-hero";
import { Container } from "@/components/ui/container";
import { CaseStudiesListing } from "@/components/sections/pages/case-studies/case-studies-listing";
import { CaseStudiesListingSkeleton } from "@/components/sections/pages/case-studies/case-studies-listing-skeleton";
import { CtaForm } from "@/components/sections/shared/cta-form";
import { generateCaseStudyListingJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

// ─── ISR — revalidate every 60 seconds ──────────────────────────────────────

// ─── SEO ────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Case Studies | PrimeQA — Software Quality Engineering",
  description:
    "Explore how PrimeQA helps world-class companies ship better software with AI-powered QA automation, performance testing, security testing, and more. Real results, real impact.",
  alternates: {
    canonical: "/case-study",
  },
  openGraph: {
    title: "PrimeQA Case Studies — Real Results, Real Impact",
    description:
      "See how PrimeQA delivers measurable QA outcomes across fintech, healthcare, e-commerce, SaaS, logistics, and more.",
    type: "website",
    url: "/case-study",
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CaseStudiesPage() {
  const jsonLd = generateCaseStudyListingJsonLd();

  return (
    <main className="bg-white min-h-screen">
      {/* ── JSON-LD Structured Data ── */}
      <JsonLd data={jsonLd} />
      {/* ── Page Hero ── */}
      <SectionHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Case Study" }]}
        title="Case Studies"
        description="Real-world stories of how PrimeQA helps engineering teams ship faster, more reliable software — across industries and testing disciplines."
        stats={[
          { value: "200+", label: "Projects Delivered" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "6", label: "Industries Served" },
        ]}
      />

      {/* ── Listing ── */}
      <Container className="px-4 sm:px-6 lg:px-0 py-8 ">
        <Suspense fallback={<CaseStudiesListingSkeleton />}>
          <CaseStudiesListing />
        </Suspense>
      </Container>

      {/* ── CTA Form ── */}
      <CtaForm />
    </main>
  );
}
