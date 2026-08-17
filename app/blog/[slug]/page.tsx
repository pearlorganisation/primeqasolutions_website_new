import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getAdjacentBlogPosts,
} from "@/http/blog";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { generateBlogJsonLd } from "@/lib/utils/jsonld";
import { TableOfContents } from "@/components/ui/table-of-contents";
import {
  FaArrowLeft,

  FaClock,
  FaCalendarAlt,
  FaArrowRight,
  FaTag,
  FaChevronRight,
} from "react-icons/fa";
import { Summerize } from "./components/summerize";
import { FaqSection } from "@/components/sections/shared/faq/faq-section-v2";
import { H1 } from "@/components/ui/typography";
import { JsonLd } from "@/components/seo/json-ld";
import { toSlugStaticParams } from "@/lib/utils/static-params";

// ─── Static generation (SSG) ───────────────────────────────────────────────────
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return toSlugStaticParams(slugs);
}

// ─── ISR — revalidate every 60 seconds ─────────────────────────────────────────

// ─── Dynamic SEO metadata ──────────────────────────────────────────────────────
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return { title: "Article not found" };

  const seo = post.seo;
  const metadata = mapStrapiSeoToMetadata(seo);

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.published,
      authors: [post.author.name],
    },
  };
}

// ─── TOC & Sidebar Handlers ──────────────────────────────────────────────────

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const { prev: prevPost, next: nextPost } = await getAdjacentBlogPosts(slug);

  const headings: { text: string; id: string; active?: boolean }[] = [];
  if (post.content) {
    // Match ## at the start of the line
    const rx = /^##\s+(.+)$/gm;
    let match;
    while ((match = rx.exec(post.content)) !== null) {
      let rawText = match[1].trim();
      
      // Clean up text: Strip trailing # characters if they exist
      rawText = rawText.replace(/\s*#+\s*$/, "");
      
      // Clean up text: Remove markdown links [Text](url) -> Text
      rawText = rawText.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      
      // Clean up text: Remove bold/italic formatting
      const cleanText = rawText.replace(/[*_~`]/g, "");

      if (cleanText) {
        let baseId = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        let uniqueId = baseId;
        let count = 1;
        while (headings.some(h => h.id === uniqueId)) {
          uniqueId = `${baseId}-${count}`;
          count++;
        }
        headings.push({
          text: cleanText,
          id: uniqueId,
        });
      }
    }
    if (headings.length > 0) headings[0].active = true;
  }

  // ── Generate structured data ──
  const jsonLd = generateBlogJsonLd(post);

  const faqItems = (post.faqs ?? []).map((faq) => ({
    question: faq.question,
    answer:
      typeof faq.answer === "string" || Array.isArray(faq.answer)
        ? faq.answer
        : String(faq.answer ?? ""),
  }));

  return (
    <main className="bg-white">
      {/* ── JSON-LD Structured Data for SEO ── */}
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <section className="pb-8 pt-10">
        <Container className="max-sm:px-4 ">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-[0.8125rem] font-medium text-foreground/50">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                          <FaChevronRight className="size-2.5 text-neutral-300 shrink-0" />
                {/* <span className="text-foreground/30 mx-1">/</span> */}
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                          <FaChevronRight className="size-2.5 text-neutral-300 shrink-0" />
                {/* <span className="text-foreground/30 mx-1">/</span> */}
              </li>
              <li>
                <span className="text-foreground/90 truncate max-w-[200px] sm:max-w-[350px] inline-block align-bottom">{post.title}</span>
              </li>
            </ol>
          </nav>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex rounded-lg bg-neutral-100 border border-neutral-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neutral-800">
              {post.category}
            </span>

            {post.published && (
              <span className="flex items-center gap-1.5 text-base text-foreground/40" title="Publish Date">
                <FaCalendarAlt className="size-3.5" /> {post.published}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-base text-foreground/40">
              <FaClock className="size-3.5" /> {post.readTime}
            </span>
          </div>

          {/* Title */}
          <H1 className="font-semibold! text-3xl sm:text-4xl text-neutral-900 max-w-10/12 leading-tight tracking-tight">{post.title}</H1>
          {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight font-space max-w-10/12 mb-6">
            {post.title}
          </h1> */}

          {/* Excerpt */}
          <p className="text-[16px] text-foreground/60 leading-relaxed max-w-3xl mb-10">
            {post.excerpt}
          </p>

          {/* Summarize With Section */}
          {/* Summarize With Section */}
        <Summerize/>

          <hr className="border-t border-neutral-200/50 mb-8" />

          {/* Author row & Social Handle */}
          <div className="flex items-center justify-between gap-6 flex-wrap pb-8">
            <div className="flex items-center gap-4">
              {post.author?.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={52}
                  height={52}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex size-[52px] items-center justify-center rounded-full bg-neutral-100 text-neutral-500 font-bold text-lg">
                  {post.author?.name?.charAt(0) || "A"}
                </div>
              )}
              <div className="flex flex-col">
                <p className="text-[1.0625rem] font-bold text-[#1e293b] leading-tight">
                  {post.author.name}
                </p>
                <p className="text-[0.875rem] text-neutral-400 mt-1 font-medium">
                  {post.author.jobTitle}
                </p>
              </div>
            </div>

            {/* Author Social Handles */}
            {post.author.socials.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-[0.875rem] text-neutral-400 font-medium mr-2">
                  Follow:
                </span>
                {post.author.socials.map((social, idx) => (
                  <a
                    key={`${social.platform}-${social.url}-${idx}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="flex size-10.5 items-center justify-center rounded-full border border-neutral-100 bg-white text-neutral-400 hover:text-neutral-800 hover:shadow-xs hover:border-neutral-200/80 transition-all duration-150 overflow-hidden"
                  >
                    {social.icon ? (
                      <Image
                        src={social.icon}
                        alt={social.platform}
                        width={18}
                        height={18}
                        className="opacity-60 hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <span className="text-xs font-bold">{social.platform.charAt(0)}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <hr className="border-t border-neutral-200/50 mb-[-1.5rem]" />
        </Container>
      </section>

      {/* ── Article body + sidebar ── */}
      <section className="py-16 lg:py-20">
        <Container className="max-sm:px-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-12 xl:gap-16 items-start">
            {/* ── Article body ── */}
            <article className="min-w-0 max-w-full">
              {/* Render rich-text content as structured markdown */}
              {post.content && (
                <MarkdownRenderer content={post.content} />
              )}

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-neutral-200/50">
                  <span className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-foreground/40 mr-1">
                    <FaTag className="size-3" /> Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-200 px-4 py-1.5 text-[0.8125rem] font-medium text-foreground/50 hover:border-primary/30 hover:text-primary cursor-pointer transition-colors duration-150"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Previous / Next Article Navigation */}
              <div className="mt-16 flex items-center justify-between border-t border-neutral-200/50 pt-6 pb-4">
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className="flex items-center gap-2 text-neutral-500 hover:text-primary transition-colors font-semibold text-[0.9375rem] group">
                    <FaArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" /> Previous Article
                  </Link>
                ) : <div />}
                
                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className="flex items-center gap-2 text-neutral-500 hover:text-primary transition-colors font-semibold text-[0.9375rem] group">
                    Next Article <FaArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                ) : <div />}
              </div>
            </article>

            {/* ── Sticky Sidebar ── */}
            <aside className="hidden lg:flex flex-col gap-6 sticky top-24">
              {/* CTA Card */}
              <div className="relative mt-2 overflow-hidden rounded-xl bg-neutral-900 p-7 py-10 text-white shadow-sm shadow-neutral-950/20">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-white/5 blur-2xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-14 -left-14 size-36 rounded-full bg-white/5 blur-2xl"
                />
                <div className="relative z-10">
                  {/* <span className="mb-4 inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-white/90">
                    <span className="h-px w-6 bg-white/90" />
                    Expert QA Support
                  </span> */}
                  <h2 className="mb-3 font-space text-[1.5rem] font-bold leading-tight tracking-tight">
                    Elevate Your QA
                  </h2>
                  <p className="mb-6 text-[0.875rem] font-medium leading-relaxed text-white/90">
                  Integrate AI-driven testing into your pipeline and catch bugs before they reach production.
                  </p>
                  <Button asChild className="w-full bg-white! text-neutral-900! hover:bg-neutral-100! font-semibold" >
                    <Link href="/contact-us">
                      Book a Consultation
                    </Link>
                  </Button>
                </div>
              </div>
              {/* Table of Contents */}
              <TableOfContents headings={headings} />

              
            </aside>
          </div>
        </Container>
      </section>

      {/* ── FAQ Section ── */}
      {post.faqs && post.faqs.length > 0 && (
        <FaqSection 
          items={faqItems} 
          title="Frequently Asked Questions" 
        />
      )}
    </main>
  );
}
