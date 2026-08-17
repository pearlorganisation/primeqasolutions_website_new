import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { resolveFeatureProps, toAbsUrl } from "./types";
import type { FeatureSectionProps } from "./types";
import { H3 } from "@/components/ui/typography";


// ─── V2: Split layout — left sticky header + stats, right 2-column grid cards

export function FeatureSectionV2(props: FeatureSectionProps) {
  const { badge, title, description, items, stats } =
    resolveFeatureProps(props);


  return (
    <Section className={props.className ?? ""}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-12 items-start">

          {/* ── Left: heading + stats ── */}
          <div className="lg:col-span-6 lg:sticky lg:top-32">
            <SectionHeaderResolver 
              variant={props.data?.heading?.variant}
              align="left"
              badge={badge}
              title={title}
              description={description}

              className="mb-10 w-full"
              headingClassName="leading-tight mb-6"
            />

            {stats && stats.length > 0 && stats.some(stat => stat.value || stat.label) && (
              <div className="flex-col sm:flex-row lg:flex-col grid grid-cols-2 gap-x-8 gap-y-10 pt-6 mt-6">
                {stats.filter(stat => stat.value || stat.label).map((stat) => (
                  <div key={stat.label} className="group flex items-center">
                    <div className="flex flex-col py-1">
                      <span className="text-2xl sm:text-2xl font-display font-medium text-primary tracking-tight tabular-nums leading-none mb-1.5">
                        {stat.value}
                      </span>
                      <span className="text-xs uppercase tracking-widest text-neutral-400 group-hover:text-primary transition-colors duration-300">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: 2-column card grid ── */}
          {items.length > 0 && (
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 lg:pt-0 ">
              {items.map((item) => (
                 <div
                  key={item.title}
                  className="group relative p-6 bg-cream rounded-lg hover:brightness-[0.97] flex flex-col transition-all duration-300"
                >
                  {/* Header Row: Icon & Title */}
                  <div className="relative z-10 flex items-center gap-2 mb-3">
                    <div className="shrink-0 flex size-5 items-center justify-center text-primary grayscale-75">
                      {item.iconImage?.url ? (
                        <Image
                          src={toAbsUrl(item.iconImage.url)}
                          alt={item.iconImage.alternativeText || item.title}
                          width={20}
                          height={20}
                          className="size-5 object-contain"
                        />
                      ) : item.icon ? (
                        <item.icon className="size-5" />
                      ) : null}
                    </div>
                    {item.title && (
                      <H3 className="line-clamp-1c">{item.title}</H3>
                    )}
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="relative z-10 text-secondary flex-1 leading-relaxed line-clamp-3 text-sm">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </Container>
    </Section>
  );
}
