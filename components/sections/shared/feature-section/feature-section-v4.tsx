import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { resolveFeatureProps, toAbsUrl } from "./types";
import type { FeatureSectionProps } from "./types";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { H3, P } from "@/components/ui/typography";
import { FaCheck } from "react-icons/fa";


// ─── V4: Centered header, horizontal stats row, 3-column reason grid ────────

export function FeatureSectionV4(props: FeatureSectionProps) {
  const { badge, title, description, items, stats } =
    resolveFeatureProps(props);


  return (
    <Section className={`bg-white ${props.className ?? ""}`}>
      <Container>
        {/* Header — Centered */}
        <div className="flex flex-col items-center text-center bg-[var(--color-page-canvas)] max-w-3xl mx-auto mb-20">
          <SectionHeaderResolver
            variant={props.data?.heading?.variant}
            align="center"
            badge={badge}
            title={title}
            description={description}

            descriptionClassName="text-neutral-500 max-w-2xl mx-auto text-lg"
          />
        </div>

        {/* Stats Row — Minimalist with Internal Borders */}
        {stats &&
          stats.length > 0 &&
          stats.some((stat) => stat.value || stat.label) && (
            <div className="grid grid-cols-2 md:grid-cols-4 mb-20">
              {stats
                .filter((stat) => stat.value || stat.label)
                .map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col items-center text-center bg-cream py-6 ${idx % 2 === 0
                        ? "border-r border-neutral-100"
                        : ""
                      } ${idx < 2
                        ? "border-b md:border-b-0 border-neutral-100"
                        : ""
                      } md:border-r md:last:border-r-0 border-neutral-100`}
                  >
                    <span className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight mb-1">
                      {stat.value}
                    </span>

                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-neutral-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
            </div>
          )}

        {/* Items Grid — 3 Columns */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {items.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col items-start bg-cream hover:brightness-[0.97] rounded-md p-2"
              >
                <div className="mb-6">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-cream text-primary/50 transition-all duration-300 group-hover:brightness-[1] group-hover:text-white  group-hover:scale-110 shadow-xs">
                    {item.iconImage?.url ? (
                      <Image
                        src={toAbsUrl(item.iconImage.url)}
                        alt={
                          item.iconImage.alternativeText ||
                          item.title
                        }
                        width={24}
                        height={24}
                        className="size-6 object-contain"
                      />
                    ) : item.icon ? (
                      <item.icon className="size-5 text-success " />
                    ) : (
                      <FaCheck className="size-5 text-success" />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <H3 className="text-lg">
                    <HighlightedText text={item.title} />
                  </H3>

                  <P>
                    <HighlightedText text={item.description} />
                  </P>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
