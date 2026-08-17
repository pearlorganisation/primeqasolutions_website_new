import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FaArrowLeft } from "react-icons/fa";
import {
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
} from "@/http/case-study";
import type { CaseStudyPageSection } from "@/types/case-study";
import { CaseStudySectionRenderer } from "../section-renderer";
import { BLOCKS } from "@/lib/utils/blocks";
import { CaseStudyLeadForm } from "./components/case-study-lead-form";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { generateCaseStudyJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { toSlugStaticParams } from "@/lib/utils/static-params";

const TOP_BLOCK_TYPES = [BLOCKS.CASE_STUDY_HERO, BLOCKS.CASE_STUDY_STATS];
const BODY_BLOCK_TYPES = [
  BLOCKS.CASE_STUDY_MAIN_CONTENT,
  BLOCKS.CASE_STUDY_TECH_STACK,
  BLOCKS.CASE_STUDY_TESTIMONIAL,
];

// ─── SSG ──────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return toSlugStaticParams(slugs);
}


// ─── SEO ──────────────────────────────────────────────────────────────────────

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getCaseStudyBySlug(slug);

  if (!doc) {
    return {
      title: "Case Study Not Found",
      robots: { index: false, follow: false },
    };
  }

  return mapStrapiSeoToMetadata(doc.meta_data, {
    defaultTitle: doc.name,
    defaultCanonical: `/case-study/${slug}`,
    defaultOpenGraphType: "article",
  });
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getCaseStudyBySlug(slug);

  if (!doc) notFound();

  const sections = (doc.page_section ?? []) as CaseStudyPageSection[];

  const topSections = sections.filter((s) => TOP_BLOCK_TYPES.includes(s.__component as any));
  const bodySections = sections.filter((s) => BODY_BLOCK_TYPES.includes(s.__component as any));

  return (
    <main className="bg-white min-h-screen">
      {/* ── JSON-LD Structured Data ── */}
      <JsonLd data={generateCaseStudyJsonLd(doc)} />

      {/* ── Top sections (Hero, Stats) ── */}
      <CaseStudySectionRenderer sections={topSections} allSections={sections} pageData={doc} />

      {/* ── Main Content Area with Sidebar ── */}
      {bodySections.length > 0 && (
        <article className="py-12 lg:py-20">
          <Container>
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
              {/* Main Content Column */}
              <div className="w-full lg:w-[70%]">
                <div className="flex flex-col divide-y divide-slate-100 [&>*:not(:first-child)]:pt-8 [&>*:not(:last-child)]:pb-8 ">
                  <CaseStudySectionRenderer sections={bodySections} allSections={sections} pageData={doc} />

                  {/* Back Navigation */}
                  <div>
                    <Link
                      href="/case-study"
                      className="group inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-[0.9375rem]"
                    >
                      <FaArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                      Back to All Case Studies
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar Column */}
              <aside className="w-full lg:w-[38%]">
                <div className="sticky top-34">
                  <CaseStudyLeadForm />
                  
                  {/* Optional: Add more sidebar widgets here (e.g., related case studies) */}
                </div>
              </aside>
            </div>
          </Container>
        </article>
      )}

      {/* If there are no body sections but we still want the back button */}
      {bodySections.length === 0 && (
        <Container className="py-12">
          <Link
            href="/case-study"
            className="group inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-semibold text-[0.9375rem]"
          >
            <FaArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            Back to All Case Studies
          </Link>
        </Container>
      )}
    </main>
  );
}
