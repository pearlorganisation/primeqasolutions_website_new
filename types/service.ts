import { BLOCKS } from "@/lib/utils/blocks";
import type { SeoMetaData } from "@/types/blog";
import type {
  StrapiHeadingBlock,
  StrapiMediaImage,
  StrapiRichTextBlock,
  StrapiServiceBlock,
  StrapiWhyChooseBlock,
  StrapiTechStackBlock,
  StrapiFaqBlock,
  StrapiCtaBlock,
  StrapiCtaButtonBlock,
} from "./home";

export interface StrapiServiceHeroBlock {
  __component: typeof BLOCKS.SERVICE_HERO;
  id: number;
  [key: string]: any;
}

export interface StrapiClientStripBlock {
  __component: typeof BLOCKS.CLIENT_STRIP;
  id: number;
  [key: string]: any;
}

export interface StrapiTrustBuildingBlock {
  __component: typeof BLOCKS.TRUST_BUILDING;
  id: number;
  [key: string]: any;
}

export interface StrapiBenefitsBlock {
  __component: typeof BLOCKS.BENEFITS;
  id: number;
  [key: string]: any;
}

export interface StrapiPricingBlock {
  __component: typeof BLOCKS.PRICING;
  id: number;
  [key: string]: any;
}

export interface StrapiAutomationProcessBlock {
  __component: typeof BLOCKS.AUTOMATION_PROCESS;
  id: number;
  heading?: StrapiHeadingBlock;
  process_items?: StrapiProcessItem[];
  variant: "v1" | "v2";
}

export interface StrapiProcessItem {
  id: number;
  title: string;
  description: StrapiRichTextBlock[];
  icon?: StrapiMediaImage;
  no?: number;
  sub_block_items?: StrapiProcessSubBlockItem[];
}

export interface StrapiProcessSubBlockItem {
  id: number;
  label?: string;
  title?: string;
  description?: StrapiRichTextBlock[];
}

/** Union of all known dynamic-zone section types for the service page */
export type StrapiServicePageSection =
  | StrapiServiceBlock
  | StrapiWhyChooseBlock
  | StrapiTechStackBlock
  | StrapiFaqBlock
  | StrapiCtaBlock
  | StrapiCtaButtonBlock
  | StrapiServiceHeroBlock
  | StrapiClientStripBlock
  | StrapiTrustBuildingBlock
  | StrapiBenefitsBlock
  | StrapiPricingBlock
  | StrapiAutomationProcessBlock;

// ─── Full service-page response shape ───────────────────────────────────────────

export interface StrapiServicePageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  slug: string;
  title: string; // The service name, e.g., "Test Automation"
  page_section: StrapiServicePageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiServicePageResponse {
  data: StrapiServicePageData[];
  meta: Record<string, unknown>;
}
