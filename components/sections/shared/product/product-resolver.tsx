 
import React from "react";
import { ProductsV1 } from "./product-v1";
import { ProductsV2 } from "./product-v2";
import { ProductsV3 } from "./product-v3";
import type { ProductSectionProps, ProductSectionVariant } from "./types";

const variantMap = {
  v1: ProductsV1,
  v2: ProductsV2,
  v3: ProductsV3,
} as const;

const DEFAULT_VARIANT: ProductSectionVariant = "v1";

interface ProductResolverProps extends ProductSectionProps {
  variant?: ProductSectionVariant;
}

export function ProductResolver({
  variant,
  data,
  ...rest
}: ProductResolverProps) {
   
  // Next.js caches fetch requests, so if 'variant' is missing because it wasn't saved in Strapi
  // or the cache hasn't cleared, we can fallback to heading.variant as a temporary workaround.
  const resolvedVariant: ProductSectionVariant =
    variant ??
    (data as any)?.variant ??
    (data as any)?.heading?.variant ??
    DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];

  return <Component data={data} {...rest} />;
}
