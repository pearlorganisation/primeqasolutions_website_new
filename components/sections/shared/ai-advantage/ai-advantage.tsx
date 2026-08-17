"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaCheckCircle } from "react-icons/fa";

import Image from "next/image";
import { HighlightedText } from "@/components/ui/highlighted-text";


import { AiAdvantageProps, resolveAiAdvantageProps, toAbsUrl } from "./types";

import { H3, P } from "@/components/ui/typography";
import { IconList } from "@/components/sections/shared/icon-list";


// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Truncate at 300 chars — done once at module load, not at render time */
function clamp300(s: string) {
  if (!s) return "";
  return s.length > 300 ? s.slice(0, 297) + "…" : s;
}

/** Extract plain text from Strapi rich-text blocks for tooltips */
function extractPlainText(blocks?: any[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .flatMap((b) => b.children?.map((c: any) => c.text) ?? [])
    .join(" ")
    .trim();
}

// ─── Inner icon classes (stable strings, not recomputed per render) ────────────
const INNER_CLS =
  "flex size-12 items-center justify-center rounded-full bg-white border border-primary/25 text-primary shadow-[0_4px_14px_rgba(37,99,235,0.14)] transition-all duration-200 group-hover/orbit:scale-110 overflow-hidden";
const OUTER_CLS =
  "flex size-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 shadow-sm transition-all duration-200 group-hover/orbit:border-primary/30 group-hover/orbit:text-primary group-hover/orbit:scale-110 overflow-hidden";

// ─── Orbit icon+label chip — memo prevents re-render when parent state changes ─
interface OrbitItemProps {
  icon?: React.ElementType;
  iconImage?: any;
  label: string;
  href: string;
  tooltip: string;
  variant?: "inner" | "outer";
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const OrbitItem = memo(function OrbitItem({
  icon: Icon,
  iconImage,
  label,
  href,
  tooltip,
  variant = "inner",
  onHoverStart,
  onHoverEnd,
}: OrbitItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="flex flex-col items-center gap-2 cursor-pointer group/orbit"
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          <div className={variant === "inner" ? INNER_CLS : OUTER_CLS}>
            {iconImage ? (
              <Image
                src={toAbsUrl(iconImage.url)}
                alt={typeof label === "string" ? label : "icon"}
                width={20}
                height={20}
                className="size-5 object-contain grayscale-100"
              />
            ) : Icon ? (
              <Icon className="size-4.5 grayscale-100" />
            ) : null}
          </div>
          <span className="text-[0.625rem]  font-bold text-center tracking-[0.12em] text-foreground/50  leading-none group-hover/orbit:text-primary transition-colors duration-200">
            <HighlightedText text={label} />
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[280px] text-center leading-relaxed text-[0.75rem] py-2.5 px-3.5"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
});

// ─── Component ────────────────────────────────────────────────────────────────
export function AiAdvantage(props: AiAdvantageProps) {
  const { badge, title, description, feature_items, circle_items } =
    resolveAiAdvantageProps(props);

  const [orbitPaused, setOrbitPaused] = useState(false);

  // Stable callbacks — don't recreate on every render
  const handleHoverStart = useCallback(() => setOrbitPaused(true), []);
  const handleHoverEnd = useCallback(() => setOrbitPaused(false), []);

  // Only a new object when orbitPaused actually changes
  const pauseStyle = useMemo<React.CSSProperties>(
    () => ({ animationPlayState: orbitPaused ? "paused" : "running" }),
    [orbitPaused],
  );

  // Split circle items into inner and outer orbits
  const innerOrbitItems = circle_items.slice(0, 3);
  const outerOrbitItems = circle_items.slice(3);

  return (
    <Section className="bg-white text-white">
      <Container>
        {/* Centered Header */}
        <SectionHeaderResolver 
              variant={props.data?.heading?.variant}  
          align="center"
          badge={badge}
          title={title}
          description={description}
          // headingClassName="leading-tight"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start w-full">
          {/* ── Left: Advantage list ── */}
          <div className="w-full order-2 lg:order-1">
            <IconList items={feature_items} />
          </div>

          {/* ── Right: Orbiting Circles (Cleanly scaled down on mobile/tablet viewports to prevent overflow) ── */}
          <div className="w-full relative flex items-center justify-center lg:justify-end pr-0 lg:pr-20 h-[300px] xs:h-[380px] sm:h-[420px] md:h-[460px] lg:h-[500px] lg:sticky lg:top-32 overflow-x-clip order-1 lg:order-2">
            {/* Glow — pointer-events-none, no layout impact */}
            <div className="absolute size-60 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            {/* Orbit stage (Responsive scale transform ensures proportional scaling without structural breaks) */}
            <div className="relative flex size-[460px] items-center justify-center scale-[0.7] sm:scale-[0.85] md:scale-[0.95] lg:scale-100 transition-transform duration-300 origin-center shrink-0">
              {/* Center — AI Node */}
              <div className="relative z-10 flex size-24 items-center justify-center">
                {/* Outer Shadow Ring 2 (decreased offset from 26px to 16px, pulsing) */}
                <div className="absolute inset-[-16px] rounded-full bg-black/5 dark:bg-white/5 animate-pulse [animation-duration:3s] [animation-delay:0.5s] pointer-events-none" />

                {/* Inner Shadow Ring 1 (decreased offset from 12px to 8px, pulsing) */}
                <div className="absolute inset-[-8px] rounded-full bg-black/10 dark:bg-white/10 animate-pulse [animation-duration:2.5s] pointer-events-none" />

                {/* Main black circle */}
                <div className="relative z-20 flex size-full flex-col items-center justify-center rounded-full bg-black text-white">
                  <span className="text-4xl font-extrabold font-space tracking-tight leading-none">
                    AI
                  </span>
                </div>

                {/* Expanding ripples */}
                <div className="absolute inset-0 rounded-full border border-primary/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
                <div className="absolute inset-0 rounded-full border border-primary/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1.5s] pointer-events-none" />
              </div>

              {/* Inner orbit */}
              <OrbitingCircles
                radius={130}
                duration={18}
                iconSize={72}
                dotted
                className="overflow-visible rounded-none bg-transparent border-none shadow-none"
                style={pauseStyle}
              >
                {innerOrbitItems.map((item, idx) => (
                  <OrbitItem
                    key={item.title + idx}
                    iconImage={item.iconImage}
                    label={item.title}
                    href={item.link?.link ?? "/services"}
                    tooltip={clamp300(extractPlainText(item.description))}
                    variant="inner"
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                  />
                ))}
              </OrbitingCircles>

              {/* Outer orbit */}
              <OrbitingCircles
                radius={220}
                duration={30}
                reverse
                iconSize={72}
                dotted
                className="overflow-visible rounded-none bg-transparent border-none shadow-none"
                style={pauseStyle}
              >
                {outerOrbitItems.map((item, idx) => (
                  <OrbitItem
                    key={item.title + idx}
                    iconImage={item.iconImage}
                    label={item.title}
                    href={item.link?.link ?? "/services"}
                    tooltip={clamp300(extractPlainText(item.description))}
                    variant="outer"
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                  />
                ))}
              </OrbitingCircles>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
