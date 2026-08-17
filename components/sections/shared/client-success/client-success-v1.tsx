"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { Container, Section } from "@/components/ui/container";
import { FaPlay, FaTimes, FaArrowRight, FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";
import { cn } from "@/lib/utils/utils";
import { SectionHeaderResolver } from "../section-heading/section-header-resolver";
import {
  type ClientSuccessProps,
  type Testimonial,
  resolveClientSuccessProps
} from "./types";

// ─── Video Modal ──────────────────────────────────────────────────────────────
function VideoModal({
  youtubeId,
  videoUrl,
  name,
  onClose,
}: {
  youtubeId?: string;
  videoUrl?: string;
  name: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-label={`Video testimonial from ${name}`}
      className="fixed inset-0 z-9999 m-0 size-full max-h-none max-w-none border-0 bg-transparent p-4 backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm md:p-10"
      onCancel={onClose}
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className="relative z-10 mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >


        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-4 border-white/20 border-t-primary" />
          </div>
          {youtubeId ? (
            <iframe
              className="relative z-10 size-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={`Video testimonial from ${name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-presentation"
              allowFullScreen
            />
          ) : videoUrl ? (
            <video
              className="relative z-10 size-full"
              aria-label={`Video testimonial from ${name}`}
              controls
              autoPlay
              src={videoUrl}
            >
              <track kind="captions" src="" srcLang="en" label="English" />
            </video>
          ) : (
            <div className="size-full flex items-center justify-center text-white/50">
              No video available
            </div>
          )}
        </div>
      </div>
    </dialog>,
    document.body
  );
}

// ─── Testimonial Card — vertical stack ────────────────────────────────────────
function TestimonialCard({ t }: { t: Testimonial }) {
  const [modalOpen, setModalOpen] = useState(false);
  const open = useCallback(() => setModalOpen(true), []);
  const close = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]">

        {/* Video thumbnail */}
        <button
          type="button"
          onClick={open}
          aria-label={`Watch ${t.name}'s video testimonial`}
          className="relative block w-full cursor-pointer"
        >
          <div className="relative aspect-[16/8] w-full overflow-hidden bg-neutral-100">
            {t.thumbnail?.match(/\.(mp4|webm|ogg)(\?.*)?$/i) ? (
              <video
                src={t.thumbnail}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                aria-label={`${t.name} video thumbnail`}
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src={t.thumbnail}
                alt={`${t.name} video thumbnail`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}

            <div className="absolute inset-0 bg-neutral-900/15 transition-opacity duration-300 group-hover:bg-neutral-900/25" />
          </div>

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-white/30 transition-transform duration-200 group-hover:scale-105">
              <FaPlay className="size-3 translate-x-0.5 text-primary" />
            </div>
          </div>
        </button>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">

          {/* Quote */}
          <ImQuotesLeft className="size-6 shrink-0 text-primary/15" />

          {/* Review */}
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-600">
            {t.quote}
          </p>

          {/* Divider */}
          <div className="h-px bg-neutral-100" />

          {/* User */}
          <div className="flex items-center gap-2.5">
            <Image
              src={t.avatar}
              alt={t.name}
              width={64}
              height={64}
              className="size-8 shrink-0 rounded-full object-cover object-top ring-1 ring-primary/10"
            />

            <div className="min-w-0">
              <p className="truncate text-xs font-semibold tracking-tight text-foreground">
                {t.name}
              </p>

              <p className="mt-0.5 truncate text-[0.65rem] font-medium text-neutral-500">
                {t.role}
                {t.company ? ` at ${t.company}` : ""}
              </p>
            </div>
          </div>
        </div>
      </article>

      {modalOpen && (
        <VideoModal
          youtubeId={t.youtubeId}
          videoUrl={t.videoUrl}
          name={t.name}
          onClose={close}
        />
      )}
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function ClientSuccessV1(props: ClientSuccessProps) {
  const { testimonials, badge, title, description } = resolveClientSuccessProps(props);

  return (
    <Section className={cn("py-16 lg:py-20 bg-white", props.className)}>
      <Container>
        {/* Unified Header & Clutch Button */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 lg:mb-12">
          <div className="flex-1">
            <SectionHeaderResolver
              align="left"
              variant={props.data?.header?.variant}
              badge={badge}
              title={title}
              description={description}
              className="mb-0 lg:mb-0"
            />
          </div>
          <div className="shrink-0">
            <Link
              href="https://clutch.co/profile/primeqa-solutions-private"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg bg-neutral-900 text-xs font-semibold text-white shadow-sm hover:bg-neutral-800 transition-all duration-200"
            >
              <span>4.9 ★ on Clutch</span>
              <FaArrowRight className="text-[10px] -rotate-45 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* ── Testimonials Grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,520px)_minmax(0,520px)] lg:justify-center lg:gap-5">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={`${t.name}-${idx}`} t={t} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
