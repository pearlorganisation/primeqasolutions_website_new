import type {
  StrapiProductsBlock,
  StrapiRichTextBlock,
  StrapiTextNode,
  StrapiLinkNode,
} from "@/types/home";
import { STRAPI_URL } from "@/http/client";
import { type Product, products as fallbackProducts } from "@/data/products";

// ─── Variant Type ─────────────────────────────────────────────────────────────

export type ProductSectionVariant = "v1" | "v2" | "v3";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface ProductSectionProps {
  /** Raw Strapi block data — when provided, overrides manual props */
  data?: StrapiProductsBlock;
  badge?: string;
  title?: string;
  description?: string;
  products?: Product[];
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

export interface ResolvedProductProps {
  badge?: string;
  title?: string;
  description?: string;
  products: Product[];
}

export function resolveProductProps(
  props: ProductSectionProps,
): ResolvedProductProps {
  const { data, badge, title, description, products } = props;

  const resolved: ResolvedProductProps = {
    badge,
    title,
    description,
    products: products ?? fallbackProducts,
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

  if (data.products && data.products.length > 0) {
    resolved.products = data.products.map((item, index) => {
      const p = item.product as any;
      const tabName = item.custom_label || p?.name || `Product ${index + 1}`;
      return {
        id: p?.documentId || p?.id?.toString() || `prod-${index}`,
        tab: tabName,
        name: p?.name || tabName,
        tagline: "", // Map to a field if available, leaving empty for now
        description: extractPlainText(p?.description),
        features: [], // We can extract features if there's a field for it
        cta: {
          label: item.custom_link?.label || p?.link?.label || "Learn More",
          href: item.custom_link?.link || p?.link?.link || (p?.slug ? `/accelerators/${p.slug}` : "#"),
        },
        image: p?.image?.url ? toAbsUrl(p.image.url) : "/product.png",
        imageAlt: p?.image?.alternativeText || p?.name || "Product image",
      };
    });
  }

  return resolved;
}
