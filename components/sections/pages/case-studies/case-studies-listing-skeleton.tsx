import { Skeleton } from "@/components/ui/skeleton";

export function CaseStudiesListingSkeleton() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* ─── Header Section: Search & Filters Skeleton ─── */}
      <div className="flex flex-col gap-5 pb-4 pt-2 border-b border-neutral-200/60">
        {/* Search Row Skeleton */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
          <Skeleton className="h-[32px] flex-1 rounded-md" />
          <Skeleton className="h-[32px] w-48 rounded-md shrink-0" />
        </div>

        {/* Industry filter chips skeleton */}
        <div className="flex flex-wrap items-center gap-2.5">
          {["w-12", "w-24", "w-32", "w-28", "w-20", "w-36"].map((w, i) => (
            <Skeleton key={i} className={`h-[32px] ${w} rounded-md`} />
          ))}
        </div>
      </div>

      {/* ─── Main Content List Skeleton ─── */}
      <div className="flex flex-col">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row gap-6 md:gap-8 py-6 border-b border-neutral-200/60 last:border-0 md:items-start"
          >
            {/* Left Side: Image Skeleton */}
            <Skeleton className="relative w-full md:w-[300px] lg:w-[400px] xl:w-[480px] aspect-video rounded-xl shrink-0" />

            {/* Right Side: Content Skeleton */}
            <div className="flex-1 flex flex-col min-w-0 pt-0.5">
              {/* Metadata */}
              <Skeleton className="h-4 w-40 mb-2.5 rounded" />

              {/* Title */}
              <div className="flex flex-col gap-1.5 mb-3">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-5 w-1/2 rounded-md" />
              </div>

              {/* Excerpt */}
              <div className="flex flex-col gap-2 mb-4">
                <Skeleton className="h-3 w-full rounded" />
                <Skeleton className="h-3 w-5/6 rounded" />
                <Skeleton className="h-3 w-4/5 rounded" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
