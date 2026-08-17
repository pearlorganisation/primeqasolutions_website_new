// ─── Types (single source of truth) ──────────────────────────────────────────
export type {
  FeatureSectionProps,
  FeatureItem,
  FeatureStat,
  FeatureSectionVariant,
} from "./types";
export { resolveFeatureProps, extractPlainText, toAbsUrl } from "./types";

// ─── Variants ────────────────────────────────────────────────────────────────
export { FeatureSectionV1 } from "./feature-section-v1";
export { FeatureSectionV2 } from "./feature-section-v2";
export { FeatureSectionV3 } from "./feature-section-v3";
export { FeatureSectionV4 } from "./feature-section-v4";

// ─── Resolver (smart variant picker) ─────────────────────────────────────────
export { FeatureSectionResolver } from "./feature-section-resolver";

// ─── Default export — resolver is the primary entry point ────────────────────
export { FeatureSectionResolver as FeatureSection } from "./feature-section-resolver";
