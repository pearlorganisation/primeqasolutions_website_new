import { TrustBuildingV1 } from "./trust-building-v1";
import type { TrustBuildingProps, TrustBuildingVariant } from "./types";

const variantMap = {
  v1: TrustBuildingV1,
} as const;

const DEFAULT_VARIANT: TrustBuildingVariant = "v1";

interface TrustBuildingResolverProps extends TrustBuildingProps {
  variant?: TrustBuildingVariant;
}

export function TrustBuildingResolver({
  variant,
  data,
  ...rest
}: TrustBuildingResolverProps) {
  // Use variant from data or prop, fallback to default
  const resolvedVariant: TrustBuildingVariant = 
    variant ?? (data?.variant as TrustBuildingVariant) ?? DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];
  
  return <Component data={data} {...rest} />;
}
