/**
 * TechnicalValidationResolver
 * ────────────────────────────
 * Bridges the `block.case-study-block` Strapi data shape to the
 * TechnicalValidation presentational component (V1/V2).
 *
 * Per case study it:
 *  - reads `name`, `slug`, `description` from the collection-type root
 *  - digs `Industry` out of the `block.case-study-info-block` page_section entry
 *  - digs `stats_items` out of the `block.case-study-state-block` page_section entry
 *    and maps them to CaseStudyMetric objects
 */

import React from "react";
import { CaseStudiesV1 } from "@/components/sections/shared/case-studies/case-studies";
import { CaseStudiesV2 } from "@/components/sections/shared/case-studies/case-studies-v2";
import type { CaseStudy, CaseStudyMetric } from "@/components/sections/shared/case-studies/case-studies";
import type {
  StrapiCaseStudyBlockSection,
  StrapiCaseStudyEntry,
  StrapiRichTextBlock,
} from "@/types/home";
import { BLOCKS } from "@/lib/utils/blocks";
import { parseHighlight } from "@/lib/utils/text-utils";
import { strapiMediaUrl } from "@/http/client";

// ─── Rich-text → plain string ─────────────────────────────────────────────────

function flattenRichText(blocks?: StrapiRichTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  const parts: string[] = [];
  for (const block of blocks) {
    for (const child of block.children ?? []) {
      if (child.type === "text") {
        parts.push(child.text ?? "");
      } else if (child.type === "link") {
        parts.push(child.children?.map((cc) => cc.text).join("") ?? "");
      }
    }
  }
  return parts.join(" ").trim();
}

// ─── Per-case-study helpers ───────────────────────────────────────────────────

function extractIndustry(entry: StrapiCaseStudyEntry): string {
  const infoBlock = entry.page_section.find(
    (b) => b.__component === BLOCKS.CASE_STUDY_INFO
  ) as { Industry?: string } | undefined;
  return infoBlock?.Industry ?? "Industry";
}

function extractMetrics(entry: StrapiCaseStudyEntry): CaseStudyMetric[] {
  const statsBlock = entry.page_section.find(
    (b) => b.__component === BLOCKS.CASE_STUDY_STATS
  ) as {
    stats_items?: Array<{ stats: string; label: string; description: string }>;
  } | undefined;

  return (statsBlock?.stats_items ?? []).slice(0, 4).map((item) => ({
    value: item.stats,
    label: item.label,
  }));
}

function mapEntryToCaseStudy(entry: StrapiCaseStudyEntry): CaseStudy | null {
  const metrics = extractMetrics(entry);
  
  // For V1, metrics are somewhat expected, but we shouldn't necessarily fail if missing.
  // For V2, image is expected, but we shouldn't fail if missing.
  // Let's just return what we have to make it resilient.
  
  const image = entry.image ? strapiMediaUrl(entry.image.url) : undefined;
  const imageAlt = entry.image?.alternativeText || entry.name;

  return {
    industry: extractIndustry(entry),
    company: entry.name,
    title: entry.name,
    description: entry.description,
    metrics: metrics,
    href: `/case-study/${entry.slug}`,
    image,
    imageAlt,
  };
}

// ─── Resolver ─────────────────────────────────────────────────────────────────

interface TechnicalValidationResolverProps {
  data: StrapiCaseStudyBlockSection;
}

export function TechnicalValidationResolver({
  data,
}: TechnicalValidationResolverProps) {
  const variant = data.variant === "v2" ? "v2" : "v1";

  const cases: CaseStudy[] = [];
  for (const caseStudy of data.case_studies ?? []) {
    const mappedCaseStudy = mapEntryToCaseStudy(caseStudy);
    if (mappedCaseStudy) {
      cases.push(mappedCaseStudy);
    }
  }

  if (cases.length === 0) return null;

  // Map heading block → TechnicalValidation string props
  const heading = data.heading;
  const badge = heading?.label;
  const titleText = flattenRichText(
    Array.isArray(heading?.title) ? (heading.title as StrapiRichTextBlock[]) : undefined
  );
  const descriptionText = flattenRichText(
    Array.isArray(heading?.description)
      ? (heading.description as StrapiRichTextBlock[])
      : undefined
  );
  const { title: headingBase, highlight: headingHighlight } =
    parseHighlight(titleText || undefined);

  const props = {
    badge: badge,
    heading: headingBase || undefined,
    headingHighlight: headingHighlight || undefined,
    subtext: descriptionText || undefined,
    cases: cases,
  };

  if (variant === "v2") {
    return <CaseStudiesV2 {...props} />;
  }
  
  return <CaseStudiesV1 {...props} />;
}
