"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { cn } from "@/lib/utils/utils";
import { FrameworkSectionProps, resolveFrameworkProps } from "./types";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { H3 } from "@/components/ui/typography";

/**
 * CollaborationFrameworkV2 - An editorial grid methodology section.
 * Matches the Service Card UI editorial grid design.
 */
export function CollaborationFrameworkV2(props: FrameworkSectionProps) {
  const { badge, title, description, items } = resolveFrameworkProps(props);

  return (
    <Section className={cn("py-24 lg:py-32 bg-white", props.className)}>
      <Container>
        {/* Top Header */}
        <div className="flex flex-col items-center text-center">
          <SectionHeaderResolver 
              variant={props.data?.heading?.variant}  
            align="center"
            badge={badge}
            title={title}
            description={description}
            className="mb-16 md:mb-24"
          />
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.number}
              className="group relative p-8 md:p-10 xl:p-12 bg-transparent border-x border-slate-200 flex flex-col -ml-px transition-all duration-500 hover:bg-slate-50/50 border-t nth-[-n+1]:border-t-0 md:border-t md:nth-[-n+2]:border-t-0 lg:border-t lg:nth-[-n+3]:border-t-0"
            >
              {/* The left highlight mark: ~30% from the top */}
              <div className="absolute left-[-1px] top-[30%] w-[5px] h-8 bg-slate-200 rounded-r-md transition-colors duration-300 group-hover:bg-slate-300 z-10" />

              {/* Step Number (Acting like the icon in Service Cards) */}
              <div className="mb-6">
                <span className="text-4xl font-space font-bold text-neutral-300 transition-colors duration-500 group-hover:text-neutral-400">
                  {item.number}
                </span>
              </div>

              {/* Content */}
              <H3 className="text-xl mb-2 font-semibold">
                <HighlightedText text={item.title} />
              </H3>
              
              <p className="text-neutral-700 text-base leading-relaxed flex-1">
                <HighlightedText text={item.description} />
              </p>

              {/* Decorative bottom accent replacing the link */}
              <div className="mt-8 pt-6 border-t border-slate-100/50 flex items-center justify-between">
                <div className="h-[2px] w-6 bg-slate-200 group-hover:w-12 group-hover:bg-primary/40 transition-all duration-500 ease-out" />
                <span className="text-[11px] font-space font-bold text-slate-300 uppercase tracking-widest group-hover:text-slate-400 transition-colors duration-300">
                  Phase {item.number}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
