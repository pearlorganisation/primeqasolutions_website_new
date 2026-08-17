import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { FaArrowRight } from "react-icons/fa";
import { H3, P } from "@/components/ui/typography";
import { cn } from "@/lib/utils/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CaseStudyMetric {
  /** e.g. "40%", "99.9%", "<1ms" */
  value: string;
  /** e.g. "Latency Reduction", "Reliability" */
  label: string;
}

export interface CaseStudy {
  industry: string;
  company: string;
  title: string;
  description: string;
  /** Between 1 and 4 metrics shown in the 2×2 grid (used in v1) */
  metrics?: CaseStudyMetric[];
  href: string;
  image?: string;
  imageAlt?: string;
}

export interface CaseStudiesProps {
  badge?: string;
  heading?: string;
  headingHighlight?: string;
  subtext?: string;
  cases: CaseStudy[];
}

// ─── Industry accent colours ──────────────────────────────────────────────────
type IndustryPalette = {
  container: string;
  text: string;
  gradient: string;
  icon: string;
  hoverBorder: string;
};

const PALETTE: IndustryPalette[] = [
  { // Blue
    container: "bg-blue-500/8 border-blue-500/15 border",
    text: "text-blue-600",
    gradient: "from-blue-500 to-cyan-400",
    icon: "text-blue-600 hover:text-blue-700",
    hoverBorder: "hover:border-grey-400/30",
  },
  { // Violet
    container: "bg-violet-500/8 border-violet-500/15 border",
    text: "text-violet-600",
    gradient: "from-violet-500 to-purple-400",
    icon: "text-violet-600 hover:text-violet-700",
    hoverBorder: "hover:border-grey-400/30",
  },
  { // Emerald
    container: "bg-emerald-500/8 border-emerald-500/15 border",
    text: "text-emerald-600",
    gradient: "from-emerald-500 to-teal-400",
    icon: "text-emerald-600 hover:text-emerald-700",
    hoverBorder: "hover:border-grey-400/30",
  },
  { // Orange
    container: "bg-orange-500/8 border-orange-500/15 border",
    text: "text-orange-600",
    gradient: "from-orange-500 to-amber-400",
    icon: "text-orange-600 hover:text-orange-700",
    hoverBorder: "hover:border-grey-400/30",
  },
  { // Pink
    container: "bg-pink-500/8 border-pink-500/15 border",
    text: "text-pink-600",
    gradient: "from-pink-500 to-rose-400",
    icon: "text-pink-600 hover:text-pink-700",
    hoverBorder: "hover:border-grey-400/30",
  },
  { // Teal
    container: "bg-teal-500/8 border-teal-500/15 border",
    text: "text-teal-600",
    gradient: "from-teal-500 to-emerald-400",
    icon: "text-teal-600 hover:text-teal-700",
    hoverBorder: "hover:border-grey-400/30",
  },
  { // Red
    container: "bg-red-500/8 border-red-500/15 border",
    text: "text-red-600",
    gradient: "from-red-500 to-orange-400",
    icon: "text-red-600 hover:text-red-700",
    hoverBorder: "hover:border-red-grey/30",
  },
  { // Cyan
    container: "bg-cyan-500/8 border-cyan-500/15 border",
    text: "text-cyan-600",
    gradient: "from-cyan-500 to-blue-400",
    icon: "text-cyan-600 hover:text-cyan-700",
    hoverBorder: "hover:border-grey-400/30",
  },
  { // Indigo
    container: "bg-indigo-500/8 border-indigo-500/15 border",
    text: "text-indigo-600",
    gradient: "from-indigo-500 to-blue-400",
    icon: "text-indigo-600 hover:text-indigo-700",
    hoverBorder: "hover:border-grey-400/30",
  },
  { // Yellow
    container: "bg-yellow-500/8 border-yellow-500/15 border",
    text: "text-yellow-600",
    gradient: "from-yellow-500 to-amber-400",
    icon: "text-yellow-600 hover:text-yellow-700",
    hoverBorder: "hover:border-grey-400/30",
  },
];

