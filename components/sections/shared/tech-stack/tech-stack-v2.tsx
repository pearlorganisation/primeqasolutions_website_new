"use client";

import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { cn } from "@/lib/utils/utils";
import { resolveTechStackProps, toAbsUrl } from "./types";
import type { TechStackProps } from "./types";

const cardThemes = [
  {
    bg: "from-violet-500/[0.04] to-transparent",
    pill: "bg-violet-50/50 border-violet-100/50 text-violet-750 hover:bg-violet-600 hover:text-white hover:border-violet-600",
    title: "text-neutral-800 group-hover:text-violet-700",
    hover: "hover:border-violet-300 hover:shadow-[0_12px_24px_rgba(139,92,246,0.05)]"
  },
  {
    bg: "from-blue-500/[0.04] to-transparent",
    pill: "bg-blue-50/50 border-blue-100/50 text-blue-750 hover:bg-blue-600 hover:text-white hover:border-blue-600",
    title: "text-neutral-800 group-hover:text-blue-700",
    hover: "hover:border-blue-300 hover:shadow-[0_12px_24px_rgba(59,130,246,0.05)]"
  },
  {
    bg: "from-emerald-500/[0.04] to-transparent",
    pill: "bg-emerald-50/50 border-emerald-100/50 text-emerald-750 hover:bg-emerald-600 hover:text-white hover:border-emerald-600",
    title: "text-neutral-800 group-hover:text-emerald-700",
    hover: "hover:border-emerald-300 hover:shadow-[0_12px_24px_rgba(16,185,129,0.05)]"
  },
  {
    bg: "from-amber-500/[0.04] to-transparent",
    pill: "bg-amber-50/50 border-amber-100/50 text-amber-750 hover:bg-amber-600 hover:text-white hover:border-amber-600",
    title: "text-neutral-800 group-hover:text-amber-700",
    hover: "hover:border-amber-300 hover:shadow-[0_12px_24px_rgba(245,158,11,0.05)]"
  },
  {
    bg: "from-rose-500/[0.04] to-transparent",
    pill: "bg-rose-50/50 border-rose-100/50 text-rose-750 hover:bg-rose-600 hover:text-white hover:border-rose-600",
    title: "text-neutral-800 group-hover:text-rose-700",
    hover: "hover:border-rose-300 hover:shadow-[0_12px_24px_rgba(244,63,94,0.05)]"
  },
  {
    bg: "from-indigo-500/[0.04] to-transparent",
    pill: "bg-indigo-50/50 border-indigo-100/50 text-indigo-750 hover:bg-indigo-600 hover:text-white hover:border-indigo-600",
    title: "text-neutral-800 group-hover:text-indigo-700",
    hover: "hover:border-indigo-300 hover:shadow-[0_12px_24px_rgba(79,70,229,0.05)]"
  },
  {
    bg: "from-cyan-500/[0.04] to-transparent",
    pill: "bg-cyan-50/50 border-cyan-100/50 text-cyan-750 hover:bg-cyan-600 hover:text-white hover:border-cyan-600",
    title: "text-neutral-800 group-hover:text-cyan-700",
    hover: "hover:border-cyan-300 hover:shadow-[0_12px_24px_rgba(6,182,212,0.05)]"
  },
  {
    bg: "from-fuchsia-500/[0.04] to-transparent",
    pill: "bg-fuchsia-50/50 border-fuchsia-100/80 text-fuchsia-750 hover:bg-fuchsia-600 hover:text-white hover:border-fuchsia-600",
    title: "text-neutral-800 group-hover:text-fuchsia-700",
    hover: "hover:border-fuchsia-300 hover:shadow-[0_12px_24px_rgba(217,70,239,0.05)]"
  }
];

export function TechStackV2(props: TechStackProps) {
  const { heading, badge, title, titleHighlight, description, categories } =
    resolveTechStackProps(props);

  return (
    <Section spacing="sm" className="relative bg-white overflow-hidden">
      <Container className="relative z-10">
        {/* Header */}
        <SectionHeaderResolver 
          variant={heading?.variant}
          badge={badge}
          title={title}
          titleHighlight={titleHighlight}
          description={description}
        />

        {/* Categories Grid (4-column layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10 w-full">
          {categories.map((cat, index) => {
            const theme = cardThemes[index % cardThemes.length];
            return (
              <div 
                key={cat.id} 
                className={cn(
                  "group relative overflow-hidden bg-white border border-neutral-200/60 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all duration-300 flex flex-col gap-4.5 hover:-translate-y-0.5",
                  theme.hover
                )}
              >
                {/* Subtle colored background gradient */}
                <div className={cn("absolute inset-0 bg-linear-to-b opacity-100 pointer-events-none", theme.bg)} />

                {/* Category Name Header */}
                <div className="relative z-10">
                  <h3 className={cn("text-[13px] font-bold tracking-wider uppercase transition-colors duration-300", theme.title)}>
                    {cat.category}
                  </h3>
                </div>

                {/* Technologies list (Clean, premium tag chips) */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-1">
                  {cat.tools.map((tool) => {
                    if (!tool.name) return null;
                    return (
                      <div
                        key={tool.name}
                        className={cn(
                          "inline-flex items-center justify-center px-3 py-1.5 rounded-md border font-semibold text-[12px] hover:scale-[1.02] transition-all duration-200 cursor-default select-none shadow-[0_1px_2px_rgba(0,0,0,0.01)]",
                          theme.pill
                        )}
                      >
                        {tool.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
