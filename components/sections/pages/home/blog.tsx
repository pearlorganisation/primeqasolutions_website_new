import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionBadge } from "@/components/ui/section-badge";
import { FaArrowRight } from "react-icons/fa";
import { getAllBlogPosts } from "@/http/blog";
import { BlogCard } from "@/components/ui/blog-card";



// ─── Blog Section ──────────────────────────────────────────────────────────────
export async function Blog() {
  const allPosts = await getAllBlogPosts();
  const posts = allPosts.slice(0, 3); // Minimalistic 3-card layout

  return (
    <Section >
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div className="flex flex-col max-w-xl">
            <SectionBadge label="Insights & Resources" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              From Our <span className="text-primary">QA Blog</span>
            </h2>
            <p className="text-foreground/60 leading-relaxed text-lg">
              Expert perspectives on AI testing, automation strategy, and software quality, written by practitioners, for practitioners.
            </p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 h-11 text-[0.875rem] font-semibold text-foreground hover:border-primary/30 hover:text-primary transition-all duration-300 self-start sm:self-auto"
          >
            All articles <FaArrowRight className="size-3" />
          </Link>
        </div>

        {/* Regular 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
