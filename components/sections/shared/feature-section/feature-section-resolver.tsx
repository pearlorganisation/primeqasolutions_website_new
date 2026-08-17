import { FeatureSectionV1 } from "./feature-section-v1";
import { FeatureSectionV2 } from "./feature-section-v2";
import { FeatureSectionV3 } from "./feature-section-v3";
import { FeatureSectionV4 } from "./feature-section-v4";
import type { FeatureSectionProps, FeatureSectionVariant } from "./types";

// ─── Variant Map ──────────────────────────────────────────────────────────────

const variantMap = {
  split_list:     FeatureSectionV1,
  split_grid:     FeatureSectionV2,
  split_icon_top: FeatureSectionV3,
  centered_grid:  FeatureSectionV4,
} as const;

const DEFAULT_VARIANT: FeatureSectionVariant = "split_list";

// ─── Resolver ─────────────────────────────────────────────────────────────────
//
// Reads `data.variant` from the Strapi payload and renders the matching
// component. Falls back to split_list if the variant is missing or unrecognised.

interface FeatureSectionResolverProps extends FeatureSectionProps {
  variant?: FeatureSectionVariant;
}

export function FeatureSectionResolver({
  variant,
  data,
  ...rest
}: FeatureSectionResolverProps) {
  // Priority: explicit `variant` prop → Strapi `data.variant` → default
  const resolvedVariant: FeatureSectionVariant =
     
    variant ?? (data as any)?.variant ?? DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];

  return <Component data={data} {...rest} />;
}
