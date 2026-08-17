/**
 * OfficeGalleryResolver
 * ──────────────────────
 * Adapts the raw Strapi `block.office-gallery-block` payload into the shape
 * expected by the OfficeGallery component. Registered in the block registry
 * as the handler for BLOCKS.OFFICE_GALLERY_BLOCK.
 */

import { OfficeGallery } from "@/components/sections/pages/about-us/office-gallery";
import { strapiMediaUrl } from "@/http/client";
import type { StrapiOfficeGalleryBlock } from "@/types/about-us";

function extractHeadingText(blocks: any): string {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (Array.isArray(blocks)) {
    return blocks
      .map((block: any) =>
        block.children?.map((c: any) => c.text || "").join("") ?? ""
      )
      .join("\n");
  }
  return "";
}

interface OfficeGalleryResolverProps {
  data: StrapiOfficeGalleryBlock;
}

export function OfficeGalleryResolver({ data }: OfficeGalleryResolverProps) {
  if (!data?.images?.length) return null;

  const badge = data.heading?.label;
  const title = extractHeadingText(data.heading?.title);
  const description = extractHeadingText(data.heading?.description);

  const images = data.images.map((img) => {
    // Generate Tailwind grid span classes based on the Strapi dropdowns
    const colSpanCls = img.colSpan ? `md:col-span-${img.colSpan}` : "md:col-span-1";
    const rowSpanCls = img.rowSpan ? `md:row-span-${img.rowSpan}` : "md:row-span-1";

    return {
      id: img.id,
      src: strapiMediaUrl(img.image?.url) || "",
      alt: img.altText || img.image?.alternativeText || "Gallery Image",
      className: `${colSpanCls} ${rowSpanCls}`,
    };
  });

  return (
    <OfficeGallery
      data={{
        badge,
        title,
        description,
        images,
      }}
    />
  );
}
