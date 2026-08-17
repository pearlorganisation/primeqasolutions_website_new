"use client";

import React from "react";
import Image from "next/image";
import { cn, toAbsUrl } from "@/lib/utils/utils";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { H3, P } from "@/components/ui/typography";
import { FaCheckCircle } from "react-icons/fa";
import { STRAPI_URL } from "@/http/client";


// Local helper to extract plain text from Strapi rich-text blocks
function extractPlainText(blocks?: any[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .flatMap((b) => b.children?.map((c: any) => c.text) ?? [])
    .join(" ")
    .trim();
}

export interface IconListItemData {
  title: string;
  description: string | any[]; // Accepts both raw string or Strapi rich-text blocks
  iconImage?: {
    url: string;
    alternativeText?: string | null;
  } | null;
  icon?: React.ComponentType<any> | null;
}

export interface IconListProps {
  items: IconListItemData[];
  /** Optional custom class for the parent container */
  className?: string;
}

export function IconList({ items, className }: IconListProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn("flex flex-col divide-y divide-slate-100", className)}>
      {items.map((item, idx) => {
        // Resolve description: handle string vs rich-text block array
        const descText =
          typeof item.description === "string"
            ? item.description
            : extractPlainText(item.description);

        return (
          <div
            key={item.title + idx}
            className="group flex flex-row items-start max-sm:gap-3 gap-3.5 max-sm:py-4 py-6 first:pt-0 last:pb-0"
          >
            {/* Icon Wrapper */}
            <div className="shrink-0 mt-1 md:mt-1.5">
              {item.iconImage?.url ? (
                <Image
                  src={toAbsUrl(item.iconImage.url)}
                  alt={item.iconImage.alternativeText || item.title}
                  width={24}
                  height={24}
                  className="size-5 object-contain grayscale-100"
                />
              ) : item.icon ? (
                <item.icon className="size-5" />
              ) : (
                <FaCheckCircle className="size-5" />
              )}
            </div>

            {/* Text/Content Group */}
            <div className="flex flex-col gap-1 md:gap-1.5 w-full">
              <H3 className="text-black">
                <HighlightedText text={item.title} />
              </H3>
              <P className="text-sm">
                <HighlightedText text={descText} />
              </P>
            </div>
          </div>
        );
      })}
    </div>
  );
}
