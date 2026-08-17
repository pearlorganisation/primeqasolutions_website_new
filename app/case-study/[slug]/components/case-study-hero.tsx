"use client";

import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaChevronRight,
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaLink,
} from "react-icons/fa";
import { Container, Section } from "@/components/ui/container";
import type {
  CaseStudyHeroBlock,
  CaseStudyInfoBlock,
} from "@/types/case-study";
import { Button } from "@/components/ui/button";

// ─── Props ────────────────────────────────────────────────────────────────────

interface CaseStudyHeroProps {
  /** The hero dynamic-zone block data */
  data: CaseStudyHeroBlock;
  /** Info block for the at-a-glance strip (industry, testing type, published) */
  infoBlock?: CaseStudyInfoBlock | null;
}

// ─── Component ────────────────────────────────────────────────────────────────

type RichTextChild = {
  text?: string;
};

type RichTextBlock = {
  text?: string;
  children?: RichTextChild[];
};

export function CaseStudyHero({ data, infoBlock }: CaseStudyHeroProps) {
  const heading = data.heading ?? "";
  const primaryButton = data.primaryButton;

  // Extract plain text from Strapi Blocks (rich text) description
  const descriptionText = extractPlainText(data.description);

  return (
    <Section className="bg-white" spacing="sm">
      <Container>
        {/* ── Breadcrumbs ── */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-neutral-500">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <FaChevronRight className="size-2.5 text-neutral-300 shrink-0" />
            </li>
            <li>
              <Link
                href="/case-study"
                className="hover:text-primary transition-colors"
              >
                Case Study
              </Link>
            </li>
            <li>
              <FaChevronRight className="size-2.5 text-neutral-300 shrink-0" />
            </li>
            <li className="text-neutral-700 truncate max-w-[200px] sm:max-w-[380px] inline-block align-bottom">
              {heading}
            </li>
          </ol>
        </nav>
        <div className="title-sec mb-4 md:mb-8">
          {/* ── Title ── */}
          
          <h1 className="text-3xl md:text-4xl lg:text-[40px] font-medium text-neutral-900 leading-tight tracking-tight font-space max-w-5xl mb-3.5">
            {heading}
          </h1>

          {/* ── Excerpt ── */}
          <p className="text-lg  text-neutral-600  leading-relaxed max-w-3xl mb-6">
            {descriptionText}
          </p>

          {/* ── Primary CTA button ── */}
          <div className="flex flex-wrap items-center gap-4">
            {primaryButton?.link && (
              <Link
                href={primaryButton.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#0A0A0A]! hover:bg-[#0A0A0A]/90 text-white rounded-md h-10 px-5 font-semibold text-sm group shadow-sm flex items-center justify-center transition-all duration-200">
                  {primaryButton.label || "View Related Service"}
                </Button>
              </Link>
            )}
            {/* <Button className="border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-900 rounded-lg p-6 font-medium text-base shadow-sm">
              Download Case Study
            </Button> */}
          </div>
        </div>
        {/* ── At-a-Glance strip (inline meta) ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-neutral-100">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
            {infoBlock?.Industry && (
              <>
                <AtAGlanceItem label="Industry" value={infoBlock.Industry} />
                <span className="h-8 w-px bg-neutral-100 self-center hidden lg:block" />
              </>
            )}
            {infoBlock?.testing_type && (
              <>
                <AtAGlanceItem
                  label="Testing Type"
                  value={infoBlock.testing_type}
                />
                <span className="h-8 w-px bg-neutral-100 self-center hidden lg:block" />
              </>
            )}

            {((infoBlock?.Headquarters ?? infoBlock?.headquarters) ?? "") && (
              <>
                <AtAGlanceItem
                  label="Headquarters"
                  value={infoBlock?.Headquarters ?? infoBlock?.headquarters ?? ""}
                />
                <span className="h-8 w-px bg-neutral-100 self-center hidden lg:block" />
              </>
            )}

            {infoBlock?.published && (
              <AtAGlanceItem
                label="Published"
                value={new Date(infoBlock.published).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  },
                )}
              />
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[0.7rem] font-bold uppercase tracking-[0.13em] text-neutral-400 mr-1">
              Share:
            </span>
            <SocialButton
              icon={FaLinkedinIn}
              href="#"
              label="Share on LinkedIn"
            />
            <SocialButton icon={FaTwitter} href="#" label="Share on Twitter" />
            <SocialButton
              icon={FaFacebookF}
              href="#"
              label="Share on Facebook"
            />
            <SocialButton icon={FaLink} href="#" label="Copy Link" isCopy />
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Extract plain text from Strapi Blocks JSON (rich text) */
function extractPlainText(blocks: unknown[] | null | undefined): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .flatMap((block) => {
      const richTextBlock = block as RichTextBlock;

      if (Array.isArray(richTextBlock.children)) {
        const text = richTextBlock.children
          .map((child) => child.text ?? "")
          .join("");
        return text ? [text] : [];
      }
      return richTextBlock.text ? [richTextBlock.text] : [];
    })
    .join("\n");
}

function SocialButton({
  icon: Icon,
  href,
  label,
  isCopy,
}: {
  icon: IconType;
  href: string;
  label: string;
  isCopy?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-xl border border-neutral-100 bg-white text-neutral-400 hover:text-primary hover:border-primary/20 hover:shadow-sm transition-all duration-200"
      onClick={(e) => {
        if (isCopy) {
          e.preventDefault();
          navigator.clipboard.writeText(window.location.href);
          // Optional: add toast notification here
        }
      }}
    >
      <Icon className="size-4" />
    </Link>
  );
}

function AtAGlanceItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 min-w-0">
      <span className="text-[0.7rem] font-bold uppercase tracking-[0.13em] text-neutral-500/90">
        {label}
      </span>
      <span className="text-[0.9375rem] font-semibold text-neutral-800 truncate">
        {value}
      </span>
    </div>
  );
}
