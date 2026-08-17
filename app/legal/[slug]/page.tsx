import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  getAllLegalSlugs,
  getLegalPageBySlug,
} from "@/http/legal";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { FaChevronRight, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
import { generateLegalJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { toSlugStaticParams } from "@/lib/utils/static-params";

export async function generateStaticParams() {
  const slugs = await getAllLegalSlugs();
  return toSlugStaticParams(slugs);
}


type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) return { title: "Page not found" };

  return {
    title: `${page.name} | PrimeQA`,
    description: `Read our ${page.name}.`,
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);

  if (!page) notFound();

  // Extract headings for Table of Contents
  const headings: { text: string; id: string; active?: boolean }[] = [];
  if (page.content) {
    const rx = /^#{2,3}\s+(.+)$/gm;
    let match;
    while ((match = rx.exec(page.content)) !== null) {
      let rawText = match[1].trim();
      rawText = rawText.replace(/\s*#+\s*$/, "");
      rawText = rawText.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      const cleanText = rawText.replace(/[*_~`]/g, "");

      if (cleanText) {
        headings.push({
          text: cleanText,
          id: cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        });
      }
    }
    if (headings.length > 0) headings[0].active = true;
  }

  const formattedDate = page.publishAt
    ? new Date(page.publishAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* ── JSON-LD Structured Data ── */}
      <JsonLd data={generateLegalJsonLd(page)} />

      {/* ── Header ── */}
      <section className="bg-white border-b border-slate-200 pb-12 pt-16 lg:pt-20 lg:pb-16">
        <Container>
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[0.8125rem] font-medium text-slate-500">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                </li>
                <li>
                  <FaChevronRight className="size-2.5 text-slate-300 shrink-0" />
                </li>
                <li>
                  <span className="text-slate-900">{page.name}</span>
                </li>
              </ol>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight font-space mb-6">
              {page.name}
            </h1>

            {formattedDate && (
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <FaCalendarAlt className="size-4 text-slate-400" />
                <span>Last updated: {formattedDate}</span>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ── Content Body ── */}
      <section className="py-12 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-12 xl:gap-16 items-start">
            {/* Main Content */}
            <article className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
              {page.content ? (
                <div className="prose prose-slate prose-lg max-w-none prose-headings:font-space prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-a:no-underline">
                  <MarkdownRenderer content={page.content} />
                </div>
              ) : (
                <p className="text-slate-500 italic text-center py-10">Content is currently unavailable.</p>
              )}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col gap-6 sticky top-24">
              {headings.length > 0 && <TableOfContents headings={headings} />}

              {/* Support Card */}
              <div className="rounded-2xl p-8 bg-slate-900 text-white shadow-lg text-center border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="flex justify-center mb-4">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                    <FaEnvelope className="size-5" />
                  </div>
                </div>
                <h4 className="text-[1.25rem] font-bold font-space tracking-tight mb-2">Need Clarity?</h4>
                <p className="text-slate-400 text-[0.875rem] leading-relaxed mb-6 font-medium">
                  If you have questions about our {page.name.toLowerCase()}, reach out to our legal team.
                </p>
                <Link href="/contact" className="inline-flex w-full items-center justify-center bg-primary text-white hover:bg-primary/90 font-semibold text-[0.9375rem] rounded-xl px-4 py-3 transition-colors shadow-sm">
                  Contact Support
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </main>
  );
}

