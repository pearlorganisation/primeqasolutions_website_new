import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Wrench } from "lucide-react";
import { strapiMediaUrl } from "@/http/client";
import type { CaseStudyTechStackBlock, TechItem } from "@/types/case-study";

interface Props {
  /** Passed by SectionRenderer as the raw block data */
  data: CaseStudyTechStackBlock;
}

export function CaseStudyTools({ data }: Props) {
  const items: TechItem[] = data?.tech_stacks ?? [];

  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="text-[1.75rem] font-semibold text-neutral-900 tracking-tight leading-snug mb-8">
        {data.heading}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => {
          const iconUrl = strapiMediaUrl(item.icon?.url);

          return (
            <Card
              key={item.id}
              className="group hover:border-primary/50 transition-colors"
            >
              <CardContent className="flex flex-col items-center justify-center gap-4 p-6 h-full">
                {iconUrl ? (
                  <Image
                    src={iconUrl}
                    alt={item.icon?.alternativeText ?? item.name}
                    width={40}
                    height={40}
                    className="size-10 object-contain transition-transform group-hover:scale-110 duration-300"
                  />
                ) : (
                  <Wrench className="size-10 text-neutral-400 transition-transform group-hover:scale-110 duration-300" />
                )}
                <span className="font-semibold text-neutral-900 text-center leading-tight text-[0.9375rem]">
                  {item.name}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
