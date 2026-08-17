import { ServicesV1 } from "./services-v1";
import { ServicesV2 } from "./services-v2";
import { ServicesV3 } from "./services-v3";
import type { ServicesProps } from "./types";

const variantMap = {
  minimal_grid: ServicesV1,
  minimal_grid_arrow_card: ServicesV2,
  editorial_grid: ServicesV3,
} as const;

export type ServicesVariant = keyof typeof variantMap;

const DEFAULT_VARIANT: ServicesVariant = "minimal_grid";

export function ServicesResolver({
  variant,
  data,
  ...rest
}: ServicesProps) {

  const resolvedVariant: ServicesVariant = variant ?? (data as any)?.variant ?? DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];

  return <Component data={data} {...rest} />;
}
