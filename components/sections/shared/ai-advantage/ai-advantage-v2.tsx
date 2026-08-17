"use client";

import React from "react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import {
  Bell,
} from "lucide-react";
import { FaSlack } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

import Image from "next/image";
import { HighlightedText } from "@/components/ui/highlighted-text";


import { AiAdvantageProps, resolveAiAdvantageProps, toAbsUrl } from "./types";
import { H3, P } from "@/components/ui/typography";

/** Extract plain text from Strapi rich-text blocks */
function extractPlainText(blocks?: any[]): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .flatMap((b) => b.children?.map((c: any) => c.text) ?? [])
    .join(" ")
    .trim();
}

function FeatureCard({
  icon: Icon,
  iconImage,
  title,
  description,
}: {
  icon?: React.ElementType;
  iconImage?: any;
  title: string;
  description: any;
}) {
  return (
    <div className="bg-[#F9FAFB] rounded-xl p-6 border border-slate-100/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] transition-all duration-300">
      <div className="mb-4">
        {iconImage ? (
          <Image
            src={toAbsUrl(iconImage.url)}
            alt={title}
            width={28}
            height={28}
            className="size-7 object-contain"
          />
        ) : Icon ? (
          <Icon className="size-7 text-primary grayscale-100" strokeWidth={2} />
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <H3>
          <HighlightedText text={title} />
        </H3>
        <P>
          <HighlightedText text={extractPlainText(description)} />
        </P>
      </div>
    </div>
  );
}

export function AiAdvantageV2(props: AiAdvantageProps) {
  const { badge, title, description, feature_items } =
    resolveAiAdvantageProps(props);

  const leftItems = feature_items.slice(0, 3);
  const rightItems = feature_items.slice(3, 6);

  return (
    <Section className="bg-slate-50/30">
      <Container>
        <SectionHeaderResolver 
              variant={props.data?.heading?.variant}  
          badge={badge}
          align="center"
          title={title}
          description={description}
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]  gap-8  mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {leftItems.map((item, idx) => (
              <FeatureCard
                key={item.title + idx}
                iconImage={item.iconImage}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>

          {/* Middle Column */}
          <div className="flex relative flex-col row-span-1  rounded-xl bg-[#F9FAFB] overflow-hidden  gap-10 w-full lg:w-[450px]">
            <div className="absolute inset-0 bg-[radial-gradient(var(--color-neutral-200)_1px,transparent_1px)] mask-radial-from-10% bg-size-[10px_10px] shadow-xl"></div>
            {/* Diagram Area */}
            <div className="flex flex-col items-center relative w-full pt-10">
              {/* Nodes and Lines */}
              <div className="flex  items-center justify-between w-full max-w-[300px] relative">
                {/* Horizontal Dashed Line (Background) */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-px border-t border-dashed border-slate-300 -" />

                {/* Vertical Dashed Line down to Connected badge */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 h-24 w-px border-l border-dashed border-slate-300 " />

                {/* Left Node */}
                <div className="size-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center z-10">
                  <SiOpenai className="size-5 text-slate-700" />
                </div>

                {/* Center Node */}
                <div className="size-16 bg-white rounded-2xl shadow-md border border-slate-200 flex items-center justify-center z-10">
                  <div className="flex flex-col gap-1 items-center">
                    <div className="flex gap-1">
                      <div className="size-2.5 bg-gray-950 rounded-sm" />
                      <div className="size-2.5 bg-transparent" />
                    </div>
                    <div className="flex gap-1">
                      <div className="size-2.5 bg-transparent" />
                      <div className="size-2.5 bg-gray-950 rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Right Node */}
                <div className="size-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center z-10">
                  <FaSlack className="size-5 text-[#E01E5A]" />
                </div>
              </div>

              {/* Connected Badge */}
              <div className="mt-14 px-4 py-1 bg-white text-primary border border-primary/20 rounded-full text-[0.7rem] font-semibold tracking-wide shadow-sm z-10">
                Connected
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="w-full  bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden relative -right-16 -bottom-24 z-10">
              {/* Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100/60 bg-white">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-400" />
                  <div className="size-2.5 rounded-full bg-amber-400" />
                  <div className="size-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md text-[0.65rem] text-slate-500 font-medium shadow-sm">
                  <Bell className="size-3" />
                  <span>System Active</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-slate-800 mb-6">
                  Dashboard
                </h4>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[0.7rem] text-slate-400 font-medium">
                      <span>API Calls</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/20 w-[85%] rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[0.7rem] text-slate-400 font-medium">
                      <span>Success Rate</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/40 w-[95%] rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[0.7rem] text-slate-400 font-medium">
                      <span>Workflows</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary/60 w-[60%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {rightItems.map((item, idx) => (
              <FeatureCard
                key={item.title + idx}
                iconImage={item.iconImage}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

