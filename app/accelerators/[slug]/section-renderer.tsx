/**
 * Product Page SectionRenderer
 * ─────────────────────────────
 * Thin wrapper around the shared SectionRenderer, pre-bound to the
 * shared block registry since products use the same sections as services.
 */

import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { serviceBlockRegistry } from "@/lib/utils/block-registry";
import type { StrapiProductPageSection } from "@/types/product";

interface ProductSectionRendererProps {
  sections: StrapiProductPageSection[];
}

export function ProductSectionRenderer({ sections }: ProductSectionRendererProps) {
  return <SectionRenderer sections={sections as any} registry={serviceBlockRegistry} />;
}
