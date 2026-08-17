/**
 * Hire QA Engineer page data layer.
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type {
  StrapiHireQaEngineerPageData,
  StrapiHireQaEngineerPageSection,
} from "@/types/hire-qa-engineer";
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

export async function getHireQaEngineerPageDataBySlug(
  slug: string,
): Promise<StrapiHireQaEngineerPageData | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:hire-qa-engineers", `strapi:hire-qa-engineer:${slug}`);

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

  const URL = `${STRAPI_URL}/api/hire-qa-engineers?${query}`;

  const res = await fetch(URL, {
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
    return docs[0];
  }

  return null;
}

export const getHireQaEngineerPageData = getHireQaEngineerPageDataBySlug;

export async function getHireQaEngineerPageSections(
  slug: string,
): Promise<StrapiHireQaEngineerPageSection[]> {
  const data = await getHireQaEngineerPageDataBySlug(slug);
  return Array.isArray(data?.page_section) ? data.page_section : [];
}

export async function getAllHireQaEngineerSlugs(): Promise<string[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:hire-qa-engineers:slugs");

  const query = qs.stringify(
    {
      fields: ["slug"],
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const URL = `${STRAPI_URL}/api/hire-qa-engineers?${query}`;

  const res = await fetch(URL, { headers });
  if (!res.ok) return [];

  const json = await res.json();
  return (json?.data || []).flatMap((item: any) => item.slug ? [item.slug] : []);
}
