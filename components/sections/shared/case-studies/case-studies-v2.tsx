import Link from "next/link";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { FaArrowRight } from "react-icons/fa";
import { H3, P } from "@/components/ui/typography";
import type { CaseStudy, CaseStudiesProps } from "./case-studies";

// ─── Industry accent colours ──────────────────────────────────────────────────
const INDUSTRY_ACCENT: Record<string, string> = {
  fintech: "text-blue-600    bg-blue-50     border-blue-100",
  healthcare: "text-violet-600  bg-violet-50   border-violet-100",
  "e-commerce": "text-emerald-600 bg-emerald-50  border-emerald-100",
  ecommerce: "text-emerald-600 bg-emerald-50  border-emerald-100",
  saas: "text-orange-600  bg-orange-50   border-orange-100",
  "supply chain": "text-cyan-600    bg-cyan-50     border-cyan-100",
};

function industryAccent(industry: string) {
  return INDUSTRY_ACCENT[industry.toLowerCase()] ?? "text-primary bg-primary/5 border-primary/10";
}

// ─── Case-study card V2 ────────────────────────────────────────────────────────
function CaseCardV2({ cs }: { cs: CaseStudy }) {
  const accent = industryAccent(cs.industry);

  return (
    <div className="group flex flex-col rounded-2xl border border-slate-200 bg-white  transition-colors duration-200 hover:border-primary/30 h-full">
      {cs.image && (
        <div className="mb-6 relative overflow-hidden rounded-t-xl aspect-video bg-slate-50 flex-shrink-0">
          <Image
            src={cs.image}
            alt={cs.imageAlt || cs.title}
            fill
            className="object-cover "
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      {/* Industry tag */}
      <div className="p-6 pt-0">

        <span
          className={`inline-flex max-w-fit items-center rounded-full border px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] mb-4 ${accent}`}
        >
          {cs.industry}
        </span>

        {/* Title */}
        <H3 className="font-semibold line-clamp-2 mb-2 leading-snug">
          {cs.title}
        </H3>
        {/* Description */}
        <P className="mb-4 text-foreground/70 flex-1">{cs.description}</P>

        {/* CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <Link
            href={cs.href}
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-bold text-primary"
          >
            Read Case Study
            <FaArrowRight className="size-2.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}

// ─── Section Export ─────────────────────────────────────────────────────────────
export function CaseStudiesV2({
  badge,
  heading,
  headingHighlight,
  subtext,
  cases,
}: CaseStudiesProps) {
  const visibleCases = cases.slice(0, 3);

  return (
    <Section className="py-24 lg:py-32">
      <Container>
        {/* Centered header */}
        <SectionHeaderResolver 
          align="center"
          badge={badge}
          title={heading}
          titleHighlight={headingHighlight}
          description={subtext}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCases.map((cs) => (
            <CaseCardV2 key={cs.href} cs={cs} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
