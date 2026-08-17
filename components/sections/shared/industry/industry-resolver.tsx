import { IndustryV1 } from "./industry-v1";
import type { IndustryProps, IndustryVariant } from "./types";

const variantMap = {
  v1: IndustryV1,
} as const;

const DEFAULT_VARIANT: IndustryVariant = "v1";

interface IndustryResolverProps extends IndustryProps {
  variant?: IndustryVariant;
}

export function IndustryResolver({
  variant,
  data,
  ...rest
}: IndustryResolverProps) {
  const resolvedVariant: IndustryVariant = variant ?? DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];
  return <Component data={data} {...rest} />;
}
