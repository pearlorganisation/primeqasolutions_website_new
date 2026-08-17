/**
 * Dynamic Page SectionRenderer
 */

import { SectionRenderer as SharedSectionRenderer } from "@/components/sections/shared/section-renderer";
import { blockRegistry } from "@/lib/utils/block-registry";
import type { StrapiHomePageSection } from "@/types/home";

interface SectionRendererProps {
  sections: StrapiHomePageSection[];
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return <SharedSectionRenderer sections={sections} registry={blockRegistry} />;
}
