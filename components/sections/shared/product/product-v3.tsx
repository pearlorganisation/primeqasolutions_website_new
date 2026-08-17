"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { resolveProductProps, type ProductSectionProps } from "./types";
import { parseHighlight } from "@/lib/utils/text-utils";
import { cn } from "@/lib/utils/utils";
import { GoProject } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { m, AnimatePresence } from "motion/react";
import { P, Small } from "@/components/ui/typography";

export function ProductsV3(props: ProductSectionProps) {
  const { badge, title, description, products } = resolveProductProps(props);
  const [activeId, setActiveId] = useState<string>(products[0]?.id || "");

  const currentActiveId = products.find((t) => t.id === activeId) 
    ? activeId 
    : (products[0]?.id || "");

  const active = products.find((p) => p.id === currentActiveId);

  const { title: titleBase, highlight: titleHighlight } = parseHighlight(title || "Our AI-Powered {{Product Suite}}");

  if (!products || products.length === 0) return null;
  if (!active) return null;

  return (
    <Section className="bg-[#000000] relative overflow-hidden py-16 lg:py-24">
      {/* Background ambient effects */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-60 -left-40 size-[600px] rounded-full bg-primary/20 blur-[130px] mix-blend-screen"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-40 size-[600px] rounded-full bg-primary/20 blur-[130px] mix-blend-screen"
      />

      <Container className="relative z-10">
        {/* ── Header ── */}
        <SectionHeaderResolver 
              variant={props.data?.heading?.variant}  
          align="center"
          isDark
          badge={
            <SectionBadge
              label={badge || "Our Products"}
              className="bg-primary/5 border border-primary/10 shadow-none"
              icon={GoProject}
              labelClassName="text-primary"
              iconClassName="text-primary text-lg"
            />
          }
          title={titleBase}
          titleHighlight={titleHighlight}
          description={description}
        />

        {/* ── Tabs Navigation ── */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 border-b border-white/10 mb-12 sm:mb-16">
          {products.map((p) => {
            const isActive = currentActiveId === p.id;
            return (
              <button type="button"
                key={p.id}
                onClick={() => setActiveId(p.id)}
                className={cn(
                  "relative pb-4 px-2 md:px-4 text-sm md:text-lg hover:cursor-pointer font-medium transition-colors duration-200",
                  isActive
                    ? "text-primary"
                    : "text-neutral-400 hover:text-neutral-300"
                )}
              >
                {p.tab}
                {isActive && (
                  <m.div
                    layoutId="activeProductTabIndicatorV3"
                    className="absolute -bottom-px left-0 right-0 h-[2px] bg-primary"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Tab Content ── */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <m.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Left Content */}
              <div className="flex flex-col items-start lg:pr-8">
                {active.tagline && (
                  <Small className="inline-block text-[0.7rem] md:text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary mb-4">
                    {active.tagline}
                  </Small>
                )}

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-50 mb-6">
                  {active.name}
                </h3>

                <P className="text-base lg:max-w-[95%] md:text-lg text-neutral-400 mb-8 leading-relaxed">
                  {active.description}
                </P>

                {/* Features (if any exist in Product type) */}
                {(active as any).features && (active as any).features.length > 0 && (
                  <ul className="space-y-4 mb-10">
                    {(active as any).features.map((feature: any) => (
                      <li key={String(feature)} className="flex items-center gap-4 text-neutral-300">
                        <div className="shrink-0 text-primary">
                          {/* Simple check icon placeholder */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                {active.cta && active.cta.href && (
                  <Link
                    href={active.cta.href}
                    className="group inline-flex w-max items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/30 pb-1.5 hover:border-primary transition-all mt-4"
                  >
                    {active.cta.label || "Learn More"}
                    <FaArrowRight className="text-sm -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </Link>
                )}
              </div>

              {/* Right Image */}
              <div className="relative w-full aspect-square sm:aspect-4/3 lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 group">
                <Image
                  src={active.image}
                  alt={active.imageAlt || active.name}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none mix-blend-overlay" />
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}
