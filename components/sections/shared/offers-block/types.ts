import { StrapiHeadingBlock, StrapiMediaImage, StrapiRichTextBlock } from "@/types/home";
import { BLOCKS } from "@/lib/utils/blocks";

export interface StrapiOfferFeature {
  id: number;
  icon?: StrapiMediaImage;
  title: string;
}

export interface StrapiOfferItem {
  id: number;
  offerId: string;
  title: string;
  description: StrapiRichTextBlock[];
  icon_list?: StrapiOfferFeature;
  image?: StrapiMediaImage;
}

export interface StrapiOfferBlock {
  __component: typeof BLOCKS.OFFER;
  id: number;
  variant?: "v1" | "v2";
  heading?: StrapiHeadingBlock;
  offers?: StrapiOfferItem[];
}

export interface OfferTabsProps {
  data?: StrapiOfferBlock;
  variant?: "v1" | "v2";
  className?: string;
}

export interface ResolvedOfferTabsProps {
  variant: "v1" | "v2";
  data?: StrapiOfferBlock;
  className?: string;
}

export function resolveOfferTabsProps(props: OfferTabsProps): ResolvedOfferTabsProps {
  const { data, variant, className } = props;
  
  return {
    variant: data?.variant || variant || "v1",
    data,
    className
  };
}
