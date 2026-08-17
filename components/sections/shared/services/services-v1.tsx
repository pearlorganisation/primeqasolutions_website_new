import React from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { Button } from "@/components/ui/button";
import { ServiceIcon, extractPlainText } from "./utils";
import type { ServicesProps } from "./types";
import { parseHighlight } from "@/lib/utils/text-utils";
import { H3 } from "@/components/ui/typography";
import { StrapiBlockRenderer } from "@/components/ui/strapi-block-renderer";

export function ServicesV1({ data }: ServicesProps) {

  const services = data?.services ?? [];
  if (!services.length) return null;

  const heading = data?.heading;
  const label = heading?.label ?? "";
  const title = extractPlainText(heading?.title) || "Our Professional";
  const description = extractPlainText(heading?.description) || "";

  // Use the highlight pattern utility
  const { title: titleBase, highlight: titleHighlight } = parseHighlight(title);


  return (
    <Section>
      <Container>
        {/* Section Header */}
        <SectionHeaderResolver
          variant={heading?.variant}
          align="center"
          badge={label}
          title={titleBase}
          titleHighlight={titleHighlight}
          description={description}
        // descriptionClassName="text-lg text-foreground/80"
        // className="mb-16"
        />

        {/* Unified Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {services.map((service) => {
            const href = service.link?.link;
            const linkLabel = service.link?.label;
            const limit = typeof service.lineLimit === "number" ? service.lineLimit : 3;

            return (
              <div
                key={service.id}
                className="group relative p-6  bg-cream rounded-lg hover:brightness-[0.97] flex flex-col transition-all duration-300"
              >
                {/* Hover Watermark Icon */}
                {/* <ServiceIcon
                  service={service}
                  className="absolute -bottom-8 -right-8 size-48 text-foreground/5 opacity-0 transition-all duration-500 group-hover:opacity-50 group-hover:-translate-y-4 group-hover:-translate-x-4 z-0 pointer-events-none"
                /> */}

                {/* Header Row: Icon */}
                <div className="relative z-10 flex items-center gap-2 mb-3">
                  <ServiceIcon
                    service={service}
                    className="size-5 grayscale-100 shrink-0 text-primary/80"
                  />
                  {service.title && (
                    <span className="font-display md:text-base text-sm font-medium text-black">
                      {service.title}
                    </span>
                  )}
                </div>

                {/* Content */}
                {service.description && (
                  <div
                    className="relative z-10 text-secondary mb-2 flex-1 leading-relaxed text-sm [--line-height-card:22px] overflow-hidden [&_p]:text-sm [&_p]:text-neutral-500! [&_p]:mb-3 [&_ul]:text-neutral-500! [&_ol]:text-neutral-500! [&_li]:text-neutral-500! [&_div.flex-1]:text-neutral-500! [&_li]:text-sm [&_div.flex-1]:text-sm [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:space-y-1 [&_ol]:mb-3"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: limit,
                      maxHeight: `calc(${limit} * var(--line-height-card))`,
                    }}
                  >
                    <StrapiBlockRenderer blocks={service.description} />
                  </div>
                )}

                {/* Action Link */}
                {href && linkLabel && (
                  <div className="mt-auto">
                    <Button asChild variant="link" className="text-neutral-500 text-[14px] px-0! group/btn" >
                      <Link href={href} className="inline-flex items-center gap-1.5 font-medium">
                        {linkLabel}
                        <svg className="size-3.5 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M7 7h10v10" /></svg>
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
