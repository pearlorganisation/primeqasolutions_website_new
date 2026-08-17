import { StrapiIndustryBlock, StrapiRichTextBlock, StrapiTextNode, StrapiLinkNode } from "@/types/home";
import { STRAPI_URL } from "@/http/client";

export type IndustryVariant = "v1";

export interface IndustryProps {
  data: StrapiIndustryBlock;
  className?: string;
}

export function getMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export function extractPlainText(blocks?: StrapiRichTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";

  let text = "";
  for (const block of blocks) {
    if (!block.children) continue;
    for (const child of block.children) {
      if (child.type === "text") {
        text += (child as StrapiTextNode).text;
      } else if (child.type === "link") {
        const linkNode = child as StrapiLinkNode;
        text += linkNode.children.map((c) => (c.type === "text" ? c.text : "")).join("");
      }
    }
    text += " ";
  }
  return text.trim();
}
