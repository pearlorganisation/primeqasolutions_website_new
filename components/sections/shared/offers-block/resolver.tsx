import { OfferTabs } from "./offer-tabs";
import { resolveOfferTabsProps } from "./types";
import type { OfferTabsProps } from "./types";

export function OfferBlockResolver(props: OfferTabsProps) {
  const { variant } = resolveOfferTabsProps(props);

  switch (variant) {
    case "v2":
      return <OfferTabs {...props} />; // Fallback to v1 for now
    case "v1":
    default:
      return <OfferTabs {...props} />;
  }
}
