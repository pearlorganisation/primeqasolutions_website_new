import { TechStackV1 } from "./tech-stack-v1";
import { TechStackV2 } from "./tech-stack-v2";
import { resolveTechStackProps } from "./types";
import type { TechStackProps } from "./types";

export function TechStackResolver(props: TechStackProps) {
  const { variant } = resolveTechStackProps(props);

  switch (variant) {
    case "v1":
      return <TechStackV1 {...props} />;
    default:
      return <TechStackV1 {...props} />;
  }
}
