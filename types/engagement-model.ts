/**
 * Engagement Model page TypeScript types.
 *
 * The Engagement Model page is a Strapi Single Type (api::engagement-models.engagement-models)
 */

import type { SeoMetaData } from "@/types/blog";
import type { StrapiAboutUsPageSection } from "./about-us";
import type { StrapiOfferBlock } from "./hire-qa-engineer";
import type { StrapiProductsBlock, StrapiCaseStudyBlockSection, StrapiClutchWidgetBlock } from "./home";

export type StrapiEngagementModelPageSection =
  | StrapiAboutUsPageSection
  | StrapiOfferBlock
  | StrapiProductsBlock
  | StrapiCaseStudyBlockSection
  | StrapiClutchWidgetBlock;

export interface StrapiEngagementModelPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  page_section: StrapiEngagementModelPageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiEngagementModelPageResponse {
  data: StrapiEngagementModelPageData;
  meta: Record<string, unknown>;
}
