"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { m } from "motion/react";
import { Container, Section } from "@/components/ui/container";
import { cn } from "@/lib/utils/utils";
import { SectionHeaderResolver } from "../section-heading/section-header-resolver";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  type ClientSuccessProps,
  type Testimonial,
  resolveClientSuccessProps,
} from "./types";

function VideoContent({ t }: { t: Testimonial }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-white/20 border-t-primary" />
      </div>
      {t.youtubeId ? (
        <iframe
          className="relative z-10 size-full"
          src={`https://www.youtube-nocookie.com/embed/${t.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={`Video testimonial from ${t.name}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          allowFullScreen
        />
      ) : (
        <video
          className="relative z-10 size-full"
          aria-label={`Video testimonial from ${t.name}`}
          controls
          autoPlay
          src={t.videoUrl}
        >
          <track kind="captions" src="" srcLang="en" label="English" />
        </video>
      )}
    </div>
  );
}

function TestimonialMedia({ t }: { t: Testimonial }) {
  if (t.thumbnail) {
    const isVideoThumb = t.thumbnail.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
    if (isVideoThumb) {
      return (
        <video
          src={t.thumbnail}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          aria-label={`${t.name} video thumbnail`}
          muted
          playsInline
          preload="metadata"
        />
      );
    }

    return (
      <Image
        src={t.thumbnail}
        alt={`${t.name} thumbnail`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    );
  }

  if (t.avatar) {
    return (
      <div className="relative size-full flex items-center justify-center bg-slate-50">
        <Image
          src={t.avatar}
          alt={t.name}
          fill
          sizes="100vw"
          className="object-contain p-8 opacity-20 grayscale"
        />
        <Quote className="absolute size-12 text-primary/10" />
      </div>
    );
  }

  return (
    <div className="flex size-full items-center justify-center bg-slate-100">
      <Quote className="size-12 text-slate-300" />
    </div>
  );
}

/**
 * Individual Testimonial Card with Video Dialog Integration
 */
function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const isVideo = !!(t.youtubeId || t.videoUrl);

  return (
    <m.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full rounded-[18px] p-[4px] bg-linear-to-br from-[#DDE5FF] via-[#E2DEFF] to-[#F3E5FF]  shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white h-full relative">
        {/* Media Section */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          {isVideo ? (
            <Dialog>
              <DialogTrigger asChild>
                <button type="button" aria-label={`Watch ${t.name}'s video testimonial`} className="relative block h-full w-full cursor-pointer text-left focus:outline-none">
                  <TestimonialMedia t={t} />
                  <div className="absolute inset-0 bg-slate-900/20 transition-opacity duration-300 group-hover:bg-slate-900/30" />
                  <div className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-lg bg-white shadow-xl ring-4 ring-white/30 transition-all duration-200 group-hover:scale-[1.02]">
                    <Play className="size-5 translate-x-0.5 text-primary fill-current" />
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent showCloseButton={false} className="max-w-5xl border-none bg-transparent p-0 shadow-none sm:max-w-5xl lg:max-w-6xl w-full">

                <VideoContent t={t} />
              </DialogContent>
            </Dialog>
          ) : (
            <>
              <TestimonialMedia t={t} />
              <div className="absolute inset-0 bg-slate-900/20 transition-opacity duration-300 group-hover:bg-slate-900/30" />
            </>
          )}
        </div>

        {/* Content Section (Similar to v1) */}
        <div className="flex flex-col gap-5 p-7 flex-1">
          {/* Big quote icon */}
          <Quote className="size-9 text-primary/15 shrink-0 -mb-1 fill-current rotate-180" />

          {/* Review text */}
          <p className="text-[1rem] text-slate-700 leading-relaxed flex-1">
            &ldquo;{t.quote}&rdquo;
          </p>

          {/* Divider */}
          <div className="h-px bg-slate-100" />

          {/* User info */}
          <div className="flex items-center gap-3">
            <Image
              src={t.avatar}
              alt={t.name}
              width={100}
              height={100}
              className="rounded-lg size-12 object-cover object-top ring-2 ring-neutral-200 dark:ring-neutral-800 shrink-0"
            />
            <div>
              <p className="text-[0.9375rem] font-semibold text-slate-900 tracking-tight">
                {t.name}
              </p>
              <p className="text-[0.75rem] text-slate-500 font-medium mt-0.5">
                {t.role}{t.company ? ` at ${t.company}` : ""}
              </p>
            </div>
          </div>
        </div>
      </article>
    </m.div>
  );
}

export function ClientSuccessV2(props: ClientSuccessProps) {
  const { testimonials, badge, title, description } = resolveClientSuccessProps(props);
  
  const carouselRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isCarousel = testimonials.length > 2;

  const scrollToIndex = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | null;
    if (!child) return;

    setActiveIndex(index);
    
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    const nextIndex = Math.max(0, activeIndex - 1);
    scrollToIndex(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(testimonials.length - 1, activeIndex + 1);
    scrollToIndex(nextIndex);
  };

  useEffect(() => {
    if (!isCarousel) return;
    const el = carouselRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      
      children.forEach((c, i) => {
        const rect = c.offsetLeft + c.clientWidth / 2;
        const dist = Math.abs(center - rect);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIndex(best);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isCarousel]);

  if (!testimonials?.length) return null;

  return (
    <Section className={cn("relative overflow-hidden py-24 lg:py-36", props.className)}>
      {/* Decorative Background Elements */}
      <div className="absolute left-0 top-0 -z-10 size-full overflow-hidden">
        <div className="absolute -left-20 top-0 size-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
        <div className="absolute -right-20 bottom-0 size-[600px] rounded-full bg-primary/[0.03] blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50/[0.02] blur-[150px]" />
      </div>

      <Container>
        <SectionHeaderResolver 
          variant={props.data?.header?.variant}
          badge={badge}
          title={title}
          description={description}
        />

        {/* Layout Engine */}
        {!isCarousel ? (
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`${t.name}-${t.company ?? t.role}-${idx}`} t={t} index={idx} />
            ))}
          </div>
        ) : (
          <div className="mt-16 relative">
            {/* Custom Navigation */}
            <div className="absolute -top-20 right-0 hidden items-center gap-4 md:flex">
              <button type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-primary hover:text-white hover:border-primary disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button type="button"
                onClick={handleNext}
                disabled={activeIndex === testimonials.length - 1}
                className="flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-primary hover:text-white hover:border-primary disabled:opacity-20 disabled:hover:bg-white disabled:hover:text-slate-600 disabled:hover:border-slate-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>

            {/* Carousel Track */}
            <ul
              ref={carouselRef}
              className="no-scrollbar flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-12 pt-4"
            >
              {testimonials.map((t, idx) => (
                <li
                  key={`${t.name}-${t.company ?? t.role}-${idx}`}
                  className="w-[88vw] flex-shrink-0 snap-center md:w-[calc(50%-16px)] lg:w-[calc(40%-24px)]"
                >
                  <TestimonialCard t={t} index={idx} />
                </li>
              ))}
            </ul>

            {/* Progress Indicators */}
            <div className="mt-4 flex items-center justify-center gap-3">
              {testimonials.map((t, i) => (
                <button type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  key={`${t.name}-${t.company ?? t.role}-indicator-${i}`}
                  onClick={() => scrollToIndex(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    i === activeIndex 
                      ? "w-12 bg-primary shadow-lg shadow-primary/20" 
                      : "w-2 bg-slate-200 hover:bg-slate-300 hover:w-4"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
