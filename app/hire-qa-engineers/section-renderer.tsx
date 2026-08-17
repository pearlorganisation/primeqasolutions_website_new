/**
 * Hire QA Engineer Page SectionRenderer
 */

import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { hireQaEngineerBlockRegistry } from "@/lib/utils/block-registry";
import type { StrapiHireQaEngineerPageSection } from "@/types/hire-qa-engineer";

interface HireQaEngineerSectionRendererProps {
  sections: StrapiHireQaEngineerPageSection[];
}

export function HireQaEngineerSectionRenderer({
  sections,
}: HireQaEngineerSectionRendererProps) {
  return (
    <SectionRenderer
      sections={sections}
      registry={hireQaEngineerBlockRegistry}
    />
  );
}
