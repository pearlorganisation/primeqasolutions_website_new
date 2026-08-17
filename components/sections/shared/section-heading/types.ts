import React from "react";
import type { StrapiRichTextBlock } from "@/types/home";

export interface StrapiHeadingData {
  label?: string | null;
  title?: StrapiRichTextBlock[] | string;
  description?: StrapiRichTextBlock[] | string;
  align?: "left" | "center" | "right";
  variant?: string;
}

export interface BaseSectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  titleHighlight?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center" | "right";
  isDark?: boolean;
  /* Specific class overrides if needed */
  headingClassName?: string;
  descriptionClassName?: string;
}

export interface SectionHeaderProps extends BaseSectionHeaderProps {
  badge?: string | React.ReactNode;
}

export interface SectionHeaderV2Props extends BaseSectionHeaderProps {
  subHeading?: string | React.ReactNode;
}

export interface SectionHeaderResolverProps extends Omit<BaseSectionHeaderProps, "title"> {
  variant?: string;
  title?: React.ReactNode; 
}