function industryAccent(industry: string): IndustryPalette {
  if (!industry) return PALETTE[0];

  const normalized = industry.toLowerCase().replace(/[^a-z]/g, "");

  if (normalized.includes("fintech") || normalized.includes("finance")) return PALETTE[0]; // Blue
  if (normalized.includes("health")) return PALETTE[1]; // Violet
  if (normalized.includes("ecommerce") || normalized.includes("retail")) return PALETTE[2]; // Emerald
  if (normalized.includes("saas") || normalized.includes("software")) return PALETTE[3]; // Orange
  if (normalized.includes("insurance") || normalized.includes("underwriting")) return PALETTE[4]; // Pink
  if (normalized.includes("business") || normalized.includes("consulting")) return PALETTE[8]; // Indigo
  if (normalized.includes("supplychain") || normalized.includes("logistics")) return PALETTE[7]; // Cyan

  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTE.length;
  return PALETTE[index];
}

// ─── Single metric box ────────────────────────────────────────────────────────
function MetricBox({ metric, accentColorClass }: { metric: CaseStudyMetric; accentColorClass?: string }) {
  return (
    <div className="flex flex-col justify-start gap-1 p-1">
      <p className={cn("text-xl sm:text-2xl font-medium leading-none", accentColorClass || "text-neutral-900")}>
        {metric.value}
      </p>

      <p className="text-[0.625rem] font-medium uppercase tracking-[0.06em] text-neutral-400 leading-normal line-clamp-2 text-balance">
        {metric.label}
      </p>
    </div>
  );
}

// ─── Metrics grid — always 2×2 ────────────────────────────────────────────────
function MetricsGrid({ metrics, accentColorClass }: { metrics: CaseStudy["metrics"]; accentColorClass?: string }) {
  if (!metrics || metrics.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-4">
      {metrics.map((m) => (
        <MetricBox key={m.label} metric={m} accentColorClass={accentColorClass} />
      ))}
    </div>
  );
}

// ─── Case-study card ──────────────────────────────────────────────────────────
function CaseCard({ cs }: { cs: CaseStudy }) {
  const accent = industryAccent(cs.industry);

  return (
    <div className={`group relative flex flex-col rounded-xl border border-neutral-200/60 bg-white transition-all duration-300 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)] ${accent.hoverBorder} h-full overflow-hidden`}>
      {/* Subtle internal gradient tint */}

      <div className="h-2 w-full bg-secondary" />

      <div className="relative z-10 flex flex-col h-full p-5 md:p-7">
        {/* Industry tag */}
        <div
          className={`inline-flex max-w-fit items-center rounded-md px-2.5 py-1 mb-3 md:mb-4 ${accent.container} border-none`}
        >
          <span className={`text-[0.625rem] font-sans font-semibold uppercase tracking-[0.14em] ${accent.text}`}>
            {cs.industry}
          </span>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Title */}
          <H3 className="mb-2 md:mb-3 leading-[1.3] line-clamp-2 text-neutral-900">
            {cs.title}
          </H3>

          {/* Description
          <P className="text-neutral-500 leading-relaxed line-clamp-3 mb-4 md:mb-6">
            {cs.description}
          </P> */}
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-100 mb-4 md:mb-6" />

        {/* Metrics */}
        <MetricsGrid metrics={cs.metrics} accentColorClass={accent.text} />

        {/* CTA */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-5 border-t border-neutral-100">
          <Link
            href={cs.href}
            className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${accent.icon}`}
          >
            Read Case Study
            <FaArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────
export function CaseStudiesV1({
  badge,
  heading,
  headingHighlight,
  subtext,
  cases,
}: CaseStudiesProps) {
  const visibleCases = cases.slice(0, 3);

  return (
    <Section className="py-10! md:py-20! lg:py-24!">
      <Container>
        {/* Centered header */}
        <SectionHeaderResolver
          align="center"
          badge={badge}
          title={heading}
          titleHighlight={headingHighlight}
          description={subtext}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleCases.map((cs) => (
            <CaseCard key={cs.href} cs={cs} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
