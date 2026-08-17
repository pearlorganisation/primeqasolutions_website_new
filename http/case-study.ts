/**
 * Case Study data-fetching layer — new page_section dynamic-zone architecture.
 *
 * All case-study-related Strapi calls live here.
 * Called from Server Components only (no 'use client').
 *
 * Strapi collection: "case-studies"
 * Fields: name, slug, description, meta_data, page_section (DynamicZone)
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN, strapiMediaUrl } from "./client";
import type {
  StrapiCaseStudy,
  CaseStudy,
  CaseStudyInfoBlock,
  CaseStudyStatItem,
} from "@/types/case-study";

// ─── Config ───────────────────────────────────────────────────────────────────

export const REVALIDATE = 60;

const headers: HeadersInit = STRAPI_TOKEN
  ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
  : {};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format ISO date → "Mar 28, 2025" */
function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Pull the first `block.case-study-info-block` out of page_section
 * so the listing card can surface Industry and testing_type.
 */
function extractInfoBlock(raw: StrapiCaseStudy): CaseStudyInfoBlock | null {
  return (
    (raw.page_section?.find(
      (b) => b.__component === "block.case-study-info-block"
    ) as CaseStudyInfoBlock | undefined) ?? null
  );
}

// ─── Normaliser ───────────────────────────────────────────────────────────────

/** Convert a raw Strapi case study into a clean, UI-safe listing card shape */
export function normaliseCaseStudy(raw: StrapiCaseStudy): CaseStudy {
  const info = extractInfoBlock(raw);

  const seoMeta = raw.meta_data ?? null;

  return {
    id: raw.documentId,
    slug: raw.slug,
    title: raw.name,
    excerpt: raw.description ?? "",
    date: formatDate(info?.published ?? raw.publishedAt),
    industry: (raw.industry?.name || "").trim(),
    testingType: (raw.service?.name || "").trim(),
    image: strapiMediaUrl(raw.image?.url),
    imageAlt: raw.image?.alternativeText ?? raw.name,
    seo: seoMeta
      ? {
          title: seoMeta.title,
          description: seoMeta.description,
          canonicalUrl: seoMeta.canonical_url,
          ogTitle: seoMeta.og?.title ?? seoMeta.title,
          ogDescription: seoMeta.og?.description ?? seoMeta.description,
          ogImageUrl: (() => {
            const ogImg = seoMeta.og?.image;
            if (Array.isArray(ogImg) && ogImg.length > 0)
              return strapiMediaUrl(ogImg[0].url);
            if (ogImg && !Array.isArray(ogImg))
              return strapiMediaUrl((ogImg as { url: string }).url);
            return "";
          })(),
        }
      : null,
  };
}

// ─── Populate declarations ────────────────────────────────────────────────────

/** Meta-data sub-populate — shared */
const populateMetaData = {
  fields: ["title", "description", "canonical_url"],
  populate: {
    og: {
      fields: ["title", "description", "url"],
      populate: {
        image: { fields: ["url", "alternativeText"] },
      },
    },
  },
};

/**
 * Full dynamic-zone populate for a detail page.
 * Each block component is explicitly listed so we only fetch what we need.
 */
const populatePageSection = {
  on: {
    "block.case-study-hero-block": {
      fields: ["heading", "description"],
      populate: {
        primaryButton: { fields: ["label", "link"] },
      },
    },
    "block.case-study-info-block": {
      fields: ["published", "testing_type", "Headquarters", "Industry"],
    },
    "block.case-study-state-block": {
      populate: {
        stats_items: { fields: ["stats", "label", "description"] },
      },
    },
    "block.case-study-tech-stack-block": {
      populate: {
        tech_stacks: {
          fields: ["name"],
          populate: { icon: { fields: ["url", "alternativeText"] } },
        },
      },
    },
    "block.client-success-item": {
      fields: ["testimonial"],
      populate: {
        client: {
          fields: ["name", "designation"],
          populate: { photo: { fields: ["url", "alternativeText"] } },
        },
        // video: { fields: ["url"] },
      },
    },
    "block.case-study-main-content-block": {
      fields: ["content"],
    },
  },
};

// ─── API Functions ────────────────────────────────────────────────────────────

/**
 * Fetch all published case studies (listing page).
 * Only pulls name, slug, description, publishedAt, meta_data, and the
 * info-block (for industry/testingType) to keep the response lean.
 */
