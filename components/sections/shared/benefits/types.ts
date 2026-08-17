import React from "react";

export interface BenefitItem {
  id?: number;
  title: string;
  icon?: {
    url?: string;
    alternativeText?: string;
  } | React.ElementType;
}

export interface BenefitsProps {
  data?: any;
  className?: string;
  items?: BenefitItem[];
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
}

export type BenefitsVariant = "v1";
