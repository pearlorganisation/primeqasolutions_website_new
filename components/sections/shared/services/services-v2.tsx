"use client";

import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { Button } from "@/components/ui/button";
import { ServiceIcon, extractPlainText } from "./utils";
import type { ServicesProps } from "./types";
import { parseHighlight } from "@/lib/utils/text-utils";
import { H3 } from "@/components/ui/typography";

export function ServicesV2({ data }: ServicesProps) {
  const services = data?.services ?? [];
  if (!services.length) return null;

  const heading = data?.heading;
  const label = heading?.label ?? "Our Services";
  const title = extractPlainText(heading?.title) || "Engineering Quality Excellence";
  const description = extractPlainText(heading?.description) || "We deliver end-to-end QA solutions powered by AI and deep domain expertise.";

  const { title: titleBase, highlight: titleHighlight } = parseHighlight(title);


  return (
    <Section className="py-24 lg:py-32 bg-white">
      <Container>
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 ">
          <div className="max-w-2xl">
            <SectionHeaderResolver 
              variant={heading?.variant} 
              align="left"
              badge={label}
              title={titleBase}
              titleHighlight={titleHighlight}
              description={description}
              // descriptionClassName="text-foreground/60 text-[17px] md:text-lg leading-relaxed"
              // className="md:mb-14 pl-3"
              // headingClassName="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            />
          </div>
        </div>

        {/* Services Grid (Below Header) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const desc = extractPlainText(service.description);
            const href = service.link?.link;
            const linkLabel = service.link?.label;
            
            const className = "group p-5 md:p-6 bg-white rounded-xl border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col transition-all duration-300 relative";

            const cardContent = (
              <>
                {/* Title and Icon row */}
                <div className="flex items-center gap-3 mb-1 ">
                  {/* <ServiceIcon
                    service={service}
                    className="size-6 text-foreground/85 transition-colors duration-300 shrink-0"
                  /> */}
                  <H3 className="text-foreground tracking-tight transition-colors duration-300 mb-0">{service.title}</H3>
                </div>

                {/* Big Font Description */}
                <p className="text-neutral-500 text-sm lg:text-[16px] line-clamp-3 md:line-clamp-2 text-balance leading-relaxed ">
                  {desc}
                </p>

                {/* Bottom Button */}
                {href && linkLabel && (
                  <div className="mt-auto pt-1 md:pt-2">
                    <Button variant="link" className="text-neutral-500 text-[14px] px-0! group/btn">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        {linkLabel}
                        <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M7 7h10v10" /></svg>
                      </span>
                    </Button>
                  </div>
                )}
              </>
            );

            return href ? (
              <Link key={service.id} href={href} className={className}>
                {cardContent}
              </Link>
            ) : (
              <div key={service.id} className={className}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
