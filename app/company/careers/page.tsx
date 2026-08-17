/**
 * Careers Page — Dynamic
 * ──────────────────────
 * Fetches page content from two Strapi sources:
 *  1. Career (Single Type) — hero section + SEO metadata
 *  2. Job List (Collection Type) — all published job listings
 *
 * Uses ISR with 60s revalidation.
 * SEO metadata is resolved via the shared mapStrapiSeoToMetadata utility.
 */

import type { Metadata } from "next";
import { getCareerPageData, getAllJobListings } from "@/http/career";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { SectionHero } from "@/components/sections/shared/section-hero";
import { JobListings } from "@/components/sections/pages/careers/job-listings";
import { generateCareersListingJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

// ─── ISR Config ───────────────────────────────────────────────────────────────


// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCareerPageData();
  return mapStrapiSeoToMetadata(data?.meta_data, {
    defaultTitle: "Careers | PrimeQA",
    defaultDescription:
      "Join a dynamic, diverse team of innovators dedicated to pushing the boundaries of software testing and engineering.",
    defaultCanonical: "/company/careers",
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CareersPage() {
  const [careerPage, jobs] = await Promise.all([
    getCareerPageData(),
    getAllJobListings(),
  ]);

  const jsonLd = generateCareersListingJsonLd();

  return (
    <main>
      <JsonLd data={jsonLd} />
      <SectionHero data={careerPage?.section_hero} />
      <JobListings jobs={jobs} />
    </main>
  );
}
