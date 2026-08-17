import { CaseStudyMarkdownRenderer } from "./case-study-markdown-renderer";
import type { CaseStudyMainContentBlock } from "@/types/case-study";

interface Props {
  /** Passed by SectionRenderer as the raw block data */
  data: CaseStudyMainContentBlock;
}

export function CaseStudyMainContent({ data }: Props) {
  const content = data?.content;
  if (!content) return null;

  return (
    <article className="max-w-none min-w-0 w-full">
      <CaseStudyMarkdownRenderer content={content} />
    </article>
  );
}
