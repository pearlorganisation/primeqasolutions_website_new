import { STRAPI_URL } from "@/http/client";
import type { StrapiRichTextBlock, StrapiTextNode, StrapiLinkNode } from "@/types/home";

export function extractPlainText(blocks?: StrapiRichTextBlock[]): string {
  if (!Array.isArray(blocks)) return "";
  const parts: string[] = [];
  for (const block of blocks) {
    for (const child of block.children ?? []) {
      if (child.type === "text") {
        parts.push((child as StrapiTextNode).text);
      } else if (child.type === "link") {
        parts.push(
          (child as StrapiLinkNode).children?.map((cc) => cc.text).join("") ?? "",
        );
      }
    }
  }
  return parts.join(" ").trim();
}

export function toAbsUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}
