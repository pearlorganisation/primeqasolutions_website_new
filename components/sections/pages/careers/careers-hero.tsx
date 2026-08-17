import { Section, Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaChevronRight } from "react-icons/fa";
import { STRAPI_URL } from "@/http/client";
import type { StrapiCareerHero } from "@/types/career";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── Props ────────────────────────────────────────────────────────────────────

interface CareersHeroProps {
  data?: StrapiCareerHero | null;
}

// ─── Fallback values ──────────────────────────────────────────────────────────

const FALLBACK = {
  title: "Shape the Future of\nQuality Assurance",
  description:
    "Join a dynamic, diverse team of innovators dedicated to pushing the boundaries of software testing and engineering. Discover your next big opportunity with us.",
  buttonLabel: "View Open Positions",
  buttonLink: "#openings",
  imageUrl: "/images/careers-hero.png",
  imageAlt: "Diverse software engineering team collaborating",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function CareersHero({ data }: CareersHeroProps) {
  const title = data?.title
    ? (typeof data.title === "string" ? data.title : extractText(data.title))
    : FALLBACK.title;

  const description = data?.description
    ? extractText(data.description)
    : FALLBACK.description;

  const buttonLabel = data?.primaryButton?.label ?? FALLBACK.buttonLabel;
  const buttonLink = data?.primaryButton?.link ?? FALLBACK.buttonLink;

  const imageUrl = data?.image?.url
    ? toAbsUrl(data.image.url)
    : FALLBACK.imageUrl;
  const imageAlt = data?.image?.alternativeText ?? FALLBACK.imageAlt;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: data?.label || "Careers" },
  ];

  return (
    <Section className="bg-[#F8F9FA] relative overflow-hidden !pt-8 lg:!pt-12 !pb-10 lg:!pb-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col items-start z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 flex-wrap text-sm font-medium">
                {breadcrumbs.map((crumb, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <li key={crumb.href ?? crumb.label} className="flex items-center gap-2">
                      {crumb.href && !isLast ? (
                        <Link
                          href={crumb.href}
                          className="text-slate-500 hover:text-blue-600 transition-colors duration-150"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className={isLast ? "text-slate-900" : "text-slate-400"}>
                          {crumb.label}
                        </span>
                      )}
                      {!isLast && <FaChevronRight className="size-3 text-slate-300 shrink-0" />}
                    </li>
                  );
                })}
              </ol>
            </nav>

            <h1 className="text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.05] mb-6 whitespace-pre-wrap">
              {title}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-md">
              {description}
            </p>

            <Link href={buttonLink}>
              <Button className="bg-[#0A0A0A]! hover:bg-[#0A0A0A]/90 text-white rounded-lg p-6 font-medium text-base group shadow-lg shadow-black/5">
                {buttonLabel}
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Right Visual */}
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[480px] lg:max-w-[580px] ml-auto mt-8 lg:mt-0 z-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 to-purple-100/40 rounded-3xl transform rotate-3 scale-105 -z-10" />
            <Image
              src={imageUrl}
              alt={imageAlt}
              height={480}
              width={580}
              className="object-cover size-full rounded-2xl shadow-xl border border-white/20"
              priority
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
