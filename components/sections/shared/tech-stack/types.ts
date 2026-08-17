import type {
  StrapiTechStackBlock,
  StrapiRichTextBlock,
  StrapiMediaImage,
  StrapiHeadingBlock,
  StrapiTextNode,
  StrapiLinkNode,
} from "@/types/home";
import { STRAPI_URL } from "@/http/client";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface TechStackTool {
  name: string;
  iconImage?: StrapiMediaImage;
}

export interface TechStackCategory {
  id: string;
  category: string;
  tools: TechStackTool[];
}

export interface TechStackProps {
  /** Raw Strapi block data — when provided, overrides manual props */
  data?: StrapiTechStackBlock;
  variant?: "v1" | "v2";
  heading?: StrapiHeadingBlock;
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  categories?: TechStackCategory[];
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Extract plain text from Strapi rich-text blocks */
export function extractPlainText(blocks?: StrapiRichTextBlock[]): string {
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
}

/** Prefix relative Strapi URLs with the base URL */
export function toAbsUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

// ─── Strapi → Props Mapper ───────────────────────────────────────────────────

export interface ResolvedTechStackProps {
  variant?: "v1" | "v2";
  heading?: StrapiHeadingBlock;
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  categories: TechStackCategory[];
}

export function resolveTechStackProps(
  props: TechStackProps,
): ResolvedTechStackProps {
  const { data, variant, badge, title, titleHighlight, description, categories } = props;

  const resolved: ResolvedTechStackProps = {
    variant,
    badge,
    title,
    titleHighlight,
    description,
    categories: categories ?? [],
  };

  if (!data) return resolved;

  if (data.variant) {
    resolved.variant = data.variant;
  }

  if (data.heading) {
    resolved.heading = data.heading;
    if (data.heading.label) {
      resolved.badge = data.heading.label;
    }
    const fullTitle = extractPlainText(data.heading.title);
    if (fullTitle) {
      resolved.title = fullTitle;
    }
    const desc = extractPlainText(data.heading.description);
    if (desc) {
      resolved.description = desc;
    }
  }

  if (data.categories?.length) {
    resolved.categories = data.categories.map((cat) => ({
      id: cat.id.toString(),
      category: cat.name || cat.category || "",
      tools:
        cat.technologies?.map((tool) => ({
          name: tool.name || tool.title || "",
          iconImage: tool.icon,
        })) ?? [],
    }));
  }

  return resolved;
}
