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
import { Sparkles } from "lucide-react";
import { IconList } from "@/components/sections/shared/icon-list";

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

// ─── Inner icon classes ────────────
const INNER_CLS =
  "flex size-[3.25rem] items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/60 text-primary shadow-[0_8px_16px_-6px_rgba(37,99,235,0.15)] transition-all duration-300 group-hover/orbit:bg-primary group-hover/orbit:text-white group-hover/orbit:border-transparent group-hover/orbit:-translate-y-1 overflow-hidden";
const OUTER_CLS =
  "flex size-[3.25rem] items-center justify-center rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200/50 text-slate-500 shadow-sm transition-all duration-300 group-hover/orbit:border-primary/40 group-hover/orbit:bg-white group-hover/orbit:text-primary group-hover/orbit:shadow-md group-hover/orbit:-translate-y-1 overflow-hidden";

// ─── Orbit icon+label chip ─
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
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className="flex flex-col items-center gap-2.5 cursor-pointer group/orbit"
          onMouseEnter={onHoverStart}
          onMouseLeave={onHoverEnd}
        >
          <div className={variant === "inner" ? INNER_CLS : OUTER_CLS}>
            {iconImage ? (
              <Image
                src={toAbsUrl(iconImage.url)}
                alt={typeof label === "string" ? label : "icon"}
                width={24}
                height={24}
                className="size-6 object-contain"
              />
            ) : Icon ? (
              <Icon className="size-5 grayscale-100" />
            ) : null}
          </div>
          <span className="absolute -bottom-6 text-[0.625rem] font-bold uppercase tracking-[0.15em] text-slate-400 whitespace-nowrap leading-none group-hover/orbit:text-primary transition-colors duration-200 opacity-0 group-hover/orbit:opacity-100 group-hover/orbit:translate-y-1">
            <HighlightedText text={label} />
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[260px] text-center leading-relaxed text-[0.8rem] py-3 px-4 shadow-xl border-slate-100/50 bg-white/95 backdrop-blur-md text-slate-700"
      >
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
});

// ─── Component ────────────────────────────────────────────────────────────────
export function AiAdvantageV4(props: AiAdvantageProps) {
  const { badge, title, description, feature_items, circle_items } =
    resolveAiAdvantageProps(props);

  const [orbitPaused, setOrbitPaused] = useState(false);

  const handleHoverStart = useCallback(() => setOrbitPaused(true), []);
  const handleHoverEnd = useCallback(() => setOrbitPaused(false), []);

  const pauseStyle = useMemo<React.CSSProperties>(
    () => ({ animationPlayState: orbitPaused ? "paused" : "running" }),
    [orbitPaused]
  );

  // Split circle items into inner and outer orbits
  const innerOrbitItems = circle_items.slice(0, 3);
  const outerOrbitItems = circle_items.slice(3);

  return (
    <Section className="bg-[#FAFAFA] relative overflow-hidden">
      {/* Background radial gradient for subtle depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Centered Header */}
        <SectionHeaderResolver 
              variant={props.data?.heading?.variant}  
          align="center"
          badge={badge}
          title={title}
          description={description}
          className="mb-20"
          headingClassName="leading-tight"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 xl:gap-20 items-center mx-auto">
          {/* ── Left: Refined Advantage list ── */}
          <IconList items={feature_items} />

          {/* ── Right: Enhanced Orbiting Circles (Cleanly scaled down on mobile/tablet viewports to prevent overflow) ── */}
          <div className="relative flex items-center justify-center h-[340px] xs:h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full overflow-x-clip">
            {/* Glow */}
            <div className="absolute size-72 rounded-full bg-primary/10 blur-[60px] pointer-events-none" />

            {/* Orbit stage (Responsive scale transform ensures proportional scaling without structural breaks) */}
            <div className="relative flex size-[500px] items-center justify-center scale-[0.55] xs:scale-[0.65] sm:scale-[0.8] md:scale-[0.9] lg:scale-100 transition-transform duration-300 origin-center shrink-0">
              {/* Center — Refined AI Node */}
              <div className="relative z-10 flex size-28 flex-col items-center justify-center rounded-[2rem] bg-linear-to-br from-primary to-blue-700 shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_20px_40px_-10px_rgba(37,99,235,0.5)] text-white rotate-3 hover:rotate-0 transition-transform duration-500">
                <Sparkles className="absolute top-3 right-3 size-4 text-white/60 animate-pulse" />
                <span className="text-[2.5rem] font-black font-space tracking-tighter leading-none mt-1 bg-clip-text text-transparent bg-linear-to-b from-white to-blue-100">
                  AI
                </span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-blue-200 mt-1">
                  Core
                </span>

                {/* Ripples */}
                <div className="absolute inset-0 rounded-[2rem] border border-primary/40 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
                <div className="absolute inset-0 rounded-[2rem] border border-primary/20 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s] pointer-events-none" />
              </div>

              {/* Inner orbit */}
              <OrbitingCircles
                radius={140}
                duration={22}
                iconSize={72}
                className="overflow-visible rounded-none bg-transparent border-dashed border-[1.5px] border-slate-200/70"
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
                radius={240}
                duration={38}
                reverse
                iconSize={72}
                className="overflow-visible rounded-none bg-transparent border-dashed border-[1.5px] border-slate-200/50"
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

