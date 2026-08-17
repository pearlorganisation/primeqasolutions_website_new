/* eslint-disable @typescript-eslint/no-empty-object-type */
 
import { GlobalCtaV1 } from "./global-cta-v1";
import type { GlobalCtaProps, GlobalCtaVariant } from "./types";

const variantMap = {
  v1: GlobalCtaV1,
} as const;

const DEFAULT_VARIANT: GlobalCtaVariant = "v1";

interface GlobalCtaResolverProps extends GlobalCtaProps {}

export function GlobalCtaResolver({
  variant,
  data,
  ...rest
}: GlobalCtaResolverProps) {
   
  const resolvedVariant: GlobalCtaVariant =
    variant ?? (data as any)?.variant ?? DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];

  return <Component data={data} {...rest} />;
}
