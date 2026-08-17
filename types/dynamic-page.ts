import type { SeoMetaData } from "@/types/blog";
import type { StrapiHomePageSection } from "@/types/home";

export interface StrapiDynamicPageData {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  page_section: StrapiHomePageSection[];
  meta_data?: SeoMetaData | null;
}

export interface StrapiDynamicPageResponse {
  data: StrapiDynamicPageData[];
  meta: Record<string, unknown>;
}
