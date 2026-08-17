/**
 * Industry page data layer.
 *
 * Follows the exact same pattern as http/service.ts and http/hire-qa-engineer.ts:
 *  • Cache Components-friendly via `use cache`, `cacheLife`, and `cacheTag`
 *  • All dynamic-zone block populate declarations in one object
 *  • Three exports consumed by the page: getIndustryPageData, getAllIndustrySlugs,
 *    and getIndustryPageSections (convenience helper)
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type {
  StrapiIndustryPageData,
  StrapiIndustryPageSection,
} from "@/types/industry";
import { BLOCKS } from "@/lib/utils/blocks";

// ─── Config ───────────────────────────────────────────────────────────────────

export const REVALIDATE = 60;

const headers: HeadersInit = STRAPI_TOKEN
  ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
  : {};

// ─── Populate declarations per block type ─────────────────────────────────────

import { basePopulateConfig } from "./populate";

// ─── Base Query Config ─────────────────────────────────────────────────────────

const baseQueryConfig = {
  populate: basePopulateConfig,
};

// ─── Fetch ────────────────────────────────────────────────────────────────────

/**
 * Fetch a specific industry page by its slug.
 * Returns null if the slug doesn't exist or the page is unpublished.
 */
export async function getIndustryPageDataBySlug(
  slug: string,
): Promise<StrapiIndustryPageData | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:industries", `strapi:industry:${slug}`);

  const query = qs.stringify(
    {
      ...baseQueryConfig,
      filters: {
        slug: { $eq: slug },
      },
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const url = `${STRAPI_URL}/api/industries?${query}`;

  const res = await fetch(url, {
    headers,
  });

  if (!res.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error(`[Strapi] ${res.status} ${res.statusText} — ${res.url}`);
    }
    return null;
  }

  const json = await res.json();
  const docs = json?.data;

  if (Array.isArray(docs) && docs.length > 0) {
    return docs[0];
  }

  return null;
}

/** Preferred alias used inside page.tsx files */
export const getIndustryPageData = getIndustryPageDataBySlug;

/**
 * Convenience helper — returns the page_section array directly.
 */
export async function getIndustryPageSections(
  slug: string,
): Promise<StrapiIndustryPageSection[]> {
  const data = await getIndustryPageDataBySlug(slug);
  return Array.isArray(data?.page_section) ? data.page_section : [];
}

/**
 * Fetch all published industry slugs.
 * Used by generateStaticParams for SSG at build time.
 */
export async function getAllIndustrySlugs(): Promise<string[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:industries:slugs");

  const query = qs.stringify(
    {
      fields: ["slug"],
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const url = `${STRAPI_URL}/api/industries?${query}`;

  const res = await fetch(url, { headers });
  if (!res.ok) return [];

  const json = await res.json();
   
  return (json?.data || []).flatMap((item: any) => item.slug ? [item.slug] : []);
}
