import type { StrapiCollaborationFrameworkBlock, StrapiRichTextBlock, StrapiTextNode, StrapiLinkNode } from "@/types/home";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface FrameworkItem {
  number: string;
  title: string;
  description: string;
}

export interface FrameworkSectionProps {
  /** Raw Strapi block data — when provided, overrides manual props */
  data?: StrapiCollaborationFrameworkBlock;
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  items?: FrameworkItem[];
  variant?: "v1" | "v2" | "v3";
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

// ─── Strapi → Props Mapper ───────────────────────────────────────────────────

export interface ResolvedFrameworkProps {
  badge?: string;
  title?: string;
  description?: string;
  items: FrameworkItem[];
  variant: "v1" | "v2" | "v3";
}

export function resolveFrameworkProps(
  props: FrameworkSectionProps,
): ResolvedFrameworkProps {
  const { data, badge, title, description, items, variant } = props;

  const resolved: ResolvedFrameworkProps = {
    badge,
    title,
    description,
    items: items ?? [],
    variant: variant ?? data?.variant ?? "v1",
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

  if (data.items?.length) {
    resolved.items = data.items.map((item, index) => ({
      number: (index + 1).toString().padStart(2, "0"),
      title: item.title,
      description: extractPlainText(item.description),
    }));
  }

  return resolved;
}
