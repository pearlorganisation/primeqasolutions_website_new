"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/ui/blog-card";
import {
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";

const ALL = "All Articles";

// ─── Post card ────────────────────────────────────────────────────────────────





// ─── Blog Listing (Client) ────────────────────────────────────────────────────

interface BlogListingClientProps {
  /** Server-fetched blog posts passed as props (SSG/ISR data) */
  posts: BlogPost[];
  /** Category → count map computed server-side */
  categoryCounts: Record<string, number>;
}

/**
 * Client-side interactive wrapper that receives pre-fetched blog posts
 * and adds search + category filtering.
 */
export function BlogListingClient({
  posts,
  categoryCounts,
}: BlogListingClientProps) {
  const [active, setActive] = useState(ALL);
  const [query, setQuery] = useState("");
  const [showAllCats, setShowAllCats] = useState(false);
  const [isPending, startTransition] = useTransition();
  const POSTS_PER_PAGE = 15;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const setCurrentPage = (page: number | ((prev: number) => number)) => {
    const newPage = typeof page === "function" ? page(currentPage) : page;
    const params = new URLSearchParams(searchParams.toString());
    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  // Ordered sidebar categories derived from category counts
  const sidebarCategories = useMemo(() => {
    const cats = Object.keys(categoryCounts).filter((c) => c !== ALL);
    cats.sort((a, b) => (categoryCounts[b] ?? 0) - (categoryCounts[a] ?? 0));
    return [ALL, ...cats];
  }, [categoryCounts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (active !== ALL && p.category !== active) return false;
      if (
        q !== "" &&
        !p.title.toLowerCase().includes(q) &&
        !p.category.toLowerCase().includes(q) &&
        !p.excerpt.toLowerCase().includes(q)
      ) return false;
      return true;
    });
  }, [posts, active, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const visiblePage = Math.min(currentPage, totalPages);
  const paginatedPosts = useMemo(() => {
    const start = (visiblePage - 1) * POSTS_PER_PAGE;
    return filtered.slice(start, start + POSTS_PER_PAGE);
  }, [filtered, visiblePage]);

  return (
    <div className="flex flex-col gap-4">
      {/* ─── Header Section: Search & Categories ─────────────────────────── */}
      <div className="flex flex-col gap-5 pb-4 pt-2 border-b border-neutral-200/60">
        {/* Search Row */}
        <div className="flex items-center w-full">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
            <input
              aria-label="Search articles"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (currentPage !== 1) {
                  setCurrentPage(1);
                }
              }}
              placeholder="Search articles, topics, guides..."
              className="h-[32px] w-full rounded-md border border-neutral-200 bg-white pl-9 pr-3 text-[12px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 transition-all hover:bg-neutral-50/50"
            />
          </div>
        </div>

        {/* Categories Row */}
        <div className="flex items-start gap-3 w-full">
          <div
            className={`flex flex-wrap items-center gap-2.5 flex-1 py-1 -my-1 ${
              showAllCats ? "" : "max-h-[46px] overflow-hidden"
            }`}
          >
            {sidebarCategories.flatMap((cat) => {
              if (categoryCounts[cat] === undefined && cat !== ALL) return [];
              return [(() => {
                const isActive = active === cat;
                return (
                  <button type="button"
                    key={cat}
                    onClick={() => {
                      setActive(cat);
                      if (currentPage !== 1) {
                        setCurrentPage(1);
                      }
                    }}
                    className={`group cursor-pointer relative inline-flex items-center justify-center h-[32px] rounded-md px-4 text-[12px] font-semibold whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "bg-neutral-900 text-white shadow-neutral-900/10"
                        : "bg-white text-neutral-500 ring-[1px] ring-inset ring-neutral-200/70 hover:bg-neutral-50 hover:text-neutral-900 hover:ring-neutral-200"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })()];
            })}
          </div>
          {sidebarCategories.length > 3 && (
            <button type="button"
              aria-label={showAllCats ? "Show fewer categories" : "Show all categories"}
              onClick={() => setShowAllCats(!showAllCats)}
              className="inline-flex items-center justify-center h-[32px] px-3 text-[11px] font-bold tracking-wider 
              cursor-pointer transition-all duration-300 text-neutral-500 hover:text-neutral-700 shrink-0"
            >
              {showAllCats ? "View Less" : "View All"}
            </button>
          )}
        </div>
      </div>

      {/* ─── Main Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Active filter label */}
        {(active !== ALL || query.trim() !== "") && (
          <div className="flex items-center gap-3 mb-6">
            <p className="text-[0.875rem] text-neutral-500">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {filtered.length}
              </span>{" "}
              {filtered.length === 1 ? "article" : "articles"}
              {active !== ALL && (
                <span>
                  {" "}
                  in{" "}
                  <span className="font-semibold text-primary">{active}</span>
                </span>
              )}
            </p>
            <button type="button"
              onClick={() => {
                setActive(ALL);
                setQuery("");
                if (currentPage !== 1) {
                  setCurrentPage(1);
                }
              }}
              className="text-[0.8125rem] font-medium text-neutral-400 hover:text-primary transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-primary/50"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <>
            <div className="flex flex-col gap-5">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.id} post={post} variant="listing" />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button type="button"
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={visiblePage === 1 || isPending}
                  className="group cursor-pointer flex items-center px-3.5 py-1.5 rounded-md border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900 disabled:opacity-40 disabled:pointer-events-none transition-all h-[32px] shadow-sm"
                >
                  <span className="w-0 overflow-hidden transition-all duration-300 ease-out group-hover:w-3.5 flex items-center opacity-0 group-hover:opacity-100">
                    <FaArrowRight className="size-3 rotate-180 shrink-0 mr-1" />
                  </span>
                  Previous
                </button>

                <div className="flex items-center gap-1.5 px-2 hidden sm:flex">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).flatMap(
                  (p, _origIdx, allPages) => {
                    if (
                      p !== 1 &&
                      p !== totalPages &&
                      Math.abs(visiblePage - p) > 1
                    ) return [];
                    const filteredBefore = allPages.filter(
                      (pp) =>
                        pp < p &&
                        (pp === 1 ||
                          pp === totalPages ||
                          Math.abs(visiblePage - pp) <= 1)
                    );
                    const prevP = filteredBefore[filteredBefore.length - 1];
                    return [
                      <div key={p} className="contents">
                        {prevP !== undefined && p - prevP > 1 && (
                          <span className="px-1 text-neutral-400">…</span>
                        )}
                        <button type="button"
                          onClick={() => {
                            setCurrentPage(p);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`flex hover:cursor-pointer items-center justify-center min-w-[2rem] h-[32px] px-2.5 rounded-md text-xs font-semibold transition-all ${
                            visiblePage === p
                              ? "bg-neutral-800 text-white border-transparent shadow-sm"
                              : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900 shadow-sm"
                          }`}
                        >
                          {p}
                        </button>
                      </div>
                    ];
                  })}
                </div>

                {/* Mobile Page indicator (shown instead of numbers) */}
                <div className="sm:hidden flex items-center px-2 text-xs text-neutral-500 font-semibold">
                  {visiblePage} / {totalPages}
                </div>

                <button type="button"
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={visiblePage === totalPages || isPending}
                  className="group flex hover:cursor-pointer items-center px-3.5 py-1.5 rounded-md border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900 disabled:opacity-40 disabled:pointer-events-none transition-all h-[32px] shadow-sm"
                >
                  Next
                  <span className="w-0 overflow-hidden transition-all duration-300 ease-out group-hover:w-3.5 flex items-center justify-end opacity-0 group-hover:opacity-100">
                    <FaArrowRight className="size-3 shrink-0 ml-1" />
                  </span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center gap-4 bg-neutral-50/50 rounded-2xl border border-neutral-200/60">
            <div className="flex size-16 items-center justify-center rounded-xl bg-white shadow-sm border border-neutral-200/60 text-neutral-300">
              <FaSearch className="size-6" />
            </div>
            <div>
              <p className="text-xl font-bold text-neutral-900">
                No articles found
              </p>
              <p className="text-neutral-500 text-[0.9375rem] mt-2 max-w-sm mx-auto">
                We couldn&apos;t find any articles matching your current filters. Try adjusting your search or category.
              </p>
            </div>
            <button type="button"
              onClick={() => {
                setActive(ALL);
                setQuery("");
                if (currentPage !== 1) {
                  setCurrentPage(1);
                }
              }}
              className="mt-4 rounded-xl bg-white shadow-sm border border-slate-200 px-6 py-2.5 text-[0.875rem] font-semibold text-slate-700 hover:text-primary hover:border-primary/30 transition-all"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
