/**
 * Become a Partner page TypeScript types.
 *
 * The Become a Partner page is a Strapi Single Type (api::become-partner.become-partner)
 * with the same set of dynamic zone blocks used on the Hire QA Engineer page.
 *
 * Mirrors the discipline used in about-us.ts / hire-qa-engineer.ts:
 *  • The page section union is what SectionRenderer and the block registry consume
 *  • The top-level page data shape matches the Strapi v5 JSON envelope for single types
 */

import type { SeoMetaData } from "@/types/blog";
import type {
  StrapiClientSuccessBlock,
  StrapiProductsBlock,
} from "./home";
import type { StrapiServicePageSection } from "./service";
import type { StrapiOfferBlock } from "./hire-qa-engineer";

// ─── Section Union ────────────────────────────────────────────────────────────

/**
 * Full union of all dynamic-zone block types that can appear on the
 * Become a Partner page. Extends the shared service sections so every
 * shared component (hero, FAQ, CTA, tech stack, benefits, etc.) is
 * automatically supported — identical to Hire QA Engineer.
 */
export type StrapiBecomePartnerPageSection =
  | StrapiServicePageSection
  | StrapiOfferBlock
  | StrapiClientSuccessBlock
  | StrapiProductsBlock;

// ─── Full Page Data (Single Type) ─────────────────────────────────────────────

export interface StrapiBecomePartnerPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  page_section: StrapiBecomePartnerPageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiBecomePartnerPageResponse {
  data: StrapiBecomePartnerPageData;
  meta: Record<string, unknown>;
}
