/**
 * Case Study Page SectionRenderer
 * ────────────────────────────────
 * Thin wrapper around the shared SectionRenderer, pre-bound to the
 * case study page block registry.
 *
 * Usage:
 *   <CaseStudySectionRenderer sections={sections} />
 */

import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { caseStudyBlockRegistry } from "@/lib/utils/block-registry";
import type { CaseStudyPageSection } from "@/types/case-study";

interface CaseStudySectionRendererProps {
  sections: CaseStudyPageSection[];
  /** The full array of sections, used to provide context (like info blocks) to components */
  allSections?: CaseStudyPageSection[];
  /** The top-level StrapiCaseStudy document, passed down for relations like industry */
  pageData?: any;
}

export function CaseStudySectionRenderer({
  sections,
  allSections,
  pageData,
}: CaseStudySectionRendererProps) {
  if (!sections?.length) return null;
  return (
    <SectionRenderer
      sections={sections}
      registry={caseStudyBlockRegistry}
      allSections={allSections}
      pageData={pageData}
    />
  );
}
