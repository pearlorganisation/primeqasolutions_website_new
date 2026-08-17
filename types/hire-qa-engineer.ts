import { BLOCKS } from "@/lib/utils/blocks";
import type { SeoMetaData } from "@/types/blog";
import type {
  StrapiClientSuccessBlock,
  StrapiProductsBlock,
} from "./home";

import type {
  StrapiServicePageSection,
} from "./service";

export interface StrapiOfferBlock {
  __component: typeof BLOCKS.OFFER;
  id: number;
  [key: string]: any;
}

/** Union of all known dynamic-zone section types for the hire qa engineer page */
export type StrapiHireQaEngineerPageSection =
  | StrapiServicePageSection
  | StrapiOfferBlock
  | StrapiClientSuccessBlock
  | StrapiProductsBlock;

export interface StrapiHireQaEngineerPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  slug: string;
  name: string; 
  page_section: StrapiHireQaEngineerPageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiHireQaEngineerPageResponse {
  data: StrapiHireQaEngineerPageData[];
  meta: Record<string, unknown>;
}
