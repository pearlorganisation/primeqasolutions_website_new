 
import { StrapiCtaBlock } from "@/types/home";

export interface MiddleCTAResolverProps {
  data: StrapiCtaBlock;
}

export function resolveCtaProps(data: StrapiCtaBlock) {
  if (!data) return {};

  const heading = data.heading;

  // Helper to extract text from Strapi Rich Text
  const extractText = (blocks: any[]) => {
    if (!blocks || !Array.isArray(blocks)) return "";
    return blocks
      .map(
        (block) =>
          block.children?.map((child: any) => child.text).join("") || "",
      )
      .join("\n");
  };

  return {
    badge: heading?.label,
    title: extractText(heading?.title),
    description: extractText(heading?.description),
    stats: data.stats,
    form: data.form,
  };
}
