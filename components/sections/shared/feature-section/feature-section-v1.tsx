import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { resolveFeatureProps, toAbsUrl } from "./types";
import type { FeatureSectionProps } from "./types";
import { renderWithHighlights } from "@/lib/utils/text-utils";
import { H3, P } from "@/components/ui/typography";
import { IconList } from "@/components/sections/shared/icon-list";

// ─── V1: Split layout — left sticky header + stats, right vertical list ─────

export function FeatureSectionV1(props: FeatureSectionProps) {
  const { badge, title, description, items, stats } =
    resolveFeatureProps(props);

  return (
    <Section className={props.className ?? ""}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 sm:gap-12 xl:gap-20 items-start">
          {/* ── Left: heading + stats ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <SectionHeaderResolver 
              variant={props.data?.heading?.variant}
              align="left"
              badge={badge}
              title={title}
              description={description}
            />

            {stats && stats.length > 0 && stats.some(stat => stat.value || stat.label) && (
              <div className="flex-col sm:flex-row lg:flex-col grid grid-cols-2 gap-10 pt-10 mt-10 border-t border-neutral-100">
                {stats.filter(stat => stat.value || stat.label).map((stat) => (
                  <div
                    key={stat.label}
                    className="group flex items-center gap-5"
                  >
                    <div className="flex flex-col">
                      <span className="text-3xl font-extrabold text-foreground tracking-tight tabular-nums">
                        {stat.value}
                      </span>
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest text-foreground/50 mt-1.5 group-hover:text-primary transition-colors duration-300">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Reason List ── */}
          {items.length > 0 && (
            <IconList items={items} className="lg:col-span-7" />
          )}
        </div>
      </Container>
    </Section>
  );
}
