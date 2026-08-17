import type { Metadata } from "next";
import type { SeoMetaData } from "@/types/blog";
import { strapiMediaUrl } from "@/http/client";

export type StrapiSeoMeta = SeoMetaData | {
  title: string;
  description: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
} | null | undefined;

type OpenGraphType = Metadata["openGraph"] extends { type?: infer T } ? T : string;

function getImageUrls(image: unknown): string[] {
  if (!image) return [];

  if (Array.isArray(image)) {
    return image
      .map((item) => (item && typeof item === "object" && "url" in item ? (item as { url?: string }).url : undefined))
      .filter((url): url is string => Boolean(url))
      .map(strapiMediaUrl);
  }

  if (typeof image === "object" && image !== null && "url" in image) {
    const url = (image as { url?: string }).url;
    return url ? [strapiMediaUrl(url)] : [];
  }

  return [];
}

export function mapStrapiSeoToMetadata(
  rawMeta: StrapiSeoMeta,
  options?: {
    defaultTitle?: string;
    defaultDescription?: string;
    defaultCanonical?: string;
    defaultOpenGraphType?: OpenGraphType;
  }
): Metadata {
  // Check if it's the normalized version or the raw Strapi version
  const isNormalized = rawMeta && 'canonicalUrl' in rawMeta;

  const title = rawMeta?.title ?? options?.defaultTitle;
  const description = rawMeta?.description ?? options?.defaultDescription;
  
  const canonical = isNormalized 
    ? (rawMeta as any).canonicalUrl 
    : (rawMeta as SeoMetaData)?.canonical_url ?? (rawMeta as SeoMetaData)?.og?.url ?? options?.defaultCanonical;

  const keywords = (rawMeta as SeoMetaData)?.keywords?.flatMap((keyword) => keyword.label ? [keyword.label] : []);
  
  const openGraphTitle = isNormalized 
    ? (rawMeta as any).ogTitle 
    : (rawMeta as SeoMetaData)?.og?.title ?? title;
    
  const openGraphDescription = isNormalized 
    ? (rawMeta as any).ogDescription 
    : (rawMeta as SeoMetaData)?.og?.description ?? description;

  const imageUrls = isNormalized
    ? [(rawMeta as any).ogImageUrl].filter(Boolean)
    : getImageUrls((rawMeta as SeoMetaData)?.og?.image);

  const openGraphType = (options?.defaultOpenGraphType ?? "website") as OpenGraphType;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: canonical,
      type: openGraphType,
      images: imageUrls.length ? imageUrls : undefined,
    } as Metadata["openGraph"],
    twitter: {
      card: imageUrls.length ? "summary_large_image" : "summary",
      title: openGraphTitle,
      description: openGraphDescription,
      images: imageUrls.length ? imageUrls : undefined,
    },
  };

  return metadata;
}
