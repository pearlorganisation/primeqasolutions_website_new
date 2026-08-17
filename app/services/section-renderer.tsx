/**
 * Service Page SectionRenderer
 * ─────────────────────────────
 * Thin wrapper around the shared SectionRenderer, pre-bound to the
 * service page block registry.
 *
 * Usage:
 *   <ServiceSectionRenderer sections={sections} />
 */

import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { serviceBlockRegistry } from "@/lib/utils/block-registry";
import type { StrapiServicePageSection } from "@/types/service";

interface ServiceSectionRendererProps {
  sections: StrapiServicePageSection[];
}

export function ServiceSectionRenderer({ sections }: ServiceSectionRendererProps) {
  return <SectionRenderer sections={sections} registry={serviceBlockRegistry} />;
}
