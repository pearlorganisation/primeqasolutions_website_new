/**
 * Industry page TypeScript types.
 *
 * The industry detail page reuses the same SERVICE_HERO block component as the
 * service pages — no separate industry-hero type is needed.
 *
 * Mirrors the same discipline used in service.ts / hire-qa-engineer.ts:
 *  • The page section union is what SectionRenderer and the block registry consume
 *  • The top-level page data shape matches the Strapi v5 JSON envelope
 */

import type { SeoMetaData } from "@/types/blog";
import type { StrapiServicePageSection } from "./service";
import type { StrapiClientSuccessBlock, StrapiProductsBlock } from "./home";

// ─── Industry Page Section Union ──────────────────────────────────────────────

/**
 * Full union of all dynamic-zone block types that can appear on an industry
 * detail page. Extends the shared service sections so every shared component
 * (hero, FAQ, CTA, tech stack, benefits, etc.) is automatically supported.
 */
export type StrapiIndustryPageSection =
  | StrapiServicePageSection
  | StrapiClientSuccessBlock
  | StrapiProductsBlock;

// ─── Full Page Data ───────────────────────────────────────────────────────────

export interface StrapiIndustryPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  /** URL slug, e.g. "fintech", "healthcare" */
  slug: string;
  /** Display name, e.g. "Fintech & Financial Services" */
  name: string;
  page_section: StrapiIndustryPageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiIndustryPageResponse {
  data: StrapiIndustryPageData[];
  meta: Record<string, unknown>;
}
