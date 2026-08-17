/**
 * About Us page data layer.
 *
 * Follows the exact same pattern as http/industry.ts:
 *  • Cache Components-friendly via `use cache`, `cacheLife`, and `cacheTag`
 *  • All dynamic-zone block populate declarations in one object
 *  • The About Us page is a Strapi Single Type (no slug needed)
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type {
  StrapiAboutUsPageData,
  StrapiAboutUsPageSection,
} from "@/types/about-us";

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
 * Fetch the About Us single-type page data from Strapi.
 * Returns null if the page is not found or unpublished.
 */
export async function getAboutUsPageData(): Promise<StrapiAboutUsPageData | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:about-us");

  const query = qs.stringify(
    {
      ...baseQueryConfig,
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const url = `${STRAPI_URL}/api/about-us?${query}`;

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
  // Single type returns data directly (not an array)
  return json?.data ?? null;
}

/**
 * Convenience helper — returns the page_section array directly.
 */
export async function getAboutUsPageSections(): Promise<StrapiAboutUsPageSection[]> {
  const data = await getAboutUsPageData();
  return Array.isArray(data?.page_section) ? data.page_section : [];
}
