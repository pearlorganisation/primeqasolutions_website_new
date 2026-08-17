"use client";

import { useMemo, useReducer } from "react";
import type { CaseStudy } from "@/types/case-study";
import { CaseStudyCard } from "@/components/ui/case-study-card";
import { FaSearch, FaArrowRight } from "react-icons/fa";

const ALL = "All";

// ─── Sort options ─────────────────────────────────────────────────────────────
const TESTING_TYPES_SORT = [
  "All",
  "Automation Testing",
  "Performance Testing",
  "Security Testing",
  "API Testing",
  "Mobile Testing",
  "Functional Testing",
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface CaseStudiesListingClientProps {
  studies: CaseStudy[];
  industryCounts: Record<string, number>;
  testingTypeCounts: Record<string, number>;
}

const STUDIES_PER_PAGE = 12;

type ListingState = {
  activeIndustry: string;
  activeTestingType: string;
  query: string;
  currentPage: number;
  showAllIndustries: boolean;
};

type ListingAction =
  | { type: "setIndustry"; value: string }
  | { type: "setTestingType"; value: string }
  | { type: "setQuery"; value: string }
  | { type: "setPage"; value: number }
  | { type: "toggleIndustries" }
  | { type: "clearFilters" };

function listingReducer(state: ListingState, action: ListingAction): ListingState {
  switch (action.type) {
    case "setIndustry":
      return { ...state, activeIndustry: action.value, currentPage: 1 };
    case "setTestingType":
      return { ...state, activeTestingType: action.value, currentPage: 1 };
    case "setQuery":
      return { ...state, query: action.value, currentPage: 1 };
    case "setPage":
      return { ...state, currentPage: action.value };
    case "toggleIndustries":
      return { ...state, showAllIndustries: !state.showAllIndustries };
    case "clearFilters":
      return {
        ...state,
        activeIndustry: ALL,
        activeTestingType: ALL,
        query: "",
        currentPage: 1,
      };
  }
}

/**
 * Client-side interactive wrapper for the case studies listing.
 * Handles search + industry filter + testing-type filter.
 */
export function CaseStudiesListingClient({
  studies,
  industryCounts,
  testingTypeCounts,
}: CaseStudiesListingClientProps) {
  const [
    { activeIndustry, activeTestingType, query, currentPage, showAllIndustries },
    dispatch,
  ] = useReducer(listingReducer, {
    activeIndustry: ALL,
    activeTestingType: ALL,
    query: "",
    currentPage: 1,
    showAllIndustries: false,
  });

  // Derived industry list sorted by count desc
  const industryList = useMemo(() => {
    const cats = Object.keys(industryCounts).filter((c) => c !== ALL);
    cats.sort((a, b) => (industryCounts[b] ?? 0) - (industryCounts[a] ?? 0));
    return [ALL, ...cats];
  }, [industryCounts]);

  // Derived testing-type list — prefer the preset order, then append any extras from data
  const testingTypeList = useMemo(() => {
    const fromData = Object.keys(testingTypeCounts).filter((c) => c !== ALL);
    const ordered = TESTING_TYPES_SORT.filter((t) =>
      t === ALL ? true : fromData.includes(t)
    );
    const extras = fromData.filter((t) => !TESTING_TYPES_SORT.includes(t));
    return [...ordered, ...extras];
  }, [testingTypeCounts]);

  // Filtered studies
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studies.filter((s) => {
      if (activeIndustry !== ALL && s.industry !== activeIndustry) return false;
      if (activeTestingType !== ALL && s.testingType !== activeTestingType) return false;
      if (
        q !== "" &&
        !s.title.toLowerCase().includes(q) &&
        !s.industry.toLowerCase().includes(q) &&
        !s.testingType.toLowerCase().includes(q) &&
        !s.excerpt.toLowerCase().includes(q)
      ) return false;
      return true;
    });
  }, [studies, activeIndustry, activeTestingType, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / STUDIES_PER_PAGE));
  const visiblePage = Math.min(currentPage, totalPages);
  const paginatedStudies = useMemo(() => {
    const start = (visiblePage - 1) * STUDIES_PER_PAGE;
    return filtered.slice(start, start + STUDIES_PER_PAGE);
  }, [filtered, visiblePage]);

  const hasActiveFilter =
    activeIndustry !== ALL || activeTestingType !== ALL || query.trim() !== "";

  return (
    <div className="flex flex-col gap-4">
      {/* ─── Filters ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 pb-4 pt-2 border-b border-neutral-200/60">
        {/* Search + Testing Type row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400 pointer-events-none" />
            <input
              aria-label="Search case studies"
              id="case-studies-search"
              type="search"
              value={query}
              onChange={(e) => dispatch({ type: "setQuery", value: e.target.value })}
              placeholder="Search case studies, industries, testing types..."
              className="h-[32px] w-full rounded-md border border-neutral-200 bg-white pl-9 pr-3 text-[12px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 transition-all hover:bg-neutral-50/50"
            />
          </div>

          {/* Testing Type select */}
          <div className="relative shrink-0">
            <select
              aria-label="Filter by testing type"
              id="case-studies-testing-type"
              value={activeTestingType}
              onChange={(e) =>
                dispatch({ type: "setTestingType", value: e.target.value })
              }
              className="h-[32px] appearance-none cursor-pointer rounded-md border border-neutral-200 bg-white pl-3 pr-8 text-[12px] font-semibold text-neutral-600 focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 transition-all hover:bg-neutral-50/50"
            >
              {testingTypeList.map((t) => (
                <option key={t} value={t}>
                  {t === ALL ? "All Testing Types" : t}
                </option>
              ))}
            </select>
            {/* Dropdown chevron */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-neutral-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Industry filter chips */}
        <div className="flex items-start gap-3 w-full">
          <div
            className={`flex flex-wrap items-center gap-2.5 flex-1 py-1 -my-1 ${
              showAllIndustries ? "" : "max-h-[46px] overflow-hidden"
            }`}
          >
            {industryList.map((industry) => {
              const isActive = activeIndustry === industry;
              return (
                <button type="button"
                  key={industry}
                  id={`industry-filter-${industry.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => dispatch({ type: "setIndustry", value: industry })}
                  className={`group cursor-pointer relative inline-flex items-center justify-center h-[32px] rounded-md px-4 text-[12px] font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? "bg-neutral-900 text-white shadow-neutral-900/10"
                      : "bg-white text-neutral-500 ring-[1px] ring-inset ring-neutral-200/70 hover:bg-neutral-50 hover:text-neutral-900 hover:ring-neutral-200"
                  }`}
                >
                  {industry}
                  {industry !== ALL && (
                    <span
                      className={`ml-1.5 text-[11px] font-medium ${
                        isActive ? "text-white/70" : "text-neutral-400"
                      }`}
                    >
                      ({industryCounts[industry] ?? 0})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {industryList.length > 3 && (
            <button type="button"
              aria-label={showAllIndustries ? "Show fewer industries" : "Show all industries"}
              onClick={() => dispatch({ type: "toggleIndustries" })}
              className="inline-flex items-center justify-center h-[32px] px-3 text-[11px] font-bold tracking-wider cursor-pointer transition-all duration-300 text-neutral-500 hover:text-neutral-700 shrink-0"
            >
              {showAllIndustries ? "View Less" : "View All"}
            </button>
          )}
        </div>
      </div>

      {/* ─── Active filter label ───────────────────────────────────────── */}
      {hasActiveFilter && (
        <div className="flex items-center gap-3 -mt-2">
          <p className="text-[0.875rem] text-neutral-500">
            Showing{" "}
            <span className="font-semibold text-neutral-900">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "case study" : "case studies"}
            {activeIndustry !== ALL && (
              <span>
                {" "}
                in{" "}
                <span className="font-semibold text-primary">
                  {activeIndustry}
                </span>
              </span>
            )}
            {activeTestingType !== ALL && (
              <span>
                {" "}
                ·{" "}
                <span className="font-semibold text-primary">
                  {activeTestingType}
                </span>
              </span>
            )}
          </p>
          <button type="button"
            onClick={() => dispatch({ type: "clearFilters" })}
            className="text-[0.8125rem] font-medium text-neutral-400 hover:text-primary transition-colors underline underline-offset-4 decoration-neutral-300 hover:decoration-primary/50"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* ─── List ─────────────────────────────────────────────────────── */}
      {filtered.length > 0 ? (
        <>
          <div className="flex flex-col">
            {paginatedStudies.map((study, index) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                variant="listing"
                priority={index === 0}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button type="button"
                onClick={() => {
                  dispatch({ type: "setPage", value: Math.max(1, visiblePage - 1) });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={visiblePage === 1}
                className="group cursor-pointer flex items-center px-3.5 py-1.5 rounded-md border border-neutral-200 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900 disabled:opacity-40 disabled:pointer-events-none transition-all h-[32px] shadow-sm"
              >
                <span className="w-0 overflow-hidden transition-all duration-300 ease-out group-hover:w-3.5 flex items-center opacity-0 group-hover:opacity-100">
                  <FaArrowRight className="size-3 rotate-180 shrink-0 mr-1" />
                </span>
                Previous
              </button>

              <div className="hidden sm:flex items-center gap-1.5 px-2">
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
                          dispatch({ type: "setPage", value: p });
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

              {/* Mobile page indicator */}
              <div className="sm:hidden flex items-center px-2 text-xs text-neutral-500 font-semibold">
                {visiblePage} / {totalPages}
              </div>

              <button type="button"
                onClick={() => {
                  dispatch({ type: "setPage", value: Math.min(totalPages, visiblePage + 1) });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={visiblePage === totalPages}
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
        <div className="flex flex-col items-center justify-center py-32 text-center gap-4 bg-slate-50/50 rounded-3xl border border-slate-100">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-300">
            <FaSearch className="size-6" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900">
              No case studies found
            </p>
            <p className="text-slate-500 text-[0.9375rem] mt-2 max-w-sm mx-auto">
              We couldn&apos;t find any case studies matching your current filters.
              Try adjusting your search or filters.
            </p>
          </div>
          <button type="button"
            onClick={() => dispatch({ type: "clearFilters" })}
            className="mt-4 rounded-xl bg-white shadow-sm border border-slate-200 px-6 py-2.5 text-[0.875rem] font-semibold text-slate-700 hover:text-primary hover:border-primary/30 transition-all"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
