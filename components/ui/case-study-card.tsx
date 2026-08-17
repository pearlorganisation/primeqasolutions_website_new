import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/types/case-study";
import { strapiMediaUrl } from "@/http/client";
import { FaArrowRight } from "react-icons/fa";

interface CaseStudyCardProps {
  study: CaseStudy;
  /** Pass true only for the first visible card to eagerly load its image */
  priority?: boolean;
  variant?: "default" | "listing";
}

export function CaseStudyCard({ study, priority = false, variant = "default" }: CaseStudyCardProps) {
  const imageUrl = strapiMediaUrl(study.image);

  if (variant === "listing") {
    return (
      <Link
        href={`/case-study/${study.slug}`}
        className="group flex flex-col md:flex-row gap-5 md:gap-8 py-6 border-b border-neutral-200/60 last:border-0 md:items-start cursor-pointer"
      >
        {/* Left Side: Image */}
        <div className="relative w-full md:w-[300px] lg:w-[400px] xl:w-[480px] aspect-video overflow-hidden rounded-xl bg-neutral-50 border border-neutral-200/40 shrink-0 shadow-xs">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={study.imageAlt || study.title}
              fill
              unoptimized
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 480px"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-50 text-neutral-400 text-2xl font-bold">
              {study.title.charAt(0)}
            </div>
          )}
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 flex flex-col min-w-0 pt-0.5">
          {/* Metadata */}
          <div className="flex items-center gap-2 mb-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
            <span>{study.industry}</span>
            <span>•</span>
            <span>{study.testingType}</span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg md:text-xl font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors leading-snug mb-2 tracking-tight">
            {study.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed line-clamp-3 mb-4">
            {study.excerpt}
          </p>

          {/* Footer - Date & Link */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-400 font-medium">
            <span>{study.date}</span>
            <span className="inline-flex items-center gap-1.5 text-neutral-600 group-hover:text-neutral-900 transition-colors font-semibold">
              Read Case Study
              <FaArrowRight className="size-2.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default Variant (borderless vertical grid layout item)
  return (
    <Link
      href={`/case-study/${study.slug}`}
      className="group flex flex-col cursor-pointer w-full"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-neutral-50 border border-neutral-200/40 shrink-0 shadow-xs mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={study.imageAlt || study.title}
            fill
            unoptimized
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-50 text-neutral-400 text-3xl font-bold">
            {study.title.charAt(0)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Category / Metadata */}
        <div className="flex items-center gap-2 mb-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
          <span>{study.industry}</span>
          <span>•</span>
          <span>{study.testingType}</span>
        </div>

        {/* Title */}
        <h3 className="text-sm sm:text-[15px] md:text-[17px] font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors leading-snug tracking-tight mb-2">
          {study.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-[13px] text-neutral-500 font-normal leading-relaxed line-clamp-3 mb-4">
          {study.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-400 mt-auto pt-2 border-t border-neutral-100 font-medium">
          <span>{study.date}</span>
          <span className="inline-flex items-center gap-1 text-neutral-600 group-hover:text-neutral-900 transition-colors font-semibold">
            Read Case Study
            <FaArrowRight className="size-2.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
