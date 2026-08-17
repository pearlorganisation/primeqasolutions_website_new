import type { PricingVariant } from "./pricing-resolver";

export type { PricingVariant };

export interface PricingPlan {
  label: string;
  name: string;
  subtitle: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
}

export interface PricingProps {
   
  data?: any;
  variant?: PricingVariant;
  className?: string;
  plans?: PricingPlan[];
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
}
