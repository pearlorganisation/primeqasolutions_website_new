 
import type { ClientSuccessProps, ClientSuccessVariant } from "./types";
import { ClientSuccessV1 } from "./client-success-v1";
import { ClientSuccessV2 } from "./client-success-v2";

const variantMap = {
  v1: ClientSuccessV1,
  v2: ClientSuccessV2,
} as const;

const DEFAULT_VARIANT: ClientSuccessVariant = "v1";

interface ClientSuccessResolverProps extends ClientSuccessProps {
  variant?: ClientSuccessVariant;
}

function resolveVariant({
  variant,
  data,
}: ClientSuccessResolverProps): ClientSuccessVariant {
  const candidate =
    variant ?? data?.variant ?? data?.header?.variant ?? DEFAULT_VARIANT;

  return candidate in variantMap ? candidate : DEFAULT_VARIANT;
}

export function ClientSuccessResolver({
  variant,
  data,
  ...rest
}: ClientSuccessResolverProps) {
  const resolvedVariant = resolveVariant({ variant, data, ...rest });
  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];

  return <Component data={data} {...rest} />;
}
