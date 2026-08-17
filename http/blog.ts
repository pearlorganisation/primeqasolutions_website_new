/**
 * Blog data-fetching layer — uses the official @strapi/client SDK.
 *
 * All blog-related calls live here for modularity. These functions
 * are designed to be called from Server Components only (no 'use client').
 *
 * Cache strategy:
 *   - Next Cache Components with tagged, time-based CMS cache entries
 *
 * SDK docs: https://docs.strapi.io/cms/api/client
 */

import { cacheCmsContent } from "./cache";
import { strapiClient, strapiMediaUrl } from "./client";
import type {
  StrapiBlogPost,
  StrapiCategory,
  BlogPost,
  BlogCategory,
} from "@/types/blog";

// ─── Strapi collection handles ────────────────────────────────────────────────

const blogsCollection = strapiClient.collection("blogs");
const categoriesCollection = strapiClient.collection("categories");
const REVALIDATE = 300;

type StrapiResponseWithPagination<T> = {
  data?: T[];
  meta?: {
    pagination?: {
      pageCount?: number;
    };
  };
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format ISO date → "Mar 28, 2025" */
function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Rough reading-time estimate from markdown/html content */
function estimateReadTime(content: string | null | undefined): string {
  if (!content) return "3 min read";
  const text = content.replace(/<[^>]*>/g, ""); // strip HTML tags
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} min read`;
}

// ─── Normaliser ───────────────────────────────────────────────────────────────

/** Convert a raw Strapi blog post into a clean, UI-safe shape */
export function normaliseBlogPost(raw: StrapiBlogPost): BlogPost {
  const firstImage = Array.isArray(raw.image) ? raw.image[0] : null;
  const firstCategory =
    Array.isArray(raw.categories) && raw.categories.length > 0
      ? raw.categories[0]
      : null;

  return {
    id: raw.documentId,
    slug: raw.slug,
    category: firstCategory?.title ?? "Uncategorised",
    categorySlug: firstCategory?.slug ?? "uncategorised",
    title: raw.title,
    excerpt: raw.short_description,
    content: raw.content ?? "",
    readTime: estimateReadTime(raw.content),
    published: formatDate(raw.createdAt),
    publishedRaw: raw.createdAt ?? "",
    image: strapiMediaUrl(firstImage?.url),
    imageAlt: firstImage?.alternativeText ?? raw.title,
    imageWidth: firstImage?.width ?? null,
    imageHeight: firstImage?.height ?? null,
    author: {
      name: raw.author?.username ?? "PrimeQA Team",
      jobTitle: raw.author?.job_title ?? "Quality Engineering Partner",
      avatar: strapiMediaUrl(raw.author?.photo?.url) as string,
      socials: Array.isArray(raw.author?.user_social_profiles)
        ? raw.author!.user_social_profiles.reduce<
            Array<{ platform: string; url: string; icon: string }>
          >((socials, profile) => {
            const social = {
              platform: profile.platform?.name ?? "",
              url: profile.link,
              icon: strapiMediaUrl(profile.platform?.icon?.url),
            };

            if (
              !socials.some(
                (existing) =>
                  existing.platform === social.platform &&
                  existing.url === social.url,
              )
            ) {
              socials.push(social);
            }

            return socials;
          }, [])
        : [],
    },
    tags: Array.isArray(raw.tags) ? raw.tags.map((t) => t.label) : [],
    faqs:
      raw.FAQs?.item?.map((faq) => ({
        question: faq.label,
        answer: faq.description,
      })) ?? [],
    seo: raw.meta_data
      ? {
          title: raw.meta_data.title,
          description: raw.meta_data.description,
          canonicalUrl: raw.meta_data.canonical_url,
          ogTitle: raw.meta_data.og?.title ?? raw.meta_data.title,
          ogDescription:
            raw.meta_data.og?.description ?? raw.meta_data.description,
          ogImageUrl: (() => {
            const ogImg = raw.meta_data.og?.image;
            if (Array.isArray(ogImg) && ogImg.length > 0)
              return strapiMediaUrl(ogImg[0].url);
            if (ogImg && !Array.isArray(ogImg))
              return strapiMediaUrl((ogImg as { url: string }).url);
            return strapiMediaUrl(firstImage?.url);
          })(),
        }
      : null,
  };
}

async function fetchAllPages<T>(
  fetchPage: (page: number) => Promise<StrapiResponseWithPagination<T>>,
): Promise<T[]> {
  const firstResponse = await fetchPage(1);
  const firstItems = (firstResponse.data ?? []) as T[];
  const pageCount = firstResponse.meta?.pagination?.pageCount ?? 1;

  if (pageCount <= 1) {
    return firstItems;
  }

  const remainingResponses = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, index) => fetchPage(index + 2)),
  );

  return firstItems.concat(
    ...remainingResponses.map((response) => (response.data ?? []) as T[]),
  );
}

// ─── API Functions ────────────────────────────────────────────────────────────

/**
 * Fetch all published blog posts (listing page).
 * Uses `collection('blogs').find()` with populate params.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:blogs");

  const allPosts = await fetchAllPages<StrapiBlogPost>((page) =>
    blogsCollection.find({
      populate: {
        author: {
          populate: {
            photo: true,
            user_social_profiles: {
              populate: {
                platform: {
                  populate: {
                    icon: true,
                  },
                },
              },
            },
          },
        },
        categories: true,
        tags: true,
        image: true,
        meta_data: {
          populate: "*",
        },
      },
      sort: "createdAt:desc",
      pagination: {
        page,
        pageSize: 100,
      },
      status: "published",
    }) as unknown as Promise<StrapiResponseWithPagination<StrapiBlogPost>>,
  );

  const normalised = allPosts.map(normaliseBlogPost);

  // Guarantee descending order by the custom "published" date field.
  // The Strapi API sort should already return this order, but we enforce
  // it client-side as a safety net (handles nulls, ties, etc.).
  normalised.sort((a, b) => {
    const dateA = a.publishedRaw ? new Date(a.publishedRaw).getTime() : 0;
    const dateB = b.publishedRaw ? new Date(b.publishedRaw).getTime() : 0;
    return dateB - dateA; // descending — most recent first
  });

  return normalised;
}

/**
 * Fetch a single blog post by slug (detail page).
 * Deep-populates all relations including FAQs, meta_data with OG.
 */
export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:blogs", `strapi:blog:${slug}`);

  const response = await blogsCollection.find({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      author: {
        populate: {
          photo: true,
          user_social_profiles: {
            populate: {
              platform: {
                populate: {
                  icon: true,
                },
              },
            },
          },
        },
      },
      categories: true,
      tags: true,
      image: true,
      FAQs: {
        populate: "*",
      },
      meta_data: {
        populate: {
          og: {
            populate: "*",
          },
          keywords: true,
        },
      },
    },
    status: "published",
  });

  const posts = (response?.data ?? []) as unknown as StrapiBlogPost[];
  if (posts.length === 0) return null;
  return normaliseBlogPost(posts[0]);
}

/**
 * Fetch all blog slugs — used by `generateStaticParams` for SSG.
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:blogs:slugs");

  const posts = await fetchAllPages<{ slug: string }>((page) =>
    blogsCollection.find({
      fields: ["slug"],
      pagination: {
        page,
        pageSize: 100,
      },
      status: "published",
    }) as unknown as Promise<StrapiResponseWithPagination<{ slug: string }>>,
  );

  return posts.map((post) => post.slug);
}

/**
 * Lightweight prev/next blog navigation — fetches only slug + title.
 * Eliminates the N+1 pattern of loading all 100 posts just for 2 links.
 * Sorted by published:desc so index matches the listing page order.
 */
export async function getAdjacentBlogPosts(
  currentSlug: string,
): Promise<{ prev: { slug: string; title: string } | null; next: { slug: string; title: string } | null }> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:blogs", `strapi:blog-adjacent:${currentSlug}`);

  const allSlugs = await fetchAllPages<{ slug: string; title: string }>(
    (page) =>
      blogsCollection.find({
        fields: ["slug", "title"],
        sort: "createdAt:desc",
        pagination: {
          page,
          pageSize: 100,
        },
        status: "published",
      }) as unknown as Promise<
        StrapiResponseWithPagination<{ slug: string; title: string }>
      >,
  );

  const idx = allSlugs.findIndex((p) => p.slug === currentSlug);

  return {
    // "previous" = older post = higher index in desc-sorted array
    prev: idx !== -1 && idx < allSlugs.length - 1 ? allSlugs[idx + 1] : null,
    // "next" = newer post = lower index
    next: idx > 0 ? allSlugs[idx - 1] : null,
  };
}

/**
 * Fetch all categories (for sidebar filter).
 */
export async function getAllCategories(): Promise<BlogCategory[]> {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:blog-categories");

  const response = await categoriesCollection.find({
    pagination: {
      pageSize: 50,
    },
  });

  const categories = (response?.data ?? []) as unknown as StrapiCategory[];
  return categories.map((cat) => ({
    name: cat.title,
    slug: cat.slug,
    count: 0,
  }));
}

/**
 * Build category counts from a list of blog posts.
 * Returns categories with a synthetic "All Articles" entry.
 */
export function buildCategoryCounts(
  posts: BlogPost[]
): Record<string, number> {
  const counts: Record<string, number> = { "All Articles": posts.length };
  for (const post of posts) {
    counts[post.category] = (counts[post.category] ?? 0) + 1;
  }
  return counts;
}
