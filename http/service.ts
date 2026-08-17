/**
 * Service page data layer.
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type {
  StrapiServicePageData,
  StrapiServicePageSection,
} from "@/types/service";
import { BLOCKS } from "@/lib/utils/blocks";

// ─── Config ───────────────────────────────────────────────────────────────────

export const REVALIDATE = 60;

const headers: HeadersInit = STRAPI_TOKEN
  ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
  : {};

// ─── Populate declarations per block type ─────────────────────────────────────

import { basePopulateConfig } from "./populate";

// ─── Query Config ──────────────────────────────────────────────────────────────

const baseQueryConfig = {
  populate: basePopulateConfig,
};

// ─── Fetch ────────────────────────────────────────────────────────────────────

/**
 * Fetch a specific service page by its slug.
 * Alias: getServicePageData(slug)
 */
export async function getServicePageDataBySlug(
  slug: string,
): Promise<StrapiServicePageData | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:services", `strapi:service:${slug}`);

  const query = qs.stringify(
    {
      ...baseQueryConfig,
      filters: {
        slug: {
          $eq: slug,
        },
      },
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  // Note: Assuming your collection type is called "services"
  const SERVICE_URL = `${STRAPI_URL}/api/services?${query}`;

  const res = await fetch(SERVICE_URL, {
    headers,
  });

  if (!res.ok) {
    if (process.env.NODE_ENV === "development")
      console.error(`[Strapi] ${res.status} ${res.statusText} — ${res.url}`);
    return null;
  }

  const json = await res.json();
  const docs = json?.data;

  // Since filtering by slug on a collection type returns an array, we take the first item
  if (Array.isArray(docs) && docs.length > 0) {
    return docs[0];
  }

  return null;
}

/** Convenience alias — preferred name for use in page.tsx files */
export const getServicePageData = getServicePageDataBySlug;

/**
 * Fetch sections for a specific service page
 */
export async function getServicePageSections(
  slug: string,
): Promise<StrapiServicePageSection[]> {
  const service = await getServicePageDataBySlug(slug);
  return Array.isArray(service?.page_section) ? service.page_section : [];
}

/**
 * Fetch all available service page slugs (useful for generateStaticParams)
 */
export async function getAllServiceSlugs(): Promise<string[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:services:slugs");

  const query = qs.stringify(
    {
      fields: ["slug"],
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const URL = `${STRAPI_URL}/api/services?${query}`;

  const res = await fetch(URL, { headers });
  if (!res.ok) return [];

  const json = await res.json();
  return (json?.data || []).flatMap((item: any) => item.slug ? [item.slug] : []);
}
