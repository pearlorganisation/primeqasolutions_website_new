import { PricingV1 } from "./pricing-v1";
import type { PricingProps } from "./types";

const variantMap = {
  v1: PricingV1,
} as const;

export type PricingVariant = keyof typeof variantMap;

const DEFAULT_VARIANT: PricingVariant = "v1";

export function PricingResolver({
  variant,
  data,
  ...rest
}: PricingProps) {
   
  const resolvedVariant: PricingVariant = variant ?? (data as any)?.variant ?? DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];

  return <Component data={data} {...rest} />;
}
