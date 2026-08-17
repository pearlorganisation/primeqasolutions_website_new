import React from "react";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/sections/shared/section-heading/section-header-v1";
import { cn } from "@/lib/utils/utils";

interface WhoWeAreProps {
  data: {
    title: string;
    description: string;
    variant?: string;
    image: {
      url: string;
      alternativeText?: string;
    };
  };
  className?: string;
}

export function WhoWeAre({ data, className }: WhoWeAreProps) {
  return (
    <Section className={cn("bg-white", className)}>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col items-start">
            <SectionHeader
              align="left"
              title={data.title}
              description={data.description}
            />
          </div>

          {/* Image */}
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={data.image.url}
              alt={data.image.alternativeText || data.title}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
