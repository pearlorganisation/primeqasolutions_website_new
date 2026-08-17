/**
 * Whom We Work With page TypeScript types.
 *
 * The Whom We Work With page is a Strapi Single Type (api::whom-we-work-with.whom-we-work-with)
 */

import type { SeoMetaData } from "@/types/blog";
import type { StrapiAboutUsPageSection } from "./about-us";
import type { StrapiOfferBlock } from "./hire-qa-engineer";
import type { StrapiProductsBlock, StrapiCaseStudyBlockSection, StrapiClutchWidgetBlock } from "./home";

export type StrapiWhomWeWorkWithPageSection =
  | StrapiAboutUsPageSection
  | StrapiOfferBlock
  | StrapiProductsBlock
  | StrapiCaseStudyBlockSection
  | StrapiClutchWidgetBlock;

export interface StrapiWhomWeWorkWithPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  page_section: StrapiWhomWeWorkWithPageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiWhomWeWorkWithPageResponse {
  data: StrapiWhomWeWorkWithPageData;
  meta: Record<string, unknown>;
}
