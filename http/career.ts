/**
 * Career page data layer.
 *
 * Follows the established patterns from http/about-us.ts and http/service.ts:
 *  • Cache Components-friendly via `use cache`, `cacheLife`, and `cacheTag`
 *  • Two content types:
 *    1. Career (Single Type) — page-level hero and metadata
 *    2. Job List (Collection Type) — individual job postings
 */

import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import type {
  StrapiCareerPageData,
  StrapiJobListItem,
} from "@/types/career";

// ─── Config ───────────────────────────────────────────────────────────────────

export const REVALIDATE = 60;

const headers: HeadersInit = STRAPI_TOKEN
  ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
  : {};

// ─── Career Page (Single Type) ───────────────────────────────────────────────

const careerPageQueryConfig = {
  populate: {
    meta_data: {
      fields: ["title", "description", "canonical_url"],
      populate: {
        og: {
          fields: ["title", "description", "url"],
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
      },
    },
    section_hero: {
      populate: {
        image: {
          fields: ["url", "alternativeText", "width", "height"],
        },
        primaryButton: true,
        secondaryButton: true,
      },
    },
  },
};

/**
 * Fetch the Career single-type page data from Strapi.
 * Returns null if the page is not found or unpublished.
 */
export async function getCareerPageData(): Promise<StrapiCareerPageData | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:career");

  const query = qs.stringify(
    {
      ...careerPageQueryConfig,
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const url = `${STRAPI_URL}/api/career?${query}`;

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

// ─── Job List (Collection Type) ──────────────────────────────────────────────

const jobListQueryConfig = {
  fields: ["title", "slug", "role", "location", "job_type", "short_description"],
  sort: ["createdAt:desc"],
  status: "published",
};

/**
 * Fetch all published job listings from Strapi.
 */
export async function getAllJobListings(): Promise<StrapiJobListItem[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:job-lists");

  const query = qs.stringify(jobListQueryConfig, { encodeValuesOnly: true });

  const url = `${STRAPI_URL}/api/job-lists?${query}`;

  const res = await fetch(url, {
    headers,
  });

  if (!res.ok) {
    if (process.env.NODE_ENV === "development") {
      console.error(`[Strapi] ${res.status} ${res.statusText} — ${res.url}`);
    }
    return [];
  }

  const json = await res.json();
  return json?.data ?? [];
}

/**
 * Fetch all job slugs — for generateStaticParams (SSG).
 */
export async function getAllJobSlugs(): Promise<string[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:job-lists:slugs");

  const query = qs.stringify(
    {
      fields: ["slug"],
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const url = `${STRAPI_URL}/api/job-lists?${query}`;

  const res = await fetch(url, { headers });
  if (!res.ok) return [];

  const json = await res.json();
  return (json?.data || []).flatMap((item: any) => item.slug ? [item.slug] : []);
}

/**
 * Fetch a single job listing by slug — includes full Content (RichText) and meta_data.
 */
export async function getJobBySlug(slug: string): Promise<StrapiJobListItem | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:job-lists", `strapi:job:${slug}`);

  const query = qs.stringify(
    {
      filters: {
        slug: { $eq: slug },
      },
      populate: {
        meta_data: {
          fields: ["title", "description", "canonical_url"],
          populate: {
            og: {
              fields: ["title", "description", "url"],
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
          },
        },
      },
      status: "published",
    },
    { encodeValuesOnly: true },
  );

  const url = `${STRAPI_URL}/api/job-lists?${query}`;

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
