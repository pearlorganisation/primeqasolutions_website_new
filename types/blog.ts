/**
 * Blog domain types — derived from Strapi-generated types in:
 *   types/contentTypes.d.ts  (ApiBlogBlog, ApiCategoryCategory, ApiTagTag)
 *   types/components.d.ts    (WidgetAccordion, SeoMetaData, SeoOg, BlockTitle)
 *
 * These types represent the actual JSON shapes returned by the Strapi v5 REST API
 * (flat attributes, no wrapper). Relations are populated inline as objects.
 */

// ─── Strapi v5 REST API response shapes ───────────────────────────────────────

/**
 * Strapi Upload File — matches PluginUploadFile attributes.
 * Used for `image` (Media) fields on Blog.
 */
export interface StrapiFile {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  url: string;           // relative path e.g. /uploads/foo.jpg
  width: number | null;
  height: number | null;
  mime: string;
  size: number;
  formats: {
    thumbnail?: StrapiFileFormat;
    small?: StrapiFileFormat;
    medium?: StrapiFileFormat;
    large?: StrapiFileFormat;
  } | null;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface StrapiFileFormat {
  url: string;
  width: number;
  height: number;
  size: number;
  mime: string;
  name: string;
}

/**
 * Author — matches PluginUsersPermissionsUser (populated from manyToOne relation on Blog.author).
 * Only a subset of fields is exposed; private fields are excluded.
 */
export interface StrapiUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string | null;
  confirmed: boolean | null;
  blocked: boolean | null;
  job_title: string;
  photo: StrapiFile;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  user_social_profiles: StrapiUserSocialProfile[];
}

export interface StrapiUserSocialProfile {
  id: number;
  documentId: string;
  username: string;
  link: string;
  platform: StrapiSocialPlatform;
}

export interface StrapiSocialPlatform {
  id: number;
  documentId: string;
  name: string;
  icon: StrapiFile;
}

/**
 * Category — matches ApiCategoryCategory attributes.
 */
export interface StrapiCategory {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

/**
 * Tag — matches ApiTagTag attributes.
 */
export interface StrapiTag {
  id: number;
  documentId: string;
  label: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

/**
 * FAQ accordion item — matches BlockTitle component (widget.accordion → item[]).
 */
export interface BlockTitle {
  id: number;
  label: string;
  description: unknown; // Strapi Blocks rich-text JSON
}

/**
 * FAQ accordion widget — matches WidgetAccordion component.
 */
export interface WidgetAccordion {
  id: number;
  item: BlockTitle[];
}

/**
 * OG component — matches SeoOg component.
 */
export interface SeoOg {
  id: number;
  title: string;
  description: string;
  url: string;
  image: StrapiFile | StrapiFile[] | null;
}

/**
 * Meta data component — matches SeoMetaData component.
 */
export interface SeoMetaData {
  id: number;
  title: string;
  description: string;
  canonical_url: string;
  og: SeoOg;
  keywords?: Array<{ id: number; documentId: string; label: string; slug: string }> | null;
}

/**
 * Full Blog post — matches ApiBlogBlog attributes as returned by Strapi v5 REST API.
 * Relations (author, categories, tags) are inline-populated objects.
 * image is an array of StrapiFile (Media<'images', true>).
 */
export interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  short_description: string;
  content: string;         // RichText — Markdown string from Strapi
  published: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  // Relations (populated)
  author: StrapiUser | null;
  categories: StrapiCategory[];
  tags: StrapiTag[];
  // Components
  image: StrapiFile[];     // Media<'images', true> returns array
  FAQs: WidgetAccordion;
  meta_data: SeoMetaData;
}

// ─── Strapi REST collection/single response envelopes ─────────────────────────

export interface StrapiBlogListResponse {
  data: StrapiBlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiBlogDetailResponse {
  data: StrapiBlogPost;
  meta: Record<string, unknown>;
}

export interface StrapyCategoryListResponse {
  data: StrapiCategory[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ─── Normalised / UI-facing types ─────────────────────────────────────────────

/**
 * Normalised blog post — safe, flat shape consumed by all UI components.
 * Derived from StrapiBlogPost via the normaliser in lib/strapi/blog.ts.
 */
export interface BlogPost {
  /** Strapi documentId */
  id: string;
  slug: string;
  /** Primary category name (first in categories array, or "Uncategorised") */
  category: string;
  categorySlug: string;
  title: string;
  /** Derived from short_description */
  excerpt: string;
  /** Raw markdown content from Strapi RichText */
  content: string;
  readTime: string;
  /** Formatted publish date e.g. "Mar 28, 2025" */
  published: string;
  /** Raw ISO date string from the custom "published" field — used for sorting */
  publishedRaw: string;
  /** Absolute image URL — from first item in image[] array */
  image: string;
  imageAlt: string;
  /** Image dimensions from Strapi — used for ImageObject in JSON-LD */
  imageWidth?: number | null;
  imageHeight?: number | null;
  author: {
    name: string;
    jobTitle: string;
    avatar: string;
    socials: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
  };
  /** Tag labels */
  tags: string[];
  /** Raw FAQ items from WidgetAccordion component */
  faqs: Array<{ question: string; answer: unknown }>;
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImageUrl: string;
  } | null;
}

/** Category with post count — for sidebar filter */
export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}
