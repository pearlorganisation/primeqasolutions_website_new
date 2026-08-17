/**
 * Life at PrimeQA page TypeScript types.
 *
 * The Life at PrimeQA page is a Strapi Single Type (api::life-at-primeqa.life-at-primeqa)
 */

import type { SeoMetaData } from "@/types/blog";
import type { StrapiAboutUsPageSection } from "./about-us";
import type { StrapiOfferBlock } from "./hire-qa-engineer";
import type { StrapiProductsBlock, StrapiCaseStudyBlockSection, StrapiClutchWidgetBlock } from "./home";

export type StrapiLifeAtPrimeqaPageSection =
  | StrapiAboutUsPageSection
  | StrapiOfferBlock
  | StrapiProductsBlock
  | StrapiCaseStudyBlockSection
  | StrapiClutchWidgetBlock;

export interface StrapiLifeAtPrimeqaPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  page_section: StrapiLifeAtPrimeqaPageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiLifeAtPrimeqaPageResponse {
  data: StrapiLifeAtPrimeqaPageData;
  meta: Record<string, unknown>;
}
