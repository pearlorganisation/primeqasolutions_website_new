import React from "react";
import Link from "next/link";
import { Section, Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import type { SectionHeroProps, BreadcrumbItem as BreadcrumbItemType } from "./types";
import { STRAPI_URL } from "@/http/client";
import { DynamicBreadcrumbs } from "@/components/ui/dynamic-breadcrumbs";

const toAbsUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};

const extractText = (content: any): string => {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((node) => {
        if (node.children) {
          return node.children.map((child: any) => child.text || "").join("");
        }
        return node.text || "";
      })
      .join("\n");
  }
  return "";
};

export function SectionHero({
  className,
  data,
  breadcrumbs: breadcrumbsProp,
  title: titleProp,
  description: descriptionProp,
  stats,
  rightSlot,
  children,
}: SectionHeroProps) {
  // ── Resolve title ────────────────────────────────────────────────────────
  // Direct prop (ReactNode) takes precedence
  const title: React.ReactNode =
    titleProp ??
    (data?.title ? extractText(data.title) : data?.heading || "");



  // ── Resolve description ──────────────────────────────────────────────────
  const description: string =
    descriptionProp ??
    (data?.description ? extractText(data.description) : "");

  // ── CTA buttons from data ────────────────────────────────────────────────
  const button = data?.button || data?.primaryButton;
  const rawButtonText = button?.label;
  const buttonText = rawButtonText?.replace(/->/g, "").replace(/→|&rarr;/g, "").trim() || "Learn More";
  const buttonLink = button?.link || button?.url || "/contact";
  const buttonNewTab = button?.openInNewTab || false;
  const showButton = !!rawButtonText;

  const secondaryButton = data?.secondaryButton;
  const secondaryButtonText = secondaryButton?.label?.replace(/->|→|&rarr;/g, '').trim() || "Contact Us";
  const secondaryButtonLink = secondaryButton?.link || secondaryButton?.url || "#";
  const secondaryButtonNewTab = secondaryButton?.openInNewTab || false;

  // ── Right-side visual from data ──────────────────────────────────────────
  const imageObj = data?.image;
  const imageUrl = imageObj
    ? toAbsUrl(imageObj.formats?.medium?.url || imageObj.url)
    : null;
  const videoUrl = data?.videoUrl || null;
  const hasVisual = !!(imageUrl || videoUrl || rightSlot);
  const hasMediaVisual = !!(imageUrl || videoUrl);

  return (
    <Section
      className={cn(
        "bg-section-bg relative overflow-hidden pt-8! lg:pt-16! pb-10! ",
        className
      )}
    >
      <Container>
        {/* Mobile/Tablet Breadcrumbs */}
        <div className="lg:hidden w-full">
          <DynamicBreadcrumbs breadcrumbsProp={breadcrumbsProp} />
        </div>

        <div
          className={cn(
            "grid grid-cols-1 gap-8 lg:gap-12 items-center",
            hasVisual ? "lg:grid-cols-2 lg:gap-8" : "lg:grid-cols-1"
          )}
        >
          {/* Left Content */}
          <div
            className={cn(
              "flex flex-col items-start w-full order-2 lg:order-1",
              !hasVisual && "max-w-3xl"
            )}
          >
            {/* Desktop Breadcrumb */}
            <div className="hidden lg:block w-full">
              <DynamicBreadcrumbs breadcrumbsProp={breadcrumbsProp} />
            </div>

            {/* Title */}
            {title && (
              <h1 className="text-3xl lg:text-[2.5rem] font-medium tracking-tight text-slate-900 leading-tight mb-4">
                {title}
              </h1>
            )}

            {/* Description */}
            {description && (
              <p className="text-base sm:text-lg text-neutral-500 leading-relaxed mb-6 max-w-2xl">
                {description}
              </p>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-4 flex items-center gap-8 flex-wrap mb-6">
                {stats.map(({ value, label }, i) => (
                  <React.Fragment key={label}>
                    {i > 0 && (
                      <div className="h-8 w-px bg-slate-200 hidden sm:block" />
                    )}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-2xl font-semibold text-slate-900 tabular-nums">
                        {value}
                      </span>
                      <span className="text-[0.8125rem] md:text-sm text-neutral-500 font-normal">
                        {label}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* CTA Buttons (from data) */}
            {(showButton || secondaryButton) && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                {showButton && (
                  <Link
                    href={buttonLink}
                    target={buttonNewTab ? "_blank" : undefined}
                    rel={buttonNewTab ? "noopener noreferrer" : undefined}
                    className="w-full sm:w-auto"
                  >
                    <Button className="bg-[#0A0A0A]! hover:bg-[#0A0A0A]/90 text-white rounded-lg h-11 w-full sm:w-auto px-6 font-semibold text-sm group shadow-sm flex items-center justify-center">
                      {buttonText}
                    </Button>
                  </Link>
                )}
                {secondaryButton && (
                  <Link
                    href={secondaryButtonLink}
                    target={secondaryButtonNewTab ? "_blank" : undefined}
                    rel={secondaryButtonNewTab ? "noopener noreferrer" : undefined}
                    className="w-full sm:w-auto"
                  >
                    <Button variant="outline" className="border-neutral-200 text-neutral-800 shadow-xs! hover:bg-neutral-100 rounded-lg h-11 w-full sm:w-auto px-6 font-semibold text-sm flex items-center justify-center">
                      {secondaryButtonText}
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* Custom Children (e.g., Buttons, CTAs) */}
            {children && <div className="mt-2 w-full">{children}</div>}
          </div>

          {/* Right Visual — from data (image/video) or rightSlot prop */}
          {hasVisual && (
            <div className="relative w-full lg:max-w-[500px] ml-auto lg:mt-0 z-10 flex items-center justify-center order-1 lg:order-2">
              {rightSlot ? (
                rightSlot
              ) : videoUrl ? (
                <video
                  src={videoUrl}
                  aria-label={typeof title === "string" ? title : "Section video"}
                  className="w-full h-auto rounded-2xl shadow-md"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : hasMediaVisual ? (
                <Image
                unoptimized
                  src={imageUrl!}
                  alt={typeof title === "string" ? title : ""}
                  width={800}
                  height={600}
                  fetchPriority="high"
                  className="w-full h-auto rounded-2xl shadow-md"
                  priority={true}
                />
              ) : null}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

// Keep backward-compatible named exports
export { SectionHero as HireHero };
export default SectionHero;
