/**
 * About Us page TypeScript types.
 *
 * The About Us page is a Strapi Single Type (api::about-us.about-us)
 * with a rich set of dynamic zone blocks including a team section and split blocks.
 *
 * Mirrors the same discipline used in service.ts / industry.ts:
 *  • The page section union is what SectionRenderer and the block registry consume
 *  • The top-level page data shape matches the Strapi v5 JSON envelope
 */

import { BLOCKS } from "@/lib/utils/blocks";
import type { SeoMetaData } from "@/types/blog";
import type { StrapiServicePageSection } from "./service";
import type { StrapiMediaImage, StrapiHeadingBlock, StrapiRichTextBlock, StrapiButton } from "./home";

// ─── Team Member ──────────────────────────────────────────────────────────────

export interface StrapiTeamMember {
  id: number;
  name: string;
  role: string;
  image: StrapiMediaImage;
  linkedin?: string | null;
  twitter?: string | null;
}

// ─── Team Block ──────────────────────────────────────────────────────────────

export interface StrapiTeamBlock {
  __component: typeof BLOCKS.TEAM_BLOCK;
  id: number;
  variant?: "v1" | "v2";
  heading: StrapiHeadingBlock;
  members: StrapiTeamMember[];
}

// ─── Split Block ─────────────────────────────────────────────────────────────

export interface StrapiSplitBlock {
  __component: typeof BLOCKS.SPLIT_BLOCK;
  id: number;
  heading: string;
  description: StrapiRichTextBlock[];
  image: StrapiMediaImage;
  align?: "left" | "right";
  primaryButton?: StrapiButton;
  secondaryButton?: StrapiButton;
}

// ─── Heading Block (standalone) ───────────────────────────────────────────────

export interface StrapiStandaloneHeadingBlock {
  __component: typeof BLOCKS.HEADING_BLOCK;
  id: number;
  label: string;
  title: StrapiRichTextBlock[];
  description: StrapiRichTextBlock[];
  align?: "center" | "left" | "right";
  variant?: "v1" | "v2";
}

// ─── Office Gallery Block ───────────────────────────────────────────────────

export interface StrapiGalleryItem {
  id: number;
  altText: string;
  colSpan: "1" | "2" | "4";
  rowSpan: "1" | "2";
  image: StrapiMediaImage;
}

export interface StrapiOfficeGalleryBlock {
  __component: typeof BLOCKS.OFFICE_GALLERY_BLOCK;
  id: number;
  heading: StrapiHeadingBlock;
  images: StrapiGalleryItem[];
}

// ─── About Us Page Section Union ──────────────────────────────────────────────

/**
 * Full union of all dynamic-zone block types that can appear on the About Us
 * page. Extends the shared service sections so every shared component
 * (hero, FAQ, CTA, tech stack, benefits, etc.) is automatically supported.
 */
export type StrapiAboutUsPageSection =
  | StrapiServicePageSection
  | StrapiTeamBlock
  | StrapiSplitBlock
  | StrapiStandaloneHeadingBlock
  | StrapiOfficeGalleryBlock;

// ─── Full Page Data ───────────────────────────────────────────────────────────

export interface StrapiAboutUsPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  page_section: StrapiAboutUsPageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiAboutUsPageResponse {
  data: StrapiAboutUsPageData;
  meta: Record<string, unknown>;
}
