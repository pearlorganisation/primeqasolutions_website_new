 
import React from "react";
import { SectionHeader } from "./section-header-v1";
import { SectionHeaderV2 } from "./section-header-v2";
import type { SectionHeaderResolverProps } from "./types";

type SectionHeaderVariant = "v1" | "v2";

const DEFAULT_VARIANT: SectionHeaderVariant = "v1";

function extractText(content: any): string | undefined {
  if (!content) return undefined;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (block?.children && Array.isArray(block.children)) {
          return block.children.map((c: any) => c.text || "").join("");
        }
        return "";
      })
      .join("\n");
  }
  return undefined;
}

export function SectionHeaderResolver({
  variant,
  title,
  titleHighlight,
  description,
  align,
  badge,
  subHeading,
  ...rest
}: SectionHeaderResolverProps & { badge?: React.ReactNode; subHeading?: React.ReactNode }) {
  // If no explicit title is provided, there's nothing to render.
  if (!title) return null;

  // Resolve Variant
  const resolvedVariant = (variant ?? DEFAULT_VARIANT) as SectionHeaderVariant;

  // Resolve Alignment (override > default)
  const resolvedAlign = align ?? "center";

  // Resolve Content
  const resolvedTitle = title;
  const resolvedDescription = description;
  
  // label maps to badge for v1 and subHeading for v2
  const resolvedBadgeOrSubHeading = badge ?? subHeading;

  if (resolvedVariant === "v2") {
    return (
      <SectionHeaderV2
        title={resolvedTitle}
        titleHighlight={titleHighlight}
        description={resolvedDescription}
        align={resolvedAlign}
        subHeading={resolvedBadgeOrSubHeading}
        {...rest}
      />
    );
  }

  return (
    <SectionHeader
      title={resolvedTitle}
      titleHighlight={titleHighlight}
      description={resolvedDescription}
      align={resolvedAlign}
      badge={resolvedBadgeOrSubHeading}
      {...rest}
    />
  );
}
