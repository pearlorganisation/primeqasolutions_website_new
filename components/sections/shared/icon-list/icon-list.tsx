"use client";

import React from "react";
import Image from "next/image";
import { cn, toAbsUrl } from "@/lib/utils/utils";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { H3, P } from "@/components/ui/typography";
import { FaCheckCircle } from "react-icons/fa";

function extractPlainText(blocks?: any[]): string {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .flatMap((b) => b.children?.map((c: any) => c.text) ?? [])
    .join(" ")
    .trim();
}

export interface IconListItemData {
  title: string;
  description: string | any[];
  iconImage?: {
    url: string;
    alternativeText?: string | null;
  } | null;
  icon?: React.ComponentType<any> | null;
}

export interface IconListProps {
  items: IconListItemData[];
  className?: string;
}

export function IconList({ items, className }: IconListProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      {items.map((item, idx) => {
        const descText =
          typeof item.description === "string"
            ? item.description
            : extractPlainText(item.description);

        return (
          <div
            key={item.title + idx}
            className={cn(
              "group flex flex-row items-start",
              "gap-4 px-5 py-5",
              "rounded-xl",
              "bg-cream",
              "transition-all duration-200 ease-out",
              "hover:brightness-[0.97]",
            )}
          >
            {/* Icon Wrapper */}
            <div className="shrink-0 mt-1">
              {item.iconImage?.url ? (
                <Image
                  src={toAbsUrl(item.iconImage.url)}
                  alt={item.iconImage.alternativeText || item.title}
                  width={24}
                  height={24}
                  className="size-5 object-contain grayscale-100"
                />
              ) : item.icon ? (
                <item.icon className="size-5 text-primary" />
              ) : (
                <FaCheckCircle className="size-5 text-primary/70" />
              )}
            </div>

            {/* Text/Content Group */}
            <div className="flex flex-col gap-1.5 w-full">
              <H3 className="text-primary">
                <HighlightedText text={item.title} />
              </H3>

              <P className="text-sm text-secondary/80">
                <HighlightedText text={descText} />
              </P>
            </div>
          </div>
        );
      })}
    </div>
  );
}