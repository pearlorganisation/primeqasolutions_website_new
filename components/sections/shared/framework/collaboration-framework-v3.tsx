"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { cn } from "@/lib/utils/utils";
import { FrameworkSectionProps, resolveFrameworkProps } from "./types";

/**
 * CollaborationFrameworkV3 - A clean 2-column grid layout for process steps.
 * Matches the process section UI design.
 */
export function CollaborationFrameworkV3(props: FrameworkSectionProps) {
  const { badge, title, description, items } = resolveFrameworkProps(props);

  return (
    <Section className={cn("bg-white py-16 lg:py-24", props.className)}>
      <Container>
        <SectionHeaderResolver 
              variant={props.data?.heading?.variant}  
          title={title}
          description={description}
          badge={badge}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-12 mt-16 max-w-5xl mx-auto">
          {items.map((step) => (
            <div
              key={`${step.number}-${step.title}`}
              className="flex flex-col border-r-2 border-neutral-200 pr-6 lg:pr-8"
            >
              <span className="text-base font-normal text-[#6366f1] mb-2 tracking-widest uppercase">
                Step {step.number}
              </span>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {step.title}
              </h3>
              <p className="text-base text-neutral-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
