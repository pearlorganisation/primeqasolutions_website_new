import type { SeoMetaData } from "@/types/blog";

// We'll use a broad type for sections to match the generated Strapi schema dynamically
export type StrapiProductPageSection = {
  __component: string;
  id: number;
  [key: string]: any;
};

export interface StrapiProduct {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  slug: string;
  name: string;
  description: any; // Strapi Blocks rich text
  image?: any; // Strapi Media
  link?: any; 
  page_section: StrapiProductPageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiProductResponse {
  data: StrapiProduct[];
  meta: Record<string, unknown>;
}
