/**
 * Home page data layer.
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type { StrapiHomePageData, StrapiHomePageSection } from "@/types/home";
import { BLOCKS } from "../lib/utils/blocks";

// ─── Config ───────────────────────────────────────────────────────────────────

export const REVALIDATE = 300; // 5 minutes — content rarely changes more than a few times/day

const headers: HeadersInit = STRAPI_TOKEN
  ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
  : {};

// ─── Populate declarations per block type ─────────────────────────────────────

import { basePopulateConfig } from "./populate";

// Build the full query string once at module init — not on every request
const query = qs.stringify(
  {
    status: "published",
    populate: basePopulateConfig,
  },
  { encodeValuesOnly: true },
);

const HOME_URL = `${STRAPI_URL}/api/home?${query}`;

// ─── Fetch ────────────────────────────────────────────────────────────────────

export async function getHomePageData(): Promise<StrapiHomePageData | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:home");

  const res = await fetch(HOME_URL, {
    headers,
  });

  if (!res.ok) {
    if (process.env.NODE_ENV === "development")
      console.error(`[Strapi] ${res.status} ${res.statusText} — ${res.url}`);
    return null;
  }

  const json = await res.json();
  const doc = json?.data ?? json;
  return doc ?? null;
}

export async function getHomePageSections(): Promise<StrapiHomePageSection[]> {
  const home = await getHomePageData();
  return Array.isArray(home?.page_section) ? home.page_section : [];
}
