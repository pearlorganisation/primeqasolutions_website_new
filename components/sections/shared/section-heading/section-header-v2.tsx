import React from "react";
import { cn } from "@/lib/utils/utils";
import { SectionHeaderV2Props } from "./types";
import { parseSectionTitle } from "./utils";
import { renderWithHighlights } from "@/lib/utils/text-utils";

/**
 * A sophisticated Section Header component without a badge, featuring clean typography and elegant accent lines.
 */
export function SectionHeaderV2({

  subHeading,
  title,
  titleHighlight,
  description,
  align = "center",
  isDark = false,
  headingClassName,
  descriptionClassName,
  className,
  ...props
}: SectionHeaderV2Props) {
  const { finalTitle, finalTitleHighlight } = parseSectionTitle(
    title,
    titleHighlight,
  );

  const highlightClass = cn(
    "text-transparent bg-clip-text bg-gradient-to-r",
    isDark
      ? "from-primary-400 to-primary-600"
      : "from-primary to-primary/70",
  );

  return (
    <div
      className={cn(
        "flex flex-col w-full mb-12 lg:mb-16",
        align === "center" && "items-center text-left",
        align === "left" && "items-start text-left",
        align === "right" && "items-end text-right",
        className,
      )}
      {...props}
    >
      {/* Subheading Section (replaces badge) */}
      {subHeading && (
        <div
          className={cn(
            "flex items-center gap-4 mb-3.5",
            align === "center" && "justify-left",
            align === "right" && "justify-end",
            align === "left" && "justify-start",
          )}
        >
          {align !== "left" && <div className="h-px w-8 bg-primary/60" />}
          {typeof subHeading === "string" ? (
            <span
              className={cn(
                "text-sm md:text-sm antialiased font-bold tracking-[0.2em] ",
                isDark ? "text-primary/90" : "text-primary",
              )}
            >
              {subHeading}
            </span>
          ) : (
            subHeading
          )}
          {align !== "right" && <div className="h-px w-8 bg-primary/60" />}
        </div>
      )}

      {/* Title Section */}
      {(finalTitle || finalTitleHighlight) && (
        <h2
          className={cn(
            "text-2xl min-[768px]:text-3xl tracking-tight leading-tight text-foreground",
            isDark ? "text-white" : "text-foreground",
            description ? "mb-5" : "mb-0",
            headingClassName,
          )}
        >
          {typeof finalTitle === "string" 
            ? renderWithHighlights(finalTitle, highlightClass) 
            : finalTitle}
          {finalTitleHighlight && (
            <>
              {" "}
              <span className={highlightClass}>
                {finalTitleHighlight}
              </span>
            </>
          )}
        </h2>
      )}


      {/* Description Section */}
      {description && (
        <p
          className={cn(
            "text-sm sm:text-base leading-relaxed text-pretty max-w-3xl text-neutral-600",
            isDark ? "text-slate-400" : "text-muted-foreground",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
