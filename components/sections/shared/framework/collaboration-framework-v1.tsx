"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { cn } from "@/lib/utils/utils";
import { m } from "motion/react";
import { FrameworkSectionProps, resolveFrameworkProps } from "./types";
import { HighlightedText } from "@/components/ui/highlighted-text";

/**
 * CollaborationFramework - A premium, light-mode methodology section.
 * Inspired by the "Collaboration Framework" 6-step journey.
 */
export function CollaborationFramework(props: FrameworkSectionProps) {
  const { badge, title, description, items } = resolveFrameworkProps(props);

  return (
    <Section
      className={cn("bg-white overflow-hidden relative", props.className)}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 size-full pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[10%] size-[500px] bg-primary/5 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-[5%] right-[10%] size-[600px] bg-secondary/5 rounded-full blur-3xl opacity-30" />
      </div>

      <Container className="relative z-10">
        <SectionHeaderResolver 
              variant={props.data?.heading?.variant}  
          badge={badge}
          title={title}
          description={description}
          className="mb-16 md:mb-24"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto border-y border-slate-100/80">
          {items.map((item, index) => {
            // Border logic: show on right except for the last item in each row
            const isLastInRowLg = (index + 1) % 3 === 0;
            const isLastInRowMd = (index + 1) % 2 === 0;
            const isLastRowLg = index >= items.length - 3;
            const isLastRowMd = index >= items.length - 2;

            return (
              <m.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className={cn(
                  "group relative p-10 md:p-14 transition-all duration-500 hover:bg-slate-50/50",
                  !isLastInRowLg && "lg:border-r lg:border-slate-100",
                  !isLastInRowMd &&
                    "md:border-r md:border-slate-100 lg:border-r-0 lg:[&:not(:nth-child(3n))]:border-r",
                  !isLastRowLg && "lg:border-b lg:border-slate-100",
                  !isLastRowMd &&
                    "md:border-b md:border-slate-100 lg:border-b-0 lg:[&:not(:nth-last-child(-n+3))]:border-b",
                  index < items.length - 1 &&
                    "border-b border-slate-100 md:border-b-0",
                )}
              >
                {/* Large Background Number */}
                <div className="absolute top-8 right-8 select-none pointer-events-none opacity-[0.03] transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-[0.06]">
                  <span className="text-9xl font-black text-primary leading-none">
                    {item.number}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Number Indicator */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-3xl font-space font-black text-primary/20 group-hover:text-primary/40 transition-colors duration-300">
                      {item.number}
                    </span>
                    <div className="h-px w-6 bg-primary/20 group-hover:w-10 transition-all duration-500" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                    <HighlightedText text={item.title} />
                  </h3>

                  <p className="text-foreground/50 leading-relaxed text-[15px] md:text-[16px] group-hover:text-foreground/70 transition-colors duration-300">
                    <HighlightedText text={item.description} />
                  </p>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 size-0 border-t-2 border-r-2 border-primary/0 group-hover:w-4 group-hover:h-4 group-hover:border-primary/20 transition-all duration-500" />
                </div>
              </m.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
