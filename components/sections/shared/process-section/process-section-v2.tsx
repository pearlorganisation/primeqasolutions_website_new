"use client";

"use client";

import React, { useState } from "react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { FaRegClock, FaUsers, FaTasks, FaCheckCircle } from "react-icons/fa";
import type { ProcessSectionProps } from "./types";
import { extractPlainText, toAbsUrl } from "./utils";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import type { StrapiProcessSubBlockItem } from "@/types/service";

type RichTextNode = {
  id?: string | number;
  type?: string;
  text?: string;
  bold?: boolean;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  format?: "ordered" | "unordered";
  url?: string;
  children?: RichTextNode[];
};

function getRichTextKey(node: RichTextNode, fallback: string): string {
  return String(node.id ?? node.url ?? node.text ?? fallback);
}

function renderInlineNode(node: RichTextNode, index: number): React.ReactNode {
  const key = getRichTextKey(node, `inline-${index}`);

  if (node.type === "link") {
    return (
      <a
        key={key}
        href={node.url}
        className="text-primary underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {node.children?.map(renderInlineNode)}
      </a>
    );
  }

  let content: React.ReactNode = node.text ?? node.children?.map(renderInlineNode) ?? "";

  if (node.bold) {
    content = <strong className="font-semibold text-neutral-900">{content}</strong>;
  }

  return <React.Fragment key={key}>{content}</React.Fragment>;
}

function renderRichTextBlock(
  block: RichTextNode,
  index: number,
  variant: "body" | "detail",
): React.ReactNode {
  const key = getRichTextKey(block, `block-${index}`);
  const children = block.children?.map(renderInlineNode) ?? null;
  const textSize = variant === "body" ? "text-base" : "text-sm";

  if (block.type === "heading") {
    return (
      <h6 key={key} className={cn("font-semibold text-neutral-900 leading-snug", textSize)}>
        {children}
      </h6>
    );
  }

  if (block.type === "list") {
    const ListTag = block.format === "ordered" ? "ol" : "ul";
    return (
      <ListTag
        key={key}
        className={cn(
          "leading-relaxed space-y-1 pl-2",
          block.format === "ordered" ? "list-decimal" : "list-disc",
          "list-outside text-neutral-600 marker:text-neutral-400",
          textSize,
        )}
      >
        {block.children?.map((item, itemIndex) => {
          const itemChildren =
            item.type === "list-item" ? item.children : [item];

          return (
            <li key={getRichTextKey(item, `item-${itemIndex}`)} className="pl-1">
              {itemChildren?.map(renderInlineNode)}
            </li>
          );
        })}
      </ListTag>
    );
  }

  if (block.type === "list-item") {
    return <li key={key}>{children}</li>;
  }

  return (
    <p key={key} className={cn("text-neutral-600 leading-relaxed", textSize)}>
      {children}
    </p>
  );
}

function RichTextBlocks({
  blocks,
  variant = "detail",
}: {
  blocks?: unknown;
  variant?: "body" | "detail";
}) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;

  return (
    <div className="space-y-2">
      {blocks.map((block, index) =>
        block && typeof block === "object"
          ? renderRichTextBlock(block as RichTextNode, index, variant)
          : null,
      )}
    </div>
  );
}

function getSubBlockHeading(
  item: StrapiProcessSubBlockItem | undefined,
  fallback: string,
): string {
  return item?.title || fallback;
}

const detailIconStyles = [
  {
    className: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
    Icon: FaTasks,
  },
  {
    className: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400",
    Icon: FaUsers,
  },
  {
    className: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400",
    Icon: FaRegClock,
  },
] as const;

const STEP_COLORS = [
  {
    bg: "bg-blue-50/85 dark:bg-blue-950/20",
    border: "border-blue-200/60 dark:border-blue-800/80",
    text: "text-blue-600 dark:text-blue-400",
    shadow: "shadow-md shadow-blue-500/10",
    hoverBorder: "group-hover:border-blue-300 dark:group-hover:border-blue-700",
  },
  {
    bg: "bg-indigo-50/85 dark:bg-indigo-950/20",
    border: "border-indigo-200/60 dark:border-indigo-800/80",
    text: "text-indigo-600 dark:text-indigo-400",
    shadow: "shadow-md shadow-indigo-500/10",
    hoverBorder: "group-hover:border-indigo-300 dark:group-hover:border-indigo-700",
  },
  {
    bg: "bg-emerald-50/85 dark:bg-emerald-950/20",
    border: "border-emerald-200/60 dark:border-emerald-800/80",
    text: "text-emerald-600 dark:text-emerald-400",
    shadow: "shadow-md shadow-emerald-500/10",
    hoverBorder: "group-hover:border-emerald-300 dark:group-hover:border-emerald-700",
  },
  {
    bg: "bg-orange-50/85 dark:bg-orange-950/20",
    border: "border-orange-200/60 dark:border-orange-800/80",
    text: "text-orange-600 dark:text-orange-400",
    shadow: "shadow-md shadow-orange-500/10",
    hoverBorder: "group-hover:border-orange-300 dark:group-hover:border-orange-700",
  },
  {
    bg: "bg-cyan-50/85 dark:bg-cyan-950/20",
    border: "border-cyan-200/60 dark:border-cyan-800/80",
    text: "text-cyan-600 dark:text-cyan-400",
    shadow: "shadow-md shadow-cyan-500/10",
    hoverBorder: "group-hover:border-cyan-300 dark:group-hover:border-cyan-700",
  },
  {
    bg: "bg-rose-50/85 dark:bg-rose-950/20",
    border: "border-rose-200/60 dark:border-rose-800/80",
    text: "text-rose-600 dark:text-rose-400",
    shadow: "shadow-md shadow-rose-500/10",
    hoverBorder: "group-hover:border-rose-300 dark:group-hover:border-rose-700",
  },
];

