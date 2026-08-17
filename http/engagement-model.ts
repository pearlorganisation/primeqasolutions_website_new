/**
 * Engagement Model page data layer.
 *
 * Follows the exact same pattern as http/about-us.ts (Single Type):
 *  • Cache Components-friendly via `use cache`, `cacheLife`, and `cacheTag`
 *  • All dynamic-zone block populate declarations reused from shared populate
 *  • The Engagement Model page is a Strapi Single Type (no slug needed)
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type {
  StrapiEngagementModelPageData,
  StrapiEngagementModelPageSection,
} from "@/types/engagement-model";

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
 * Fetch the Engagement Models single-type page data from Strapi.
 * Returns null if the page is not found or unpublished.
 */
export async function getEngagementModelPageData(): Promise<StrapiEngagementModelPageData | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:engagement-model");

  const query = qs.stringify(
    {
      ...baseQueryConfig,
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const url = `${STRAPI_URL}/api/engagement-models?${query}`;

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
export async function getEngagementModelPageSections(): Promise<StrapiEngagementModelPageSection[]> {
  const data = await getEngagementModelPageData();
  return Array.isArray(data?.page_section) ? data.page_section : [];
}
