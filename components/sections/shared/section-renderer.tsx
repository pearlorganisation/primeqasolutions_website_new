/**
 * SectionRenderer (Generic / Reusable)
 * ──────────────────────────────────────
 * Renders a Strapi dynamic-zone array using the provided block registry.
 *
 * Usage:
 *   import { SectionRenderer } from "@/components/sections/shared/section-renderer";
 *   import { blockRegistry } from "@/lib/utils/block-registry";          // home
 *   import { serviceBlockRegistry } from "@/lib/utils/block-registry";   // service
 *
 *   <SectionRenderer sections={sections} registry={blockRegistry} />
 */

 
import type React from "react";

export interface BlockSection {
  __component: string;
  id: number;
  [key: string]: any;
}

export type BlockRegistry = Record<
  string,
  React.ComponentType<{ data: any; allSections?: any[]; pageData?: any }>
>;

interface SectionRendererProps {
  sections: BlockSection[];
  registry: BlockRegistry;
  /** Optional: override the full list of sections provided to adapters (e.g. if rendering a subset) */
  allSections?: BlockSection[];
  /** Optional: pass top-level document data down to sections */
  pageData?: any;
}

export function SectionRenderer({ sections, registry, allSections, pageData }: SectionRendererProps) {
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section, index) => {
        const Component = registry[section.__component];

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `[SectionRenderer] No component registered for "${section.__component}". ` +
                `Add it to lib/utils/block-registry.ts.`,
            );
          }
          return null;
        }

        return (
          <Component
            key={`${section.__component}-${index}`}
            data={section}
            allSections={allSections ?? sections}
            pageData={pageData}
          />
        );
      })}
    </>
  );
}
