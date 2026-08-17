import type { SeoMetaData } from "@/types/blog";
import { BLOCKS } from "@/lib/utils/blocks";

// ─── Strapi Rich Text (Blocks v5) ─────────────────────────────────────────────

/** A single inline text node inside a block */
export interface StrapiTextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

/** A link node inside a block */
export interface StrapiLinkNode {
  type: "link";
  url: string;
  children: StrapiTextNode[];
}

export type StrapiInlineNode = StrapiTextNode | StrapiLinkNode;

/** A single rich-text block (paragraph, heading, list, etc.) */
export interface StrapiRichTextBlock {
  type: "paragraph" | "heading" | "list" | "list-item" | "quote" | "code";
  level?: 1 | 2 | 3 | 4 | 5 | 6; // headings only
  format?: "ordered" | "unordered"; // lists only
  children: StrapiInlineNode[];
}

/** Convenience alias used in block props */
export type StrapiRichText = StrapiRichTextBlock;

// ─── Strapi Button sub-component ─────────────────────────────────────────────

export interface StrapiButton {
  id?: number;
  label: string;
  link: string;
  /** @deprecated — use `link` instead (kept for backward compat) */
  url?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  openInNewTab?: boolean;
}

// ─── Strapi Media types ───────────────────────────────────────────────────────

export interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface StrapiMediaImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    thumbnail?: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  /** Relative URL, e.g. "/uploads/badge_abc123.webp" — prefix with STRAPI_URL in components */
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: Record<string, unknown> | null;
}

// ─── Certification sub-component ──────────────────────────────────────────────

export interface StrapiCertification {
  id: number;
  altText: string;
  label: string | null;
  image: StrapiMediaImage;
}

// ─── Page-section block types ─────────────────────────────────────────────────

/**
 * block.hero  (collectionName: components_block_heros)
 * Maps to Strapi component "block.hero"
 */
export interface StrapiHeroBlock {
  __component: typeof BLOCKS.HERO;
  id: number;
  label: string;
  title: StrapiRichTextBlock[];
  description: StrapiRichTextBlock[];
  primaryButton?: StrapiButton;
  secondaryButton?: StrapiButton;
  quote?: string;
}

/**
 * block.services (legacy — keep for backward compat)
 */
export interface StrapiServicesBlock {
  __component: typeof BLOCKS.CLIENTS; // or whatever legacy mapping was there, but matching the constant is safer
  id: number;
}

/**
 * block.service-block
 * Strapi component with heading sub-component + repeatable services
 */
export interface StrapiServiceBlockHeading {
  id: number;
  label?: string;
  title?: StrapiRichTextBlock[];
  description?: StrapiRichTextBlock[];
  align?: "center" | "left" | "right";
  variant?: "v1" | "v2";
}

export interface StrapiServiceLink {
  id: number;
  label: string;
  link: string;
}

export interface StrapiServiceItem {
  id: number;
  title: string;
  description?: StrapiRichTextBlock[];
  icon?: StrapiMediaImage;
  link?: StrapiServiceLink;
  lineLimit?: number;
}

export interface StrapiServiceBlock {
  __component: typeof BLOCKS.SERVICES;
  id: number;
  heading?: StrapiServiceBlockHeading;
  services: StrapiServiceItem[];
}

/**
 * block.clients
 * Maps to Strapi component "block.clients"
 */
export interface StrapiClientsBlock {
  __component: typeof BLOCKS.CLIENTS;
  id: number;
  Heading?: StrapiHeadingBlock;
  logo?: StrapiMediaImage[];
}

export interface StrapiHeadingBlock {
  id: number;
  label: string;
  title: StrapiRichTextBlock[];
  description: StrapiRichTextBlock[];
  align?: "center" | "left" | "right";
  variant?: "v1" | "v2";
}

export interface StrapiProductItem {
  id: number;
  custom_label?: string;
  custom_link?: { id: number; label: string; link: string };
  product?: {
    id: number;
    documentId: string;
    name: string;
    description: StrapiRichTextBlock[];
    image?: StrapiMediaImage;
    link?: { id: number; label: string; link: string };
    slug?: string;
  };
}

/**
 * block.products-block
 * Maps to Strapi component "block.products-block"
 */
export interface StrapiProductsBlock {
  __component: typeof BLOCKS.PRODUCTS;
  id: number;
  variant?: "v1" | "v2";
  heading?: StrapiHeadingBlock;
  products?: StrapiProductItem[];
}

