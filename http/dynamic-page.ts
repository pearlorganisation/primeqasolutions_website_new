/**
 * Dynamic page data layer.
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type { StrapiDynamicPageData } from "@/types/dynamic-page";
import { basePopulateConfig } from "./populate";

export const REVALIDATE = 300;

const headers: HeadersInit = STRAPI_TOKEN
  ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
  : {};

export async function getDynamicPageData(
  slug: string,
): Promise<StrapiDynamicPageData | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:dynamic-pages", `strapi:dynamic-page:${slug}`);

  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      status: "published",
      populate: basePopulateConfig,
    },
    { encodeValuesOnly: true },
  );

  const URL = `${STRAPI_URL}/api/dynamic-pages?${query}`;

  const res = await fetch(URL, {
    headers,
  });

  if (!res.ok) {
    if (process.env.NODE_ENV === "development")
      console.error(`[Strapi] ${res.status} ${res.statusText} — ${res.url}`);
    return null;
  }

  const json = await res.json();
  const docs = json?.data ?? [];
  return docs.length > 0 ? docs[0] : null;
}

export async function getAllDynamicPageSlugs(): Promise<string[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:dynamic-pages:slugs");

  const query = qs.stringify(
    {
      fields: ["slug"],
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const URL = `${STRAPI_URL}/api/dynamic-pages?${query}`;

  const res = await fetch(URL, { headers });
  if (!res.ok) return [];

  const json = await res.json();
  return (json?.data || []).flatMap((item: { slug?: string }) =>
    item.slug ? [item.slug] : [],
  );
}
