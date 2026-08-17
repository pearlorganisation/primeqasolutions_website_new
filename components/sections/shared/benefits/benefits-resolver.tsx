
import { BenefitsV1 } from "./benefits-v1";
import type { BenefitsProps, BenefitsVariant } from "./types";

const variantMap = {
  v1: BenefitsV1,
} as const;

const DEFAULT_VARIANT: BenefitsVariant = "v1";

interface BenefitsResolverProps extends BenefitsProps {
  variant?: BenefitsVariant;
}

export function BenefitsResolver({
  variant,
  data,
  ...rest
}: BenefitsResolverProps) {
  const resolvedVariant =
    variant ??
    (data?.variant as BenefitsVariant) ??
    (data?.heading?.variant as BenefitsVariant) ??
    DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];

  return <Component data={data} {...rest} />;
}
