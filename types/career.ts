/**
 * Career page TypeScript types.
 *
 * Two Strapi content types power the careers section:
 *  1. `api::career.career`     — Single Type with the hero section
 *  2. `api::job-list.job-list` — Collection Type for individual job listings
 *
 * Types here match the Strapi v5 REST API JSON shapes (flat attributes, no wrapper).
 */

import type { SeoMetaData } from "@/types/blog";

// ─── Section Hero (reused from block.service-hero) ────────────────────────────

export interface StrapiCareerHero {
  id: number;
  title: string;
  label?: string | null;
  description: any; // Strapi Blocks rich-text JSON
  image?: {
    id: number;
    url: string;
    alternativeText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  primaryButton?: {
    label?: string | null;
    link?: string | null;
  } | null;
  secondaryButton?: {
    label?: string | null;
    link?: string | null;
  } | null;
}

// ─── Career Single Type Page Data ─────────────────────────────────────────────

export interface StrapiCareerPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  section_hero?: StrapiCareerHero | null;
  meta_data?: SeoMetaData | null;
}

// ─── Job List Collection Type ─────────────────────────────────────────────────

export interface StrapiJobListItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  role: string;
  location: string;
  job_type: string;
  short_description?: string | null;
  Content: string; // RichText — Markdown string from Strapi
  meta_data?: SeoMetaData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ─── API Response Envelopes ──────────────────────────────────────────────────

export interface StrapiCareerPageResponse {
  data: StrapiCareerPageData;
  meta: Record<string, unknown>;
}

export interface StrapiJobListResponse {
  data: StrapiJobListItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiJobDetailResponse {
  data: StrapiJobListItem[];
  meta: Record<string, unknown>;
}
