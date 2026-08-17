 
"use client";

import React from "react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { BarChart, CheckCircle2, Database, Zap } from "lucide-react";
import { FaSlack, FaGithub } from "react-icons/fa";
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

export function AiAdvantageV3(props: AiAdvantageProps) {
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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 mx-auto">
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
          <div className="flex relative flex-col row-span-1 rounded-xl bg-[#F9FAFB] overflow-hidden gap-10 w-full lg:w-[450px]">
            <div className="absolute inset-0 bg-[radial-gradient(var(--color-neutral-200)_1px,transparent_1px)] mask-radial-from-10% bg-size-[10px_10px] shadow-xl"></div>

            {/* Diagram Area - Variant 3 (Pipeline Process) */}
            <div className="flex flex-col items-center relative w-full pt-10">
              <div className="flex flex-col gap-6 w-full max-w-[280px] relative">
                {/* Vertical Dashed Line (Background) */}
                <div className="absolute left-6 top-6 bottom-6 w-px border-l-2 border-dashed border-slate-200 -z-10" />

                {/* Step 1 */}
                <div className="flex items-center gap-5 z-10 group cursor-default">
                  <div className="size-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-primary/50 group-hover:shadow-md transition-all">
                    <FaGithub className="size-5 text-slate-800" />
                  </div>
                  <div className="flex flex-col bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-100/50 w-full">
                    <span className="text-[0.8rem] font-semibold text-slate-800">
                      Source Code
                    </span>
                    <span className="text-[0.7rem] text-slate-500 font-medium">
                      Commit detected
                    </span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center gap-5 z-10 group cursor-default">
                  <div className="size-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-amber-500/50 group-hover:shadow-md transition-all">
                    <SiOpenai className="size-5 text-slate-700" />
                  </div>
                  <div className="flex flex-col bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-100/50 w-full relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/80" />
                    <span className="text-[0.8rem] font-semibold text-slate-800">
                      AI Analysis
                    </span>
                    <span className="text-[0.7rem] text-slate-500 font-medium">
                      Generating tests…
                    </span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center gap-5 z-10 group cursor-default">
                  <div className="size-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-[#E01E5A]/50 group-hover:shadow-md transition-all">
                    <FaSlack className="size-5 text-[#E01E5A]" />
                  </div>
                  <div className="flex flex-col bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-100/50 w-full">
                    <span className="text-[0.8rem] font-semibold text-slate-800">
                      Alert Team
                    </span>
                    <span className="text-[0.7rem] text-slate-500 font-medium">
                      Results deployed
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-10 px-5 py-1.5 bg-white text-slate-700 border border-slate-200 rounded-full text-[0.75rem] font-semibold tracking-wide shadow-sm z-10 flex items-center gap-2">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                Pipeline Active
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="w-full bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden relative -right-16 -bottom-16 z-10">
              {/* Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100/60 bg-white">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-slate-200" />
                  <div className="size-2.5 rounded-full bg-slate-200" />
                  <div className="size-2.5 rounded-full bg-slate-200" />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-md text-[0.65rem] text-emerald-600 font-semibold shadow-sm">
                  <CheckCircle2 className="size-3" />
                  <span>All Systems Operational</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-slate-800 mb-6">
                  Recent Executions
                </h4>

                <div className="space-y-4">
                  {/* Execution 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <Database className="size-3.5 text-blue-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-semibold text-slate-700">
                          Auth Module
                        </span>
                        <span className="text-[0.65rem] text-slate-400">
                          2 mins ago
                        </span>
                      </div>
                    </div>
                    <span className="text-[0.7rem] font-semibold text-emerald-500">
                      Passed
                    </span>
                  </div>

                  {/* Execution 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-purple-50 flex items-center justify-center">
                        <Zap className="size-3.5 text-purple-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-semibold text-slate-700">
                          Payment Gateway
                        </span>
                        <span className="text-[0.65rem] text-slate-400">
                          15 mins ago
                        </span>
                      </div>
                    </div>
                    <span className="text-[0.7rem] font-semibold text-emerald-500">
                      Passed
                    </span>
                  </div>

                  {/* Execution 3 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-orange-50 flex items-center justify-center">
                        <BarChart className="size-3.5 text-orange-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.75rem] font-semibold text-slate-700">
                          Analytics API
                        </span>
                        <span className="text-[0.65rem] text-slate-400">
                          1 hr ago
                        </span>
                      </div>
                    </div>
                    <span className="text-[0.7rem] font-semibold text-emerald-500">
                      Passed
                    </span>
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
