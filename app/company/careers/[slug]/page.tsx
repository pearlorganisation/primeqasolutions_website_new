/**
 * Job Detail Page — Dynamic (SSG + ISR)
 * ──────────────────────────────────────
 * Fetches individual job listing from Strapi by slug.
 * Pre-generates all known slugs at build time via generateStaticParams.
 * ISR revalidates every 60 seconds.
 *
 * Features:
 *  • Per-job SEO metadata via mapStrapiSeoToMetadata
 *  • Rich-text job content rendered via ReactMarkdown
 *  • Application form at the bottom
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getJobBySlug, getAllJobSlugs } from "@/http/career";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { Section, Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Briefcase } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ApplyForm } from "@/components/sections/pages/careers/apply-form";
import { generateJobPostingJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { toSlugStaticParams } from "@/lib/utils/static-params";

// ─── ISR Config ───────────────────────────────────────────────────────────────


// ─── Types ────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ slug: string }>;
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return {
      title: "Job Not Found | PrimeQA Careers",
    };
  }

  return mapStrapiSeoToMetadata(job.meta_data, {
    defaultTitle: `${job.title} | Careers | PrimeQA`,
    defaultDescription: job.short_description || `Apply for the ${job.title} position at PrimeQA.`,
    defaultCanonical: `/company/careers/${job.slug}`,
  });
}

// ─── Static Params (SSG) ──────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllJobSlugs();
  return toSlugStaticParams(slugs);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function JobDetailsPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-20">
      {/* JSON-LD Structured Data for Google Job Search */}
      <JsonLd data={generateJobPostingJsonLd(job)} />

      {/* Header Section */}
      <Section className="py-12! ">
        <Container className="md:max-w-6xl mx-auto">
          <Link 
            href="/company/careers" 
            className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-8"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Careers
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-md mb-4">
                {job.role}
              </div>
              <h1 className="text-3xl md:text-4xl font-medium text-neutral-900 mb-6 leading-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-neutral-600 font-medium">
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-neutral-400" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-neutral-400" />
                  {job.job_type}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="size-5 text-neutral-400" />
                  {job.role}
                </div>
              </div>
            </div>
            
            <div className="shrink-0 mt-4 md:mt-0">
              <Link href="#apply-form">
                <Button size="lg" className="w-full md:w-auto">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Content Section */}
      <Section className="!py-12">
        <Container className="max-w-5xl mx-auto">
          <div className="prose prose-neutral prose-lg max-w-none prose-headings:font-medium prose-a:text-neutral-900 prose-a:underline hover:prose-a:text-neutral-600 prose-img:rounded-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {job.Content}
            </ReactMarkdown>
          </div>
          
          <div id="apply-form" className="mt-20 pt-16 border-t border-neutral-200">
            <div className="mb-8">
              <h3 className="text-4xl font-medium text-neutral-900 mb-2">Apply for this position</h3>
              <p className="text-lg text-neutral-600">Please fill out the form below to submit your application.</p>
            </div>
            
            <ApplyForm />
          </div>
        </Container>
      </Section>
    </main>
  );
}
