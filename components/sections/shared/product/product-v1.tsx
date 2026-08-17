"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { SectionHeader } from "@/components/sections/shared/section-heading/section-header-v1";
import { type Product } from "@/data/products";
import { resolveProductProps, type ProductSectionProps } from "./types";
import { parseHighlight } from "@/lib/utils/text-utils";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils/utils";
import { GoProject } from "react-icons/go";
import { H3 } from "@/components/ui/typography";

// ─── Product Panel ────────────────────────────────────────────────────────────
function ProductPanel({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[350px]">

      {/* Mobile Product Image (With spacing around it on mobile/tablet) */}
      <div className="p-5 pb-0 lg:hidden w-full">
        <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] rounded-xl border border-white/10 shadow-lg">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            unoptimized
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Left — Content */}
      <div className="flex flex-col justify-center px-5 py-8 sm:px-10 lg:pl-12 lg:pr-10 lg:py-12">
        {/* Tagline */}
        {product.tagline && (
          <span className="inline-block text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary mb-3">
            {product.tagline}
          </span>
        )}

        {/* Name */}
        <H3 className="text-2xl! text-neutral-50 mb-3 leading-tight">
          {product.name}
        </H3>

        {/* Description */}
        <p className="text-neutral-300/80 leading-relaxed mb-5 text-sm sm:text-base max-w-xl">
          {product.description}
        </p>

        {/* CTA */}
        <Link
          href={product.cta.href}
          className="group inline-flex w-max items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-white border-b border-white/40 pb-1  transition-all duration-300"
        >
          {product.cta.label}
          <FaArrowRight className="text-xs -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
        </Link>
      </div>

      {/* Right — Image (Desktop only) */}
      <div className="relative overflow-hidden hidden lg:block w-full h-full min-h-[350px]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          unoptimized
          className="object-cover object-left-top transition-transform duration-700 hover:scale-[1.02]"
        />
        {/* Subtle overlay to blend the image into the card */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/30 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────────
export function ProductsV1(props: ProductSectionProps) {
  const { badge, title, description, products } = resolveProductProps(props);
  const [activeId, setActiveId] = useState<string>(products[0]?.id || "");
  const active = products.find((p) => p.id === activeId) ?? products[0];

  const { title: titleBase, highlight: titleHighlight } = parseHighlight(title || "Our AI-Powered {{Product Suite}}");

  if (!active) return null;

  return (
    <Section className="relative bg-[#000000]! border-none overflow-hidden">
      {/* Background ambient effects */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-60 -left-40 size-[600px] rounded-full bg-primary/10 blur-[130px] mix-blend-screen"
      />

      <Container className="relative z-10 flex flex-col items-center">

        {/* ── Header ── */}
        <SectionHeader 
          align="center"
          isDark
          badge={
            <SectionBadge
              label={badge || "Our Products"}
              className="bg-white/8 border border-white/10 shadow-none rounded-lg"
              icon={GoProject}
              labelClassName="text-white"
              iconClassName="text-white text-lg"
            />
          }
          title={titleBase}
          titleHighlight={titleHighlight}
          description={description || "Two purpose-built products — one for AI-native automation, one for enterprise test management. Both designed to eliminate defects before they reach your users."}
          className="mb-5!"
        />

        {/* ── Tab Pills ── */}
        <div className="flex justify-center mt-4 mb-8 w-full px-2 sm:px-6">
          <div className="flex items-center gap-1 bg-neutral-900/80 border border-neutral-800 p-1 rounded-lg backdrop-blur-md overflow-x-auto max-w-full scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {products.map((p) => {
              const isActive = activeId === p.id;
              return (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={cn(
                    "rounded-md text-xs sm:text-sm font-normal px-4 py-2 transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer",
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5 "
                  )}
                >
                  {p.tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Product Panel ── */}
        <div className="w-full sm:px-6">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl relative">
            <ProductPanel product={active} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
