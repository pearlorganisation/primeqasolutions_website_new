import { StrapiHeroBlock, StrapiRichText, HeroData, StrapiTextNode, StrapiLinkNode } from "@/types/home";

/**
 * Helper to flatten Strapi's nested RichText blocks into a simple string.
 */
const flattenRichText = (textBlocks: StrapiRichText[]): string => {
  if (!textBlocks || !Array.isArray(textBlocks)) return "";

  return textBlocks
    .reduce<string[]>((parts, block) => {
      for (const child of block.children || []) {
        if (child.type === "text") {
          parts.push((child as StrapiTextNode).text);
          continue;
        }
        if (child.type === "link") {
          parts.push(
            (child as StrapiLinkNode).children?.map((cc) => cc.text).join("") ?? "",
          );
          continue;
        }
        parts.push("");
      }
      return parts;
    }, [])
    .join("");
};

/**
 * Normalizes a raw Strapi Hero block into a clean UI-ready HeroData object.
 */
export const normalizeHero = (block: StrapiHeroBlock): HeroData => {
  return {
    label: block.label || "",
    title: flattenRichText(block.title),
    description: flattenRichText(block.description),
    quote: block.quote || "",
  };
};
