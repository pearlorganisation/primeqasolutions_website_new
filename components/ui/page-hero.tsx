import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";
import { FaChevronRight } from "react-icons/fa";
import {Container } from './container'
// ─── Types ─────────────────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeroStat {
  value: string;
  label: string;
}

export interface PageHeroProps {
  /** Breadcrumb trail e.g. [{label:"Home",href:"/"},{label:"Blog"}] */
  breadcrumbs?: BreadcrumbItem[];
  /** Main page title — supports a React node so you can bold/color specific words */
  title: React.ReactNode;
  /** Subtitle / description paragraph */
  description?: string;
  /** Optional stat pills shown below the description */
  stats?: PageHeroStat[];
  /** Optional slot rendered to the right of the text content (decorative, desktop only) */
  rightSlot?: React.ReactNode;
  className?: string;
  /** Optional children rendered below the description/stats (useful for buttons/CTAs) */
  children?: React.ReactNode;
}

// ─── PageHero component ────────────────────────────────────────────────────────
export function PageHero({
  breadcrumbs,
  title,
  description,
  stats,
  rightSlot,
  className,
  children,
}: PageHeroProps) {



  
  return (
    <section
      className={cn(
        "relative  bg-section-bg pt-14 lg:pt-20 pb-16 lg:pb-24 overflow-hidden",
        className
      )}
    >
      {/* <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-[500px] rounded-full bg-primary/5 blur-[80px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/4 h-[300px] w-[600px] rounded-full bg-primary/5 blur-[60px]"
      /> */}

      {/* ── Content ── */}
      <Container className="relative z-10 mx-auto w-full">
        <div className={cn(
          "flex flex-col lg:flex-row lg:items-center gap-10",
          rightSlot ? "lg:justify-between" : "lg:justify-start"
        )}>
          {/* Left: text block */}
          <div className={cn(
            "flex flex-col",
            rightSlot ? "lg:w-1/2 xl:w-5/12 max-w-2xl" : "max-w-3xl"
          )}>
            {/* Breadcrumb */}
            {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 flex-wrap text-sm font-medium">
                  {breadcrumbs.map((crumb, i) => {
                    const isLast = i === breadcrumbs.length - 1;
                    return (
                      <li key={crumb.href ?? crumb.label} className="flex items-center gap-2">
                        {crumb.href && !isLast ? (
                          <Link
                            href={crumb.href}
                            className="text-slate-500 hover:text-primary transition-colors duration-150"
                          >
                            {crumb.label}
                          </Link>
                        ) : (
                          <span
                            className={cn(
                              isLast ? "text-slate-900" : "text-slate-400"
                            )}
                          >
                            {crumb.label}
                          </span>
                        )}
                        {!isLast && (
                          <FaChevronRight className="size-3 text-slate-300 shrink-0" />
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}

            {/* Title, Description, and Buttons Grouping */}
            <div className="flex flex-col gap-10">
              {/* Title */}
              <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold  tracking-tight leading-[1.15] text-slate-900">
                {title}
              </h1>

              {/* Description */}
              {description && (
                <p className="text-lg  text-neutral-500 leading-relaxed max-w-2xl">
                  {description}
                </p>
              )}
              </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-8 flex items-center gap-8 flex-wrap">
                {stats.map(({ value, label }, i) => (
                  <React.Fragment key={label}>
                    {i > 0 && (
                      <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                    )}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                        {value}
                      </span>
                      <span className="text-[0.8125rem] text-slate-400 font-medium">
                        {label}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Custom Children (e.g., Buttons) */}
            {children && <div className="mt-2">{children}</div>}
            </div>
          </div>

          {/* Right: optional decorative slot */}
          {rightSlot && (
            <div className="w-full lg:w-1/2 xl:w-7/12 flex justify-center lg:justify-end mt-8 lg:mt-0 relative z-10">
              <div className="w-full max-w-2xl lg:max-w-none flex justify-center lg:justify-end">
                {rightSlot}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Bottom Gradient Transition */}
      {/* <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-slate-50 to-transparent pointer-events-none" /> */}
    </section>
  );
}
