import { StrapiButton, StrapiMediaImage, StrapiRichTextBlock } from "@/types/home";

export interface StrapiSectionHeroBlock {
  id?: number;
  variant?: "v1" | "v2";
  label?: string;
  heading?: string;
  title?: string | StrapiRichTextBlock[];
  description?: string | StrapiRichTextBlock[];
  image?: StrapiMediaImage;
  videoUrl?: string;
  primaryButton?: StrapiButton;
  secondaryButton?: StrapiButton;
}

// ─── Breadcrumb & Stat types (merged from page-hero) ───────────────────────
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeroStat {
  value: string;
  label: string;
}

// ─── Unified props ─────────────────────────────────────────────────────────
export interface SectionHeroProps {
  /** Strapi data object — when provided, breadcrumbs/title/description are derived from it */
  data?: StrapiSectionHeroBlock | any;
  variant?: "v1" | "v2";
  className?: string;

  // ─── Direct props (take precedence over data-derived values) ────────────
  /** Breadcrumb trail — e.g. [{label:"Home",href:"/"},{label:"Blog"}] */
  breadcrumbs?: BreadcrumbItem[];
  /** Main page title — supports ReactNode so you can bold/color specific words */
  title?: React.ReactNode;
  /** Subtitle / description paragraph */
  description?: string;
  /** Optional stat pills shown below the description */
  stats?: PageHeroStat[];
  /** Optional slot rendered to the right of the text content (decorative, desktop only) */
  rightSlot?: React.ReactNode;
  /** Optional children rendered below the description/stats (useful for buttons/CTAs) */
  children?: React.ReactNode;
}

export interface ResolvedSectionHeroProps {
  variant: "v1" | "v2";
  data?: StrapiSectionHeroBlock | any;
  className?: string;
}

export function resolveSectionHeroProps(props: SectionHeroProps): ResolvedSectionHeroProps {
  const { data, variant, className } = props;
  
  return {
    variant: data?.variant || variant || "v1",
    data,
    className
  };
}
