/**
 * Industry Page Section Renderer
 * ─────────────────────────────────
 * Thin wrapper around the shared SectionRenderer, pre-bound to the
 * industry page block registry.
 *
 * Usage:
 *   <IndustrySectionRenderer sections={sections} />
 */

import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { industryBlockRegistry } from "@/lib/utils/block-registry";
import type { StrapiIndustryPageSection } from "@/types/industry";

interface IndustrySectionRendererProps {
  sections: StrapiIndustryPageSection[];
}

export function IndustrySectionRenderer({
  sections,
}: IndustrySectionRendererProps) {
    
  return (
    <SectionRenderer sections={sections} registry={industryBlockRegistry} />
  );
}
