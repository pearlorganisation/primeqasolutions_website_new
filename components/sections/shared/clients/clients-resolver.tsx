import { ClientsV1 } from "./clients-v1";
import type { ClientsProps, ClientsVariant } from "./types";

const variantMap = {
  v1: ClientsV1,
} as const;

const DEFAULT_VARIANT: ClientsVariant = "v1";

interface ClientsResolverProps extends ClientsProps {
  variant?: ClientsVariant;
}

export function ClientsResolver({
  variant,
  data,
  ...rest
}: ClientsResolverProps) {
  // Since Strapi doesn't have a variant yet for clients, we'll default to v1
  const resolvedVariant: ClientsVariant = variant ?? DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];
  return <Component data={data} {...rest} />;
}
