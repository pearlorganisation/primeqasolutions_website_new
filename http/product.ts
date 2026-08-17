/**
 * Product page data layer.
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type { StrapiProduct, StrapiProductPageSection } from "@/types/product";
import { basePopulateConfig } from "./populate";

// ─── Config ───────────────────────────────────────────────────────────────────

export const REVALIDATE = 60;

const headers: HeadersInit = STRAPI_TOKEN
  ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
  : {};

// ─── Query Config ──────────────────────────────────────────────────────────────

const baseQueryConfig = {
  populate: {
    ...basePopulateConfig,
    image: true,
    link: { populate: "*" },
  },
};

// ─── Fetch ────────────────────────────────────────────────────────────────────

/**
 * Fetch all products for the list page.
 */
export async function getAllProducts(): Promise<StrapiProduct[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:products");

  const query = qs.stringify(
    {
      populate: baseQueryConfig.populate,
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const URL = `${STRAPI_URL}/api/products?${query}`;

  const res = await fetch(URL, { headers });
  if (!res.ok) return [];

  const json = await res.json();
  return json?.data || [];
}

/**
 * Fetch a specific product by its slug.
 */
export async function getProductBySlug(
  slug: string,
): Promise<StrapiProduct | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:products", `strapi:product:${slug}`);

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

  const URL = `${STRAPI_URL}/api/products?${query}`;

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

/**
 * Fetch all available product slugs (useful for generateStaticParams)
 */
export async function getAllProductSlugs(): Promise<string[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:products:slugs");

  const query = qs.stringify(
    {
      fields: ["slug"],
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const URL = `${STRAPI_URL}/api/products?${query}`;

  const res = await fetch(URL, { headers });
  if (!res.ok) return [];

  const json = await res.json();
  return (json?.data || []).flatMap((item: any) => item.slug ? [item.slug] : []);
}
