/**
 * Whom We Work With page data layer.
 *
 * Follows the exact same pattern as http/about-us.ts (Single Type):
 *  • Cache Components-friendly via `use cache`, `cacheLife`, and `cacheTag`
 *  • All dynamic-zone block populate declarations reused from shared populate
 *  • The Whom We Work With page is a Strapi Single Type (no slug needed)
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type {
  StrapiWhomWeWorkWithPageData,
  StrapiWhomWeWorkWithPageSection,
} from "@/types/whom-we-work-with";

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
 * Fetch the Whom We Work With single-type page data from Strapi.
 * Returns null if the page is not found or unpublished.
 */
export async function getWhomWeWorkWithPageData(): Promise<StrapiWhomWeWorkWithPageData | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:whom-we-work-with");

  const query = qs.stringify(
    {
      ...baseQueryConfig,
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const url = `${STRAPI_URL}/api/whom-we-work-with?${query}`;

  const res = await fetch(url, {
    headers,
  });

  if (!res.ok) {
    if (process.env.NODE_ENV === "development" && res.status !== 404) {
      console.error(`[Strapi] ${res.status} ${res.statusText} — ${res.url}`);
    }
    return null;
  }

  const json = await res.json();
  const data = json?.data ?? null;

  if (!data || !data.publishedAt) {
    return null;
  }

  return data;
}

/**
 * Convenience helper — returns the page_section array directly.
 */
export async function getWhomWeWorkWithPageSections(): Promise<StrapiWhomWeWorkWithPageSection[]> {
  const data = await getWhomWeWorkWithPageData();
  return Array.isArray(data?.page_section) ? data.page_section : [];
}
