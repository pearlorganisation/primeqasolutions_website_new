import React from "react";
import { cn } from "@/lib/utils/utils";

import { SectionHeaderProps } from "./types";
import { parseSectionTitle } from "./utils";
import { renderWithHighlights } from "@/lib/utils/text-utils";
import { H2 } from "@/components/ui/typography";

/**
 * A unified Section Header component to keep title, badge, and description formatting consistent.
 */
export function SectionHeader({

  badge,
  title,
  titleHighlight,
  description,
  align = "center",
  isDark = false,
  headingClassName,
  descriptionClassName,
  className,
  ...props
}: SectionHeaderProps) {
  const { finalTitle, finalTitleHighlight } = parseSectionTitle(title, titleHighlight);

  return (
    <div
      className={cn(
        "flex flex-col w-full mb-10 lg:mb-12",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        align === "right" && "items-end text-right",
        className
      )}
      {...props}
    >
      {/* Badge Section */}
      {/* {badge && (
        <div className="mb-3">
          {typeof badge === "string" ? (
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-md px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] md:whitespace-nowrap transition-all duration-300 cursor-default border",
                isDark
                  ? "bg-neutral-800 text-slate-300 border-neutral-700/60"
                  : "bg-neutral-100 text-neutral-600 border-neutral-200/80"
              )}
            >
              {badge}
            </span>
          ) : (
            badge
          )}
        </div>
      )} */}

      {badge && (
        <div className="mb-3">
          {typeof badge === "string" ? (
            <span className={isDark ? "subtle-badge-dark" : "subtle-badge"}>
              {badge}
            </span>
          ) : (
            badge
          )}
        </div>
      )}

      {/* Title Section */}
      {(finalTitle || finalTitleHighlight) && (
        <h2
          className={cn(
            "text-2xl min-[768px]:text-3xl lg:text-3xl font-normal tracking-tight leading-tight text-foreground",
            isDark ? "text-white" : "text-foreground",
            description ? "mb-5" : "mb-0",
            headingClassName,
          )}
        >
          {typeof finalTitle === "string"
            ? renderWithHighlights(finalTitle, isDark ? "text-primary-400" : "text-highlight-color")
            : finalTitle}
          {finalTitleHighlight && (
            <>
              {" "}
              <span className="text-primary">{finalTitleHighlight}</span>
            </>
          )}
        </h2>
      )}


      {/* Description Section */}
      {description && (
        <div
          className={cn(
            "text-sm sm:text-base leading-relaxed light-grey max-w-3xl whitespace-pre-line",
            align === "center" && "text-center mx-auto",
            align === "left" && "text-left mr-auto",
            align === "right" && "text-right ml-auto",
            isDark ? "text-secondary-300/80" : "light-secondary",
            descriptionClassName
          )}
        >
          {typeof description === "string"
            ? renderWithHighlights(description, isDark ? "text-primary-400" : "text-primary")
            : description}
        </div>
      )}
    </div>
  );
}