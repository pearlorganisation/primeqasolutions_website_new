import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { resolveFeatureProps} from "./types";
import type { FeatureSectionProps } from "./types";
import { IconList } from "@/components/sections/shared/icon-list";


// ─── V3: Split layout — left sticky header + stats, right icon-on-top list ──

export function FeatureSectionV3(props: FeatureSectionProps) {
  const { badge, title, description, items, stats } =
    resolveFeatureProps(props);


  return (
    <Section className={props.className ?? ""}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">

          {/* ── Left: heading + stats ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <SectionHeaderResolver 
              variant={props.data?.heading?.variant}
              align="left"
              badge={badge}
              title={title}
              description={description}

              className="mb-10 w-full lg:mb-0! pl-3"
              headingClassName="leading-tight mb-6"
            />

            {stats && stats.length > 0 && stats.some(stat => stat.value || stat.label) && (
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 pt-10 mt-10 border-t border-neutral-100">
                {stats.filter(stat => stat.value || stat.label).map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-4xl font-extrabold text-neutral-900 tracking-tight tabular-nums mb-1">
                      {stat.value}
                    </span>
                    <span className="text-[0.7rem] font-bold uppercase tracking-widest text-neutral-500 max-w-[120px] leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Reason List (Icon on Top) ── */}
          {items.length > 0 && (
            <IconList items={items} className="lg:col-span-7" />
          )}

        </div>
      </Container>
    </Section>
  );
}
