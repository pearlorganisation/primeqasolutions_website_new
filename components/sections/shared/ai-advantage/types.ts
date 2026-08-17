import { StrapiAiAdvantageBlock, StrapiRichTextBlock, StrapiMediaImage, StrapiTextNode, StrapiLinkNode } from "@/types/home";
import { STRAPI_URL } from "@/http/client";

export type AiAdvantageVariant = "v1" | "v2" | "v3" | "v4";

/** Prefix relative Strapi URLs with the base URL */
export function toAbsUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

export interface AiAdvantageItem {
  iconImage?: StrapiMediaImage;
  title: string;
  description: StrapiRichTextBlock[];
  link?: { label: string; link: string };
}

export interface AiAdvantageProps {
  data?: StrapiAiAdvantageBlock;
  badge?: string;
  title?: string;
  description?: string;
  feature_items?: AiAdvantageItem[];
  circle_items?: AiAdvantageItem[];
  className?: string;
}

export interface ResolvedAiAdvantageProps {
  badge?: string;
  title?: string;
  description?: string;
  feature_items: AiAdvantageItem[];
  circle_items: AiAdvantageItem[];
}

export function resolveAiAdvantageProps(
  props: AiAdvantageProps
): ResolvedAiAdvantageProps {
  const { data, badge, title, description, feature_items, circle_items } = props;

  const resolved: ResolvedAiAdvantageProps = {
    badge,
    title,
    description,
    feature_items: feature_items ?? [],
    circle_items: circle_items ?? [],
  };

  if (!data) return resolved;

  const heading = data.heading;

  if (heading?.label) {
    resolved.badge = heading.label;
  }

  // Note: StrapiRichTextBlock[] title needs to be handled if we want plain text for title
  // But SectionHeader might take Blocks if updated. 
  // For now let's assume we need plain text for title in SectionHeader
  const extractPlainText = (blocks?: StrapiRichTextBlock[]): string => {
    if (!Array.isArray(blocks)) return "";
    return blocks
      .reduce<string[]>((parts, block) => {
        for (const c of block.children || []) {
          if (c.type === "text") {
            parts.push((c as StrapiTextNode).text);
            continue;
          }
          if (c.type === "link") {
            parts.push(
              (c as StrapiLinkNode).children?.map((cc) => cc.text).join("") ?? "",
            );
            continue;
          }
          parts.push("");
        }
        return parts;
      }, [])
      .join(" ")
      .trim();
  };

  const fullTitle = extractPlainText(heading?.title);
  if (fullTitle) {
    resolved.title = fullTitle;
  }

  const fullDesc = extractPlainText(heading?.description);
  if (fullDesc) {
    resolved.description = fullDesc;
  }

  if (data.feature_items?.length) {
    resolved.feature_items = data.feature_items.map((item) => ({
      title: item.title,
      description: item.description ?? [],
      iconImage: item.icon,
      link: item.link ? { label: item.link.label, link: item.link.link } : undefined,
    }));
  }

  if (data.circle_items?.length) {
    resolved.circle_items = data.circle_items.map((item) => ({
      title: item.title,
      description: item.description ?? [],
      iconImage: item.icon,
      link: item.link ? { label: item.link.label, link: item.link.link } : undefined,
    }));
  }

  return resolved;
}