/**
 * block.ai-advantage
 * Maps to Strapi component "block.ai-advantage"
 */
export interface StrapiAiAdvantageBlock {
  __component: typeof BLOCKS.AI_ADVANTAGE;
  id: number;
  heading?: StrapiHeadingBlock;
  feature_items: StrapiServiceItem[];
  circle_items: StrapiServiceItem[];
}

/**
 * block.global-excellence
 * Maps to Strapi component "block.global-excellence"
 */
export interface StrapiGlobalExcellenceBlock {
  __component: typeof BLOCKS.GLOBAL_EXCELLENCE;
  id: number;
}

/**
 * block.faq
 * Maps to Strapi component "block.faq"
 */
export interface StrapiTitleBlock {
  id: number;
  label: string;
  description: StrapiRichTextBlock[];
}

export interface StrapiAccordionWidget {
  id: number;
  item: StrapiTitleBlock[];
}

export interface StrapiFaqCta {
  id: number;
  icon?: StrapiMediaImage;
  title: string;
  description: string;
  button?: StrapiButton;
}

export interface StrapiFaqBlock {
  __component: typeof BLOCKS.FAQ;
  id: number;
  label?: string;
  heading?: string;
  description?: string | any[];
  faq?: StrapiAccordionWidget[];
  faq_cta?: StrapiFaqCta;
}

/**
 * block.blog
 * Maps to Strapi component "block.blog"
 */
export interface StrapiBlogBlock {
  __component: typeof BLOCKS.BLOG;
  id: number;
}

/**
 * block.certification-block
 * Maps to Strapi component "block.certification-block"
 */
export interface StrapiCertificationBlock {
  __component: typeof BLOCKS.CERTIFICATION;
  id: number;
  title: string;
  certifications: StrapiCertification[];
}

/**
 * block.feature-section
 * Maps to Strapi component "block.feature-section"
 */
export interface StrapiWhyChooseBlockHeading {
  id: number;
  label: string;
  title: StrapiRichTextBlock[];
  description: StrapiRichTextBlock[];
  align?: "center" | "left" | "right";
  variant?: "v1" | "v2";
}

export interface StrapiWhyChooseBlockStat {
  id: number;
  number: string;
  label: string;
}

export interface StrapiWhyChooseBlockItem {
  id: number;
  title: string;
  description: StrapiRichTextBlock[];
  icon: StrapiMediaImage;
}

export interface StrapiWhyChooseBlock {
  __component: typeof BLOCKS.FEATURE;
  id: number;
  variant?: "split_list" | "split_grid" | "split_icon_top" | "centered_grid";
  heading: StrapiWhyChooseBlockHeading;
  stats: StrapiWhyChooseBlockStat[];
  items: StrapiWhyChooseBlockItem[];
}

export interface StrapiCtaButtonBlock {
  __component: typeof BLOCKS.CTA_BUTTON;
  id: number;
  variant?: "v1" | "v2";
  title: string;
  description: string;
  button?: StrapiButton;
}

export interface StrapiClientDetails {
  id: number;
  name: string;
  designation: string;
  photo: StrapiMediaImage;
}

export interface StrapiClientSuccessItem {
  id: number;
  video?: StrapiMediaImage;
  youtube_video_link?: string;
  testimonial: StrapiRichTextBlock[];
  client: StrapiClientDetails;
}

export interface StrapiClientSuccessBlock {
  __component: typeof BLOCKS.CLIENT_SUCCESS;
  id: number;
  variant?: "v1" | "v2";
  header: StrapiHeadingBlock;
  testimonials: StrapiClientSuccessItem[];
}

export interface StrapiFrameworkItem {
  id: number;
  number: string;
  title: string;
  description: StrapiRichTextBlock[];
}

export interface StrapiCollaborationFrameworkBlock {
  __component: typeof BLOCKS.METHODOLOGY;
  id: number;
  variant?: "v1" | "v2";
  heading: StrapiHeadingBlock;
  items: StrapiFrameworkItem[];
}

export interface StrapiTechStackTool {
  id: number;
  name?: string;
  title?: string;
  icon?: StrapiMediaImage;
}

export interface StrapiTechStackCategory {
  id: number;
  name?: string;
  category?: string;
  technologies: StrapiTechStackTool[];
}

export interface StrapiTechStackBlock {
  __component: typeof BLOCKS.TECH_STACK;
  id: number;
  variant?: "v1" | "v2";
  heading?: StrapiHeadingBlock;
  categories: StrapiTechStackCategory[];
}

