import { StrapiClientsBlock } from "@/types/home";
import { STRAPI_URL } from "@/http/client";

export type ClientsVariant = "v1";

export interface ClientsProps {
  data: StrapiClientsBlock;
  className?: string;
}

export function getMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
