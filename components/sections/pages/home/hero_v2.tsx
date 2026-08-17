

import Link from "next/link";
import { HiOutlineSparkles } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { SectionBadge } from "@/components/ui/section-badge";

import type {
  StrapiHeroBlock,
  StrapiButton,
  StrapiRichTextBlock,
  StrapiHomePageSection,
} from "@/types/home";
import { HighlightedText } from "@/components/ui/highlighted-text";




// ─── Validation guards ────────────────────────────────────────────────────────

function hasRichText(
  blocks: StrapiRichTextBlock[] | null | undefined,
): blocks is StrapiRichTextBlock[] {
  if (!Array.isArray(blocks) || blocks.length === 0) return false;
  return blocks.some(
    (block) =>
      Array.isArray(block.children) &&
      block.children.some(
        (child) => "text" in child && child.text.trim() !== "",
      ),
  );
}

function hasButton(btn: StrapiButton | null | undefined): btn is StrapiButton {
  if (btn == null) return false;
  const label = typeof btn.label === "string" && btn.label.trim() !== "";
  const href =
    (typeof btn.link === "string" && btn.link.trim() !== "") ||
    (typeof btn.url === "string" && btn.url.trim() !== "");
  return label && href;
}

function hasText(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim() !== "";
}

// ─── Text extractors ──────────────────────────────────────────────────────────

/**
 * Extracts a flat plain-text string from a Strapi Blocks array.
 * Joins all text nodes with a space between blocks.
 */
function extractPlainText(blocks: StrapiRichTextBlock[]): string {
  return blocks
    .map((block) =>
      block.children
        .map((child) => ("text" in child ? child.text : ""))
        .join(""),
    )
    .join("\n")
    .replace(/\n\s*\|\s*/g, "\n")
    .trim();
}

// ─── Component ────────────────────────────────────────────────────────────────

interface HeroProps {
  data: StrapiHeroBlock;
  allSections?: StrapiHomePageSection[];
}

const EMPTY_SECTIONS: StrapiHomePageSection[] = [];

export default function HeroV2({ data, allSections = EMPTY_SECTIONS }: HeroProps) {


  // Derive display flags — each field only renders when the backend provides a real value

  const showLabel = hasText(data?.label);
  const showTitle = hasRichText(data?.title);
  const showDescription = hasRichText(data?.description);
  const showPrimary = hasButton(data?.primaryButton);
  const showSecondary = hasButton(data?.secondaryButton);
  const showButtons = showPrimary || showSecondary;

  // Extract flat text for title and description (used inside original h1/p elements)
  const titleText = showTitle ? extractPlainText(data.title) : "";
  const descriptionText = showDescription
    ? extractPlainText(data.description)
    : "";



  return (
    <section className="border-b-2 border-dashed border-gray-200  py-24 md:py-24 lg:py-30 ">
      {/* ── Premium Aurora & Dot Mesh Background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
      </div>

      {/* ── Content ── */}
      <div className="mx-auto px-4 sm:px-6 text-center">
        {/* ── Badge ── only when Strapi provides a label */}
        {showLabel && (
          <div className="mb-8 flex justify-center">
            <SectionBadge
              icon={HiOutlineSparkles}
              label={data.label}
              className="text-primary/55 group-hover/trigger:text-primary/80 transition-colors"
            />
          </div>
        )}

        {/* ── Heading ── original h1 styling, {{text}} gets gradient highlight */}
        {showTitle && (
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-primary max-w-7xl mx-auto whitespace-pre-line leading-[1.2] tracking-tight"
            aria-label={titleText.replace(/\{\{(.*?)\}\}/g, "$1").replace(/\n/g, " ")}
          >
            <HighlightedText text={titleText} highlightClassName="text-highlight-color" />
          </h1>
        )}

        {/* ── Subtitle ── original p styling */}
        {showDescription && (
          <p className="mx-auto mt-6 max-w-4xl sm:text-base leading-relaxed light-grey whitespace-pre-line">
            {descriptionText}
          </p>
        )}

        {/* ── CTA Buttons ── only when at least one exists */}
        {showButtons && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mx-auto">
            {showPrimary && (
              <Link
                href={
                  data.primaryButton!.link || data.primaryButton!.url || "#"
                }
                target={data.primaryButton!.openInNewTab ? "_blank" : undefined}
                rel={
                  data.primaryButton!.openInNewTab
                    ? "noopener noreferrer"
                    : undefined
                }
                className="w-full sm:w-auto inline-flex"
              >
                <Button className="w-full bg-[#0A0A0A]! hover:bg-[#0A0A0A]/90 text-white rounded-md h-10 px-5 font-semibold text-[13px] shadow-sm flex items-center justify-center transition-all duration-200 cursor-pointer">
                  {data.primaryButton!.label}
                </Button>
              </Link>
            )}

            {showSecondary && (
              <Link
                href={
                  data.secondaryButton!.link || data.secondaryButton!.url || "#"
                }
                target={
                  data.secondaryButton!.openInNewTab ? "_blank" : undefined
                }
                rel={
                  data.secondaryButton!.openInNewTab
                    ? "noopener noreferrer"
                    : undefined
                }
                className="w-full sm:w-auto inline-flex items-center justify-center h-10 px-5 rounded-md border border-neutral-200 bg-white text-neutral-700 font-semibold text-[13px] shadow-sm shadow-black/5 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span>{data.secondaryButton!.label}</span>
              </Link>
            )}
          </div>
        )}

      </div>
    </section>


  );
}