export interface StrapiFormFieldDynamic {
  id: number;
  name: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "number" | "tel" | "textarea" | "select";
  required: boolean;
}

export interface StrapiContactFormBlock {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  privacyDisclaimer: string;
  input_field: StrapiFormFieldDynamic[];
}

export interface StrapiStatItem {
  id: number;
  number: string;
  label: string;
}

export interface StrapiCtaBlock {
  __component: typeof BLOCKS.CTA;
  id: number;
  variant?: "v1" | "v2";
  heading: StrapiHeadingBlock;
  stats: StrapiStatItem[];
  form: StrapiContactFormBlock;
}

// ─── Case Study Block (block.case-study-block) ─────────────────────────────────

/** A single stat/metric from `block.case-study-state-item` */
export interface StrapiCaseStudyStatItem {
  id: number;
  /** e.g. "40%" */
  stats: string;
  /** e.g. "Latency Reduction" */
  label: string;
  /** Supporting description sentence */
  description: string;
}

/** A related `api::case-study.case-study` entry with nested blocks populated */
export interface StrapiCaseStudyEntry {
  id: number;
  documentId: string;
  /** Display name of the case study */
  name: string;
  /** URL-safe slug */
  slug: string;
  /** Short description shown on cards */
  description: string;
  image?: StrapiMediaImage;
  /** All dynamic-zone blocks of this case study (info + stats blocks come back here) */
  page_section: Array<
    | {
        __component: typeof BLOCKS.CASE_STUDY_INFO;
        id: number;
        /** Industry tag, e.g. "FinTech" */
        Industry: string;
        published: string;
        testing_type: string;
      }
    | {
        __component: typeof BLOCKS.CASE_STUDY_STATS;
        id: number;
        stats_items: StrapiCaseStudyStatItem[];
      }
    | { __component: string; id: number; [key: string]: unknown }
  >;
}

/**
 * block.case-study-block
 * A section block that holds a heading + relation to case study entries.
 */
export interface StrapiCaseStudyBlockSection {
  __component: typeof BLOCKS.CASE_STUDY_BLOCK;
  id: number;
  variant?: "v1" | "v2";
  heading?: StrapiHeadingBlock;
  case_studies: StrapiCaseStudyEntry[];
}

export interface StrapiClutchWidgetBlock {
  __component: typeof BLOCKS.CLUTCH_WIDGET;
  id: number;
}

export interface StrapiIndustryEntry {
  id: number;
  documentId: string;
  name: string;
  slug?: string;
  page_section?: Array<{
    __component: typeof BLOCKS.SERVICE_HERO;
    id: number;
    image?: StrapiMediaImage;
    description?: StrapiRichTextBlock[];
  } | { __component: string; id: number; [key: string]: unknown }>;
}

export interface StrapiIndustryBlock {
  __component: typeof BLOCKS.INDUSTRY_BLOCK;
  id: number;
  heading?: StrapiHeadingBlock;
  industries?: StrapiIndustryEntry[];
}

/** Union of all known dynamic-zone section types */
export type StrapiHomePageSection =
  | StrapiHeroBlock
  | StrapiServicesBlock
  | StrapiServiceBlock
  | StrapiClientsBlock
  | StrapiProductsBlock
  | StrapiAiAdvantageBlock
  | StrapiGlobalExcellenceBlock
  | StrapiFaqBlock
  | StrapiBlogBlock
  | StrapiCertificationBlock
  | StrapiWhyChooseBlock
  | StrapiCtaButtonBlock
  | StrapiClientSuccessBlock
  | StrapiCollaborationFrameworkBlock
  | StrapiTechStackBlock
  | StrapiCtaBlock
  | StrapiCaseStudyBlockSection
  | StrapiClutchWidgetBlock
  | StrapiIndustryBlock
  | StrapiCtaFormBlock;

export interface StrapiCtaFormBlock {
  __component: typeof BLOCKS.CTA_FORM;
  id: number;
  heading?: StrapiHeadingBlock;
  content: string;
}

// ─── Legacy normalised shape (used by getHeroData) ────────────────────────────

export interface HeroData {
  label: string;
  title: string;
  description: string;
  quote: string;
}

// ─── Full home-page response shape ───────────────────────────────────────────

export interface StrapiHomePageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  page_section: StrapiHomePageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiHomePageResponse {
  data: StrapiHomePageData;
  meta: Record<string, unknown>;
}
