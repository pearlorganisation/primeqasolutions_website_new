import React from "react";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils/utils";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

export function TrustBuildingV1({ data, className }: { data: any; className?: string }) {
  if (!data) return null;

  const { label, title, description, stats } = data;

  return (
    <Section className={cn(className)}>
      <Container >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Title and Description */}
          <div className="lg:col-span-7">
            <SectionHeaderResolver
              align="left"
              badge={label}
              title={title}
              description={
                description && (
                    <MarkdownRenderer
                      content={description}
                      className="font-sans [&_p]:text-base! [&_p]:font-normal! [&_p]:leading-[1.8]! [&_p]:text-neutral-500! [&_p]:mb-0! [&_p]:whitespace-pre-line [&_strong]:text-foreground/85! [&_strong]:font-semibold!"
                    />
                )
              }
              className="mb-0"
            />
          </div>

          {/* Right Column: Stats */}
          <div className="lg:col-span-5 w-full lg:pl-12 flex flex-col justify-center py-4 lg:py-0">
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-2 w-full max-w-sm sm:max-w-md">
                {stats.map((item: any, idx: number) => {
                  const isEven = idx % 2 === 1;
                  const isSecondRow = idx >= 2;
                  return (
                    <div
                      key={item.id || item.label}
                      className={cn(
                        "flex flex-col gap-1.5",
                        isEven ? "pl-6 sm:pl-8 border-l border-slate-200" : "pr-6 sm:pr-8",
                        isSecondRow ? "pt-6 sm:pt-8 border-t border-slate-200" : "pb-6 sm:pb-8",
                        isEven && isSecondRow && "border-l border-t border-slate-200"
                      )}
                    >
                      <span className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground">
                        {item.number}
                      </span>
                      <span className="text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.15em] text-neutral-500 leading-snug">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
