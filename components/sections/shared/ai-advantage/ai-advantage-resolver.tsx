import { AiAdvantage } from "./ai-advantage";
import { AiAdvantageV2 } from "./ai-advantage-v2";
import { AiAdvantageV3 } from "./ai-advantage-v3";
import { AiAdvantageV4 } from "./ai-advantage-v4";
import type { AiAdvantageProps, AiAdvantageVariant } from "./types";

const variantMap = {
  v1: AiAdvantage,
  v2: AiAdvantageV2,
  v3: AiAdvantageV3,
  v4: AiAdvantage,
} as const;

const DEFAULT_VARIANT: AiAdvantageVariant = "v1";

interface AiAdvantageResolverProps extends AiAdvantageProps {
  variant?: AiAdvantageVariant;
}

export function AiAdvantageResolver({
  variant,
  data,
  ...rest
}: AiAdvantageResolverProps) {
  // Since Strapi doesn't have a variant yet, we'll default to v1 or allow prop override
  const resolvedVariant: AiAdvantageVariant = variant ?? DEFAULT_VARIANT;

  const Component = variantMap[resolvedVariant] ?? variantMap[DEFAULT_VARIANT];

  return <Component data={data} {...rest} />;
}
