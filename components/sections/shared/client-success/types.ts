import type {
  StrapiClientSuccessBlock,
  StrapiRichTextBlock,
  StrapiTextNode,
  StrapiLinkNode,
} from "@/types/home";
import { STRAPI_URL } from "@/http/client";
// ─── Variant Type ─────────────────────────────────────────────────────────────

export type ClientSuccessVariant = "v1" | "v2";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface Testimonial {
  youtubeId?: string;
  videoUrl?: string;
  thumbnail: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
}

export interface ClientSuccessProps {
  /** Raw Strapi block data — when provided, overrides manual props */
  data?: StrapiClientSuccessBlock;
  badge?: string;
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
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

export interface ResolvedClientSuccessProps {
  badge?: string;
  title?: string;
  description?: string;
  testimonials: Testimonial[];
}

export function resolveClientSuccessProps(
  props: ClientSuccessProps,
): ResolvedClientSuccessProps {
  const { data, badge, title, description, testimonials } = props;

  const resolved: ResolvedClientSuccessProps = {
    badge,
    title,
    description,
    testimonials: testimonials ?? [],
  };

  if (!data) return resolved;

  const header = data.header;

  if (header?.label) {
    resolved.badge = header.label;
  }

  const fullTitle = extractPlainText(header?.title);
  if (fullTitle) {
    resolved.title = fullTitle;
  }

  const desc = extractPlainText(header?.description);
  if (desc) {
    resolved.description = desc;
  }

  if (data.testimonials && data.testimonials.length > 0) {
    resolved.testimonials = data.testimonials.map((item) => {
      const client = item.client;

      // Handle designation (e.g., "CEO at Kingdom Advisors")
      const designation = client?.designation || "";
      const [role, company] = designation.includes(" at ")
        ? designation.split(" at ")
        : [designation, ""];

      let youtubeId: string | undefined = undefined;
      const ytLink = item.youtube_video_link;
      if (ytLink) {
        const match = ytLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
        if (match && match[1]) {
          youtubeId = match[1];
        }
      }

      if (!youtubeId) {
        youtubeId = "eqU2RJ5FMyY"; // Fallback requested by user
      }

      return {
        youtubeId,
        videoUrl: undefined,
        thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
        quote: extractPlainText(item.testimonial),
        name: client?.name || "Client",
        role: role.trim(),
        company: company.trim(),
        avatar: client?.photo?.url
          ? toAbsUrl(client.photo.url)
          : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&q=80",
      };
    });
  }

  return resolved;
}
