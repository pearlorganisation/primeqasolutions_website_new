"use client";

import React from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { FaCheck } from "react-icons/fa";
import { BsMicrosoftTeams } from "react-icons/bs";
import type { PricingProps } from "./types";
import { extractPlainText } from "./utils";
import { parseHighlight } from "@/lib/utils/text-utils";

export function PricingV1({
  data,
  className,
}: PricingProps) {
  const heading = data?.heading;
  const plansData = data?.plans || [];

  const badge = heading?.label || "Engagement Models";
  const titleText = extractPlainText(heading?.title);
  const { title, highlight } = parseHighlight(titleText);
  const description = extractPlainText(heading?.description);

  return (
    <Section className={`py-12 sm:py-16 md:py-20 lg:py-28 bg-slate-50/50 border-t border-slate-100 ${className || ""}`}>
      <Container>
        {/* Header */}
        <SectionHeaderResolver 
          variant={heading?.variant} 
          align={heading?.align || "center"}
          badge={badge}
          title={title}
          titleHighlight={highlight}
          description={description}
        />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {plansData.map((plan: any) => {
            // Map dynamic features if available, otherwise empty array
            const features = Array.isArray(plan.features)
              ? plan.features.map((f: any) => {
                if (typeof f === "string") return f;
                if (f.text) return f.text;
                return extractPlainText(f.description || f.title || [f]);
              })
              : [];

            const ctaObj = plan.cta || plan.button || plan.primaryButton;
            const ctaLabel =
              plan.cta_label ||
              (typeof ctaObj === "string" ? ctaObj : ctaObj?.label || ctaObj?.text || ctaObj?.title) ||
              "Get Started";
            const ctaLink =
              plan.cta_link ||
              plan.ctaHref ||
              (typeof ctaObj === "object" ? ctaObj?.link || ctaObj?.url || ctaObj?.href : null) ||
              "/contact-us";

            return (
              <Card
                key={plan.id || plan.name}
                className={`relative flex flex-col transition-all duration-300 rounded-2xl overflow-visible gap-0 py-0
                  ${plan.featured
                    ? "ring-1 ring-neutral-800 bg-linear-to-b from-neutral-900 via-neutral-950 to-neutral-950 text-white shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)] "
                    : "ring-1 ring-slate-200 bg-white hover:ring-slate-300 hover:shadow-md "
                  }`}
              >
                <CardHeader className="px-5 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 pb-0 gap-0">
                  {/* Label */}
                  <div className="flex items-center gap-4 mb-3 sm:mb-4">
                    <p className={`text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.18em] ${plan.featured ? "text-white/90" : "text-neutral-500"}`}>
                      {plan.label}
                    </p>
                  </div>

                  {/* Plan name */}
                  <CardTitle className={`text-xl sm:text-2xl md:text-2xl font-medium tracking-tight mb-1.5 sm:mb-2 ${plan.featured ? "text-white" : "text-foreground"}`}>
                    {plan.name}
                  </CardTitle>

                  {/* Subtitle */}
                  <p className={`text-xs sm:text-sm md:text-base font-medium leading-relaxed ${plan.featured ? "text-white/90" : "text-neutral-500"}`}>
                    {plan.subtitle}
                  </p>
                </CardHeader>

                {/* Divider */}
                <div className={`mx-5 sm:mx-6 md:mx-8 my-5 sm:my-6 md:my-7 h-px ${plan.featured ? "bg-white/15" : "bg-slate-100"}`} />

                {/* Features */}
                <CardContent className="px-5 sm:px-6 md:px-8 pb-0 flex-1">
                  <ul className="flex flex-col gap-3 sm:gap-4">
                    {features.map((f: string) => (
                      <li key={f} className="flex items-start gap-2.5 sm:gap-3">
                        <span className={`shrink-0 flex size-4.5 sm:size-5 items-center justify-center rounded-full mt-0.5
                          ${plan.featured ? "bg-white text-neutral-950" : "bg-neutral-950 text-white"}`}>
                          <FaCheck className="size-2 sm:size-2.5" />
                        </span>
                        <span className={`text-xs sm:text-sm md:text-base font-medium leading-snug
                          ${plan.featured ? "text-white/95" : "text-neutral-600"}`}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                {/* CTA */}
                <CardFooter className="px-5 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-9 pt-6 sm:pt-7 md:pt-8 border-0 bg-transparent w-full">
                  <Button 
                    asChild 
                    variant="default"
                    className={`w-full py-2.5 flex items-center justify-center rounded-md font-semibold text-xs sm:text-[13px] transition-all duration-200 active:scale-[0.98]
                      ${plan.featured 
                        ? "bg-white! text-neutral-900! hover:bg-neutral-100! shadow-xs" 
                        : "bg-neutral-950 text-white hover:bg-neutral-800 shadow-sm"
                      }`}
                  >
                    <Link 
                      href={ctaLink} 
                      target={ctaObj?.openInNewTab ? "_blank" : undefined}
                      rel={ctaObj?.openInNewTab ? "noopener noreferrer" : undefined}
                    >
                      {ctaLabel}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
