/**
 * Become a Partner page data layer.
 *
 * Follows the exact same pattern as http/about-us.ts (Single Type):
 *  • Cache Components-friendly via `use cache`, `cacheLife`, and `cacheTag`
 *  • All dynamic-zone block populate declarations reused from hire-qa-engineer
 *  • The Become a Partner page is a Strapi Single Type (no slug needed)
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type {
  StrapiBecomePartnerPageData,
  StrapiBecomePartnerPageSection,
} from "@/types/become-partner";
import { BLOCKS } from "@/lib/utils/blocks";

// ─── Config ───────────────────────────────────────────────────────────────────

export const REVALIDATE = 60;

const headers: HeadersInit = STRAPI_TOKEN
  ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
  : {};

// ─── Populate declarations per block type ─────────────────────────────────────
// Same populate structure as hire-qa-engineer — these pages share the same blocks.

import { basePopulateConfig } from "./populate";

// ─── Base Query Config ─────────────────────────────────────────────────────────

const baseQueryConfig = {
  populate: basePopulateConfig,
};

// ─── Fetch ────────────────────────────────────────────────────────────────────

/**
 * Fetch the Become a Partner single-type page data from Strapi.
 * Returns null if the page is not found or unpublished.
 */
export async function getBecomePartnerPageData(): Promise<StrapiBecomePartnerPageData | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:become-a-partner");

  const query = qs.stringify(
    {
      ...baseQueryConfig,
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const url = `${STRAPI_URL}/api/become-a-partner?${query}`;

  const res = await fetch(url, {
    headers,
  });

  if (!res.ok) {
    // 404 is expected when the single type has no entry yet — don't log as error
    if (process.env.NODE_ENV === "development" && res.status !== 404) {
      console.error(`[Strapi] ${res.status} ${res.statusText} — ${res.url}`);
    }
    return null;
  }

  const json = await res.json();
  const data = json?.data ?? null;

  // Guard: only return data if it exists and is published
  if (!data || !data.publishedAt) {
    return null;
  }

  return data;
}

/**
 * Convenience helper — returns the page_section array directly.
 */
export async function getBecomePartnerPageSections(): Promise<StrapiBecomePartnerPageSection[]> {
  const data = await getBecomePartnerPageData();
  return Array.isArray(data?.page_section) ? data.page_section : [];
}