export function ProcessSectionV2({
  data,
  className,
}: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  const heading = data?.heading;
  const items = data?.process_items || [];
  const activeItem = items[activeStep];
  const activeSubBlocks = activeItem?.sub_block_items || [];
  const phaseNumber = String(activeItem?.no ?? activeStep + 1).padStart(2, "0");
  const currentActiveColor = STEP_COLORS[activeStep % STEP_COLORS.length];
  
  const label = heading?.label || "";
  const titleText = extractPlainText(heading?.title);
  const description = extractPlainText(heading?.description);

  return (
    <Section className={`py-20 lg:py-28 bg-neutral-50 overflow-hidden ${className || ""}`}>
      <Container>
        {/* Header */}
        <SectionHeaderResolver 
          variant={heading?.variant} 
          align={heading?.align || "center"}
          badge={label}
          title={titleText}
          description={description}
        />

        <div className="relative mx-auto w-full flex flex-col gap-12">
          
          {/* ── Timeline Navigation ── */}
          <div className="relative w-full">
            {/* Steps Container */}
            <div 
              className="flex flex-row flex-nowrap overflow-x-auto gap-4 relative z-10 pb-4 px-4 md:px-0 snap-x scroll-px-4 md:scroll-px-0" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {items.map((step: any, index: number) => {
                const stepTitle = step.title || "";
                const isActive = activeStep === index;
                const activeColor = STEP_COLORS[index % STEP_COLORS.length];
                
                return (
                  <button type="button"
                    key={step.id ?? step.title}
                    onClick={() => setActiveStep(index)}
                    className="relative flex flex-col items-start text-left md:items-center md:text-center shrink-0 w-[180px] snap-center group focus:outline-hidden"
                  >
                    {/* Connector Line to the next step */}
                    {index < items.length - 1 && (
                      <div className="absolute top-5 md:top-6 left-5 md:left-1/2 w-[196px] h-[1.3px] bg-neutral-200 z-0 pointer-events-none" />
                    )}

                    <div className="mb-1 md:mb-4 flex flex-col items-start md:items-center">
                      <div 
                        className={cn(
                          "relative flex hover:cursor-pointer size-10 md:size-12 items-center justify-center rounded-xl border transition-all duration-300 overflow-hidden z-10", 
                           isActive 
                             ? `${activeColor.bg} ${activeColor.border} ${activeColor.text} ${activeColor.shadow}`
                             : `bg-white border-neutral-200 text-neutral-400 ${activeColor.hoverBorder} group-hover:text-neutral-700`
                        )}
                      >

            {step.icon?.url ? (
              <Image
              src={toAbsUrl(step.icon.url)}
              alt={step.icon.alternativeText || stepTitle}
              width={22}
              height={22}
              className="size-5 md:size-[22px] object-contain transition-all duration-300 grayscale"
              />
            ) : (
              <FaCheckCircle className="size-5 md:size-6 transition-all duration-300" />
            )}
            </div>
            </div>

                    {/* Text Content */}
                    <div className="flex flex-col items-start md:items-center w-full px-0 md:px-2 mt-2">
                      <h3 className={cn(
                        "text-[13px] transition-all duration-300 leading-snug text-left md:text-center max-w-[120px] md:max-w-[150px]",
                        isActive ? "text-neutral-900 font-semibold" : "text-neutral-500 group-hover:text-neutral-800"
                      )}>
                        {stepTitle}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Details Pane ── */}
          {activeItem && (
            <div className="bg-white rounded-2xl shadow-xs border border-neutral-200 p-5 sm:p-8 md:p-10 animate-in fade-in zoom-in-95 duration-300 overflow-hidden relative">
              
              {/* Optional background decoration */}
              <div className={cn("absolute top-0 right-0 size-64 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3", currentActiveColor.bg)} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-start">
                
                {/* Left Side: Description */}
                <div className="lg:col-span-7 flex flex-col text-left">
                  <span className={cn("inline-flex items-center text-[12px] font-bold tracking-wider uppercase mb-2", currentActiveColor.text)}>
                    Phase {phaseNumber}
                  </span>
                  
                  <h4 className="text-2xl font-semibold text-neutral-900 mb-2 md:mb-4 leading-tight">
                    {activeItem.title}
                  </h4>
                  
                  <div className="text-base text-neutral-600 leading-relaxed md:mb-8 space-y-4">
                    <RichTextBlocks blocks={activeItem.description} variant="body" />
                  </div>
                </div>

                {/* Right Side: Quick Stats / More Data */}
                <div className="lg:col-span-5 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-neutral-100 pt-8 lg:pt-0 lg:pl-10">
                  {activeSubBlocks.map((subItem, index) => {
                    const icon = detailIconStyles[index % detailIconStyles.length];
                    const Icon = icon.Icon;

                    return (
                      <div key={subItem.id ?? subItem.title ?? subItem.label} className="flex items-start gap-4">
                        <div className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          icon.className,
                        )}>
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-neutral-900 ">
                            {getSubBlockHeading(subItem, `Detail ${index + 1}`)}
                          </h5>
                            {subItem.label && (
                              <span className="text-primary text-sm font-medium mb-1.5"> {subItem.label}</span>
                            )}
                          <RichTextBlocks blocks={subItem.description} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </Container>
    </Section>
  );
}

