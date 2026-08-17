import type { StrapiFaqBlock, StrapiRichTextBlock } from "@/types/home";
import { FaqSection } from "./faq-section-v1";
import { parseHighlight } from "@/lib/utils/text-utils";

interface FaqResolverProps {
  data: StrapiFaqBlock;
  allSections?: any[];
}

/** Flatten Strapi rich-text blocks into a plain string. */
function flattenRichText(blocks?: StrapiRichTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  const parts: string[] = [];
  for (const block of blocks) {
    for (const child of block.children ?? []) {
      if (child.type === "text") {
        parts.push(child.text ?? "");
      } else if (child.type === "link") {
        parts.push(child.children?.map((cc: any) => cc.text).join("") ?? "");
      }
    }
  }
  return parts.join(" ").trim();
}

export function FaqResolver({ data }: FaqResolverProps) {
  if (!data) return null;

  const { title, highlight } = parseHighlight(data.heading);

  // Flatten the nested accordion → item structure into a simple array
  const items: Array<{ question: string; answer: string }> = [];
  for (const accordion of data.faq ?? []) {
    for (const item of accordion.item ?? []) {
      items.push({
        question: item.label,
        answer: flattenRichText(item.description),
      });
    }
  }

  return (
    <FaqSection
      badge={data.label}
      title={title}
      titleHighlight={highlight}
      description={data.description}
      items={items.length > 0 ? items : undefined}
    />
  );
}
