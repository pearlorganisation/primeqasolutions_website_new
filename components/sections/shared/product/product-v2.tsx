"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { type Product } from "@/data/products";
import { resolveProductProps, type ProductSectionProps } from "./types";
import { parseHighlight } from "@/lib/utils/text-utils";
import { cn } from "@/lib/utils/utils";
import { GoProject } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { m, AnimatePresence } from "motion/react";
import { H3, P, Small } from "@/components/ui/typography";

// ─── Product Image Panel (Dynamic) ──────────────────────────────────────────
function ProductPanel({ product }: { product: Product }) {
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={product.id}
        initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.02, filter: "blur(5px)" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] md:aspect-auto md:min-h-[400px] h-full rounded-2xl border border-white/10 shadow-2xl group bg-slate-900"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          width={1200}
          height={800}
          unoptimized
          className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none mix-blend-overlay" />
      </m.div>
    </AnimatePresence>
  );
}

// ─── Products Section V2 ──────────────────────────────────────────────────────
export function ProductsV2(props: ProductSectionProps) {
  const { badge, title, description, products } = resolveProductProps(props);
  const [activeId, setActiveId] = useState<string>(products[0]?.id || "");
  const active = products.find((p) => p.id === activeId) ?? products[0];

  const { title: titleBase, highlight: titleHighlight } = parseHighlight(title || "Our AI-Powered {{Product Suite}}");

  if (!active) return null;

  return (
    <Section className="bg-[#000000]! relative overflow-hidden">
      {/* Background ambient effects */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-60 -left-40 size-[600px] rounded-full bg-primary/10 blur-[130px] mix-blend-screen"
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
              className="bg-white/8 border border-white/10 shadow-none"
              icon={GoProject}
              labelClassName="text-blue-400"
              iconClassName="text-blue-400 text-lg"
            />
          }
          title={titleBase}
          titleHighlight={titleHighlight}
          description={description || "Two purpose-built products — one for AI-native automation, one for enterprise test management. Both designed to eliminate defects before they reach your users."}
        />

        {/* ── Split Panel with Integrated Tabs ── */}
        <div className="rounded-2xl overflow-hidden border border-white/8 bg-white/4 shadow-2xl">
          
          {/* ── Integrated Tab Bar ── */}
          <div className="w-full border-b border-white/8 bg-black/40 flex items-center relative">
            {/* macOS Traffic Light Dots */}
            <div className="hidden md:flex items-center gap-2 pl-6 pr-4 shrink-0">
              <div className="size-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_rgba(255,95,87,0.4)]" />
              <div className="size-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
              <div className="size-3 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
            </div>

            {/* Tabs */}
            <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden scroll-smooth">
              <div className="flex justify-start md:justify-center gap-6 md:gap-10 px-6">
                {products.map((p) => {
                  const isActive = activeId === p.id;
                  return (
                    <button type="button"
                      key={p.id}
                      onClick={() => setActiveId(p.id)}
                      className={cn(
                        "relative py-4 text-xs sm:text-sm md:text-[0.95rem] font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer",
                        isActive
                          ? "text-neutral-50"
                          : "text-neutral-400 hover:text-neutral-200"
                      )}
                    >
                      <span className="relative z-10">{p.tab}</span>
                      
                      {/* Active Underline Indicator */}
                      {isActive && (
                        <m.div
                          layoutId="activeProductTab"
                          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary z-20"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spacer to balance the dots on the right (only on desktop) */}
            <div className="hidden md:block w-[68px] shrink-0" />
          </div>

          {/* ── Content Area ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center p-6 sm:p-10 md:p-12 lg:p-16">
            
            {/* Left — Dynamic Content */}
            <div className="flex flex-col order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <m.div
                  key={active.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col"
                >
                  {/* Tagline */}
                  <Small className="inline-block text-[0.7rem] md:text-[0.75rem] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                    {active.tagline}
                  </Small>

                  {/* Name */}
                  {/* <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 font-space leading-tight">
                    {active.name}
                  </h3> */}
<H3 className="text-3xl! text-neutral-50 mb-3">{active.name}</H3>
                  {/* Description */}
                  <P className="text-neutral-400 mb-8 md:mb-10 text-[0.95rem] md:text-lg">
                    {active.description}
                  </P>

                  {/* CTA */}
                  <Link
                    href={active.cta.href}
                    className="group inline-flex w-max items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary border-b border-primary/50 pb-1.5 hover:border-primary transition-all"
                  >
                    {active.cta.label}
                    <FaArrowRight className="text-sm -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                  </Link>
                </m.div>
              </AnimatePresence>
            </div>

            {/* Right — Dynamic Image */}
            <div className="order-1 lg:order-2">
              <ProductPanel product={active} />
            </div>
            
          </div>
        </div>

      </Container>
    </Section>
  );
}
