import React from "react";
import { MiddleCTAV1 } from "./middle-cta-v1";
import { MiddleCTAV2 } from "./middle-cta-v2";
import { resolveCtaProps, type MiddleCTAResolverProps } from "./types";

const variantMap = {
  v1: MiddleCTAV1,
  v2: MiddleCTAV1,
} as const;

export function CTAResolver({ data }: MiddleCTAResolverProps) {
  const resolvedProps = resolveCtaProps(data);
  const variant = data?.variant || "v1";
  const Component = variantMap[variant as keyof typeof variantMap] || variantMap.v1;

  return <Component {...resolvedProps} />;
}
