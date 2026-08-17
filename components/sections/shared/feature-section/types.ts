import type { IconType } from "react-icons";
import type {
  StrapiWhyChooseBlock,
  StrapiRichTextBlock,
  StrapiMediaImage,
  StrapiTextNode,
  StrapiLinkNode,
} from "@/types/home";
import { STRAPI_URL } from "@/http/client";

// ─── Variant Type ─────────────────────────────────────────────────────────────

export type FeatureSectionVariant =
  | "split_list"
  | "split_grid"
  | "split_icon_top"
  | "centered_grid";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface FeatureItem {
  icon?: IconType;
  iconImage?: StrapiMediaImage;
  title: string;
  description: string;
}

export interface FeatureStat {
  value: string;
  label: string;
}

export interface FeatureSectionProps {
  /** Raw Strapi block data — when provided, overrides manual props */
  data?: StrapiWhyChooseBlock;
  badge?: string;
  title?: string;
  description?: string;
  items?: FeatureItem[];
  stats?: FeatureStat[];
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
//
// Resolves the final display values by merging Strapi `data` with manual props.
// Every variant calls this once at the top — zero duplication.

export interface ResolvedFeatureProps {
  badge?: string;
  title?: string;
  description?: string;
  items: FeatureItem[];
  stats: FeatureStat[];
}


export function resolveFeatureProps(
  props: FeatureSectionProps,
): ResolvedFeatureProps {
  const { data, badge, title, description, items, stats } =
    props;

  const resolved: ResolvedFeatureProps = {
    badge,
    title,
    description,
    items: items ?? [],
    stats: stats ?? [],
  };


  if (!data) return resolved;

  const heading = data.heading;

  if (heading?.label) {
    resolved.badge = heading.label;
  }

  const fullTitle = extractPlainText(heading?.title);
  if (fullTitle) {
    resolved.title = fullTitle;
  }


  const desc = extractPlainText(heading?.description);
  if (desc) {
    resolved.description = desc;
  }

  if (data.stats?.length) {
    resolved.stats = data.stats.map((s) => ({
      value: s.number,
      label: s.label,
    }));
  }

  if (data.items?.length) {
    resolved.items = data.items.map((item) => ({
      title: item.title,
      description: extractPlainText(item.description),
      iconImage: item.icon,
    }));
  }

  return resolved;
}
