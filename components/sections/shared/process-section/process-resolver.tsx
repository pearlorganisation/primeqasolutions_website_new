import { ProcessSectionV1 } from "./process-section-v1";
import { ProcessSectionV2 } from "./process-section-v2";
import type { ProcessSectionProps } from "./types";

const variantMap = {
  v1: ProcessSectionV1,
  v2: ProcessSectionV2,
} as const;

export type ProcessVariant = keyof typeof variantMap;

const DEFAULT_VARIANT: ProcessVariant = "v1";

export function ProcessResolver({
  variant,
  data,
  ...rest
}: ProcessSectionProps) {
   
  const resolvedVariant: ProcessVariant = variant ?? (data as any)?.variant ?? DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];

  return <Component data={data} {...rest} />;
}
