 
"use client";

import Link from "next/link";
import { HiOutlineSparkles } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { SectionBadge } from "@/components/ui/section-badge";
import { StrapiBlockRenderer } from "@/components/ui/strapi-block-renderer";
import { StrapiHeroBlock } from "@/types/home";

interface HeroProps {
  data: StrapiHeroBlock;
}

export default function Hero({ data }: HeroProps) {
  // Extract buttons from data
  const primaryBtn = (data as any).primaryButton;
  const secondaryBtn = (data as any).secondaryButton;

  return (
    <section className="relative isolate overflow-hidden">
      {/* ── Premium Aurora & Dot Mesh Background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-white"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="absolute -left-[10%] top-[10%] size-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -right-[10%] top-[20%] size-[600px] rounded-full bg-secondary/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[500px] w-[700px] rounded-full bg-indigo-400/10 blur-[120px]" />
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 sm:pb-28 lg:pb-32 text-center">
        {/* ── Badge ── */}
        <div className="mb-8 flex justify-center">
          <SectionBadge
            icon={HiOutlineSparkles}
            label={data.label}
            className="mb-5"
          />
        </div>

        {/* ── Heading ── */}
        <div className="font-space text-4xl font-semibold text-gray-900 sm:text-5xl lg:text-7xl mb-6">
          <StrapiBlockRenderer
            blocks={data.title}
            className="font-space tracking-tight font-extrabold text-[2.5rem] sm:text-5xl lg:text-7xl leading-tight text-slate-900"
          />
        </div>

        {/* ── Subtitle ── */}
        <div className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-xl">
          <StrapiBlockRenderer
            blocks={data.description}
            className="text-slate-700 leading-relaxed text-[16px]"
          />
        </div>

        {/* ── CTA Buttons ── */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {primaryBtn && (
            <Link href={primaryBtn.url || "#"}>
              <Button
                asChild
                className="h-auto hover:shadow-primary/20 px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_3px_5px_rgba(30,144,255,0.5),inset_0_1px_0_rgba(255,255,0.25)] duration-500"
              >
                <span>{primaryBtn.label}</span>
              </Button>
            </Link>
          )}
          {secondaryBtn && (
            <Link href={secondaryBtn.url || "#"}>
              <Button
                asChild
                variant="outline"
                className="h-auto border-gray-200 px-8 py-4 text-sm font-bold uppercase tracking-widest text-gray-700 transition-all duration-300 hover:text-gray-900 shadow-xs"
              >
                <span>{secondaryBtn.label}</span>
              </Button>
            </Link>
          )}
        </div>

        {/* ── Quote ── */}
        {data.quote && (
          <div className="mt-16 sm:mt-20">
            <blockquote className="text-sm italic text-gray-400 sm:text-base">
              &ldquo;{data.quote}&rdquo;
            </blockquote>
          </div>
        )}

        {/* ── Scroll indicator ── */}
        <div className="mt-12 flex justify-center sm:mt-16">
          <div className="flex h-9 w-6 items-start justify-center rounded-full border-2 border-gray-300 p-1">
            <span className="h-2 w-1 rounded-full bg-gray-400 animate-[bounce_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
}
