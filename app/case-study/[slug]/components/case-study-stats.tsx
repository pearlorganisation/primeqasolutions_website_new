 
import { Container, Section } from "@/components/ui/container";
import type { CaseStudyStateBlock, CaseStudyStatItem } from "@/types/case-study";

interface CaseStudyStatsProps {
  /** Passed by SectionRenderer as the raw block data */
  data: CaseStudyStateBlock;
}

export function CaseStudyStats({ data }: CaseStudyStatsProps) {
  const stats: CaseStudyStatItem[] = data?.stats_items ?? [];

  if (stats.length === 0) return null;

  return (
    <Section className="bg-neutral-50 border-y border-neutral-200/60" spacing="sm">
      <Container>
        <div className="flex flex-col gap-8 md:gap-10">

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 lg:gap-x-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-3 justify-center border-neutral-200/60 border-r-0 odd:border-r lg:border-r lg:[&:nth-child(4)]:border-r-0">
                {/* Value */}
                <span className="text-[3rem] tracking-tight font-medium text-primary leading-none">
                  {stat.stats}
                </span>
                
                {/* Label & Description */}
                <div className="flex flex-col gap-1 pr-4">
                  <span className="text-[1rem] lg:text-[1.0625rem] font-semibold text-neutral-800 leading-snug">
                    {stat.label}
                  </span>
                  {stat.description && (
                    <span className="text-[0.9375rem]  text-wrap! text-balance! text-neutral-500 leading-snug">
                      {stat.description}  
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