export const getAllCaseStudies = async (): Promise<CaseStudy[]> => {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:case-studies");

  const query = qs.stringify(
    {
      fields: ["name", "slug", "description", "publishedAt"],
      populate: {
        industry: { fields: ["name", "slug"] },
        service: { fields: ["name", "slug"] },
        meta_data: populateMetaData,
        image: { fields: ["url", "alternativeText"] },
        page_section: {
          on: {
            "block.case-study-info-block": {
              fields: ["published", "testing_type", "Headquarters", "Industry"],
            },
          },
        },
      },
      // Sort applied client-side below so it uses the same date priority
      // (info-block `published` field → Strapi `publishedAt` fallback).
      pagination: { pageSize: 100 },
      status: "published",
    },
    { encodeValuesOnly: true }
  );

  const url = `${STRAPI_URL}/api/case-studies?${query}`;

  try {
    const res = await fetch(url, {
      headers,
    });
    if (!res.ok) return [];

    const json = await res.json();
    const studies = (json?.data ?? []) as StrapiCaseStudy[];

    // Sort descending by effective date:
    // prefer the info-block `published` field; fall back to Strapi `publishedAt`.
    studies.sort((a, b) => {
      const infoA = a.page_section?.find(
        (s) => s.__component === "block.case-study-info-block"
      ) as CaseStudyInfoBlock | undefined;
      const infoB = b.page_section?.find(
        (s) => s.__component === "block.case-study-info-block"
      ) as CaseStudyInfoBlock | undefined;

      const dateA = new Date(infoA?.published ?? a.publishedAt ?? "").getTime();
      const dateB = new Date(infoB?.published ?? b.publishedAt ?? "").getTime();

      return dateB - dateA; // descending
    });

    return studies.map(normaliseCaseStudy);
  } catch {
    return [];
  }
};

/**
 * Fetch a single case study by its slug — returns the full raw Strapi document
 * including all page_section blocks so the detail page can render everything.
 */
export async function getCaseStudyBySlug(
  slug: string
): Promise<StrapiCaseStudy | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:case-studies", `strapi:case-study:${slug}`);

  const query = qs.stringify(
    {
      fields: ["name", "slug", "description", "publishedAt"],
      populate: {
        industry: { fields: ["name", "slug"] },
        service: { fields: ["name", "slug"] },
        meta_data: populateMetaData,
        image: { fields: ["url", "alternativeText"] },
        page_section: populatePageSection,
      },
      filters: { slug: { $eq: slug } },
      status: "published",
    },
    { encodeValuesOnly: true }
  );

  const url = `${STRAPI_URL}/api/case-studies?${query}`;

  const res = await fetch(url, {
    headers,
  });

  if (!res.ok) {
    if (process.env.NODE_ENV === "development")
      console.error(`[Strapi] ${res.status} ${res.statusText} — ${res.url}`);
    return null;
  }

  const json = await res.json();
  const docs = json?.data;

  if (Array.isArray(docs) && docs.length > 0) {
    return docs[0] as StrapiCaseStudy;
  }

  return null;
}

/**
 * Fetch all published case study slugs (useful for generateStaticParams).
 */
export async function getAllCaseStudySlugs(): Promise<string[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:case-studies:slugs");

  const query = qs.stringify(
    { fields: ["slug"], status: "published" },
    { encodeValuesOnly: true }
  );

  const url = `${STRAPI_URL}/api/case-studies?${query}`;

  const res = await fetch(url, { headers });
  if (!res.ok) return [];

  const json = await res.json();
  return (json?.data || []).flatMap((item: { slug?: string }) => item.slug ? [item.slug] : []);
}

// ─── Utility helpers ──────────────────────────────────────────────────────────

/**
 * Build industry counts from a list of normalised case studies.
 * Returns a map including a synthetic "All" entry.
 */
export function buildIndustryCounts(
  studies: CaseStudy[]
): Record<string, number> {
  const counts: Record<string, number> = { All: studies.length };
  for (const s of studies) {
    if (s.industry) counts[s.industry] = (counts[s.industry] ?? 0) + 1;
  }
  return counts;
}

/**
 * Build testing-type counts from a list of normalised case studies.
 * Returns a map including a synthetic "All" entry.
 */
export function buildTestingTypeCounts(
  studies: CaseStudy[]
): Record<string, number> {
  const counts: Record<string, number> = { All: studies.length };
  for (const s of studies) {
    if (s.testingType)
      counts[s.testingType] = (counts[s.testingType] ?? 0) + 1;
  }
  return counts;
}

// ─── Block-level helpers (convenience for page components) ───────────────────

export { extractInfoBlock };

/** Pull stats items out of the page_section for a stats section component */
export function extractStatItems(
  raw: StrapiCaseStudy
): CaseStudyStatItem[] {
  const block = raw.page_section?.find(
    (b) => b.__component === "block.case-study-state-block"
  );
  if (!block) return [];
   
  return (block as any).stats_items ?? [];
}
