/**
 * Case Study domain types — based on the new Strapi page_section dynamic-zone.
 *
 * Strapi collection: "case-studies"
 * Fields: name, slug, description, meta_data, page_section (DynamicZone)
 *
 * Dynamic zone blocks:
 *  - block.case-study-hero-block
 *  - block.case-study-info-block
 *  - block.case-study-state-block
 *  - block.case-study-tech-stack-block
 *  - block.client-success-item
 *  - block.case-study-main-content-block
 */

import type { SeoMetaData } from "./blog";

import type { StrapiButton } from "./home";

// ─── Primitive / shared sub-types ────────────────────────────────────────────

export interface StrapiMediaFile {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  name: string;
}

// ─── Block: block.case-study-hero-block ──────────────────────────────────────

export interface CaseStudyHeroBlock {
  __component: "block.case-study-hero-block";
  id: number;
  heading?: string | null;
  /** Strapi Blocks (rich text) */
  description?: unknown[] | null;
  primaryButton?: StrapiButton | null;
}

// ─── Block: block.case-study-info-block ──────────────────────────────────────

export interface CaseStudyInfoBlock {
  __component: "block.case-study-info-block";
  id: number;
  Industry?: string;
  published: string;
  testing_type: string;
  Headquarters?: string;
  headquarters?: string;
}

// ─── Block: block.case-study-state-item (sub-component) ──────────────────────

export interface CaseStudyStatItem {
  id: number;
  stats: string;
  label: string;
  description: string;
}

// ─── Block: block.case-study-state-block ─────────────────────────────────────

export interface CaseStudyStateBlock {
  __component: "block.case-study-state-block";
  id: number;
  stats_items?: CaseStudyStatItem[];
}

// ─── Block: block.tech-item (sub-component) ───────────────────────────────────

export interface TechItem {
  id: number;
  name: string;
  icon?: StrapiMediaFile | null;
}

// ─── Block: block.case-study-tech-stack-block ─────────────────────────────────

export interface CaseStudyTechStackBlock {
  __component: "block.case-study-tech-stack-block";
  id: number;
  heading?: string | null;
  tech_stacks?: TechItem[];
}

// ─── Block: block.client-details (sub-component) ─────────────────────────────

export interface ClientDetails {
  id: number;
  name: string;
  designation: string;
  photo?: StrapiMediaFile | null;
}

// ─── Block: block.client-success-item ─────────────────────────────────────────

export interface CaseStudyClientSuccessItem {
  __component: "block.client-success-item";
  id: number;
  /** Strapi Blocks (rich text) */
  testimonial?: unknown[] | null;
  client?: ClientDetails | null;
  video?: StrapiMediaFile | null;
}

// ─── Block: block.case-study-main-content-block ───────────────────────────────

export interface CaseStudyMainContentBlock {
  __component: "block.case-study-main-content-block";
  id: number;
  /** Strapi RichText (markdown) */
  content?: string | null;
}

// ─── Union type for page_section dynamic zone ─────────────────────────────────

export type CaseStudyPageSection =
  | CaseStudyHeroBlock
  | CaseStudyInfoBlock
  | CaseStudyStateBlock
  | CaseStudyTechStackBlock
  | CaseStudyClientSuccessItem
  | CaseStudyMainContentBlock;

// ─── Top-level Strapi document ────────────────────────────────────────────────

export interface StrapiCaseStudy {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  industry?: { documentId?: string; name: string; slug: string } | null;
  service?: { documentId?: string; name: string; slug: string } | null;
  meta_data?: SeoMetaData | null;
  image?: StrapiMediaFile | null;
  page_section?: CaseStudyPageSection[];
}

// ─── List response wrapper ────────────────────────────────────────────────────

export interface StrapiCaseStudyListResponse {
  data: StrapiCaseStudy[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ─── Normalised / UI-facing card type (for listing page) ──────────────────────

export interface CaseStudy {
  id: string;
  slug: string;
  /** `name` field from Strapi */
  title: string;
  excerpt: string;
  date: string;
  /** Industry from the info block, or empty string */
  industry: string;
  /** Testing type from the info block, or empty string */
  testingType: string;
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    ogTitle: string;
    ogDescription: string;
    ogImageUrl: string;
  } | null;
  image: string;
  imageAlt: string;
}

/** Industry with count — for filter chips */
export interface CaseStudyIndustry {
  name: string;
  slug: string;
  count: number;
}

/** Testing type with count — for filter chips */
export interface CaseStudyTestingType {
  name: string;
  slug: string;
  count: number;
}
