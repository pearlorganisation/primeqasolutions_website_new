import { SectionHero } from "./section-hero";
import { resolveSectionHeroProps } from "./types";
import type { SectionHeroProps } from "./types";

export function SectionHeroResolver(props: SectionHeroProps) {
  const { variant } = resolveSectionHeroProps(props);

  switch (variant) {
    case "v2":
      return <SectionHero {...props} />;
    case "v1":
    default:
      return <SectionHero {...props} />;
  }
}
