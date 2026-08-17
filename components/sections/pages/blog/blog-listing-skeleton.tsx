import { Skeleton } from "@/components/ui/skeleton";

const chipWidths = ["w-24", "w-32", "w-28", "w-20", "w-36"];

export function BlogListingSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* ─── Header Section: Search & Categories Skeleton ─── */}
      <div className="flex flex-col gap-5 pb-4 pt-2 border-b border-neutral-200/60">
        {/* Search Row Skeleton */}
        <div className="flex items-center w-full">
          <Skeleton className="h-[32px] w-full rounded-md" />
        </div>

        {/* Categories Row Skeleton */}
        <div className="flex items-start gap-3 w-full">
          <div className="flex flex-wrap items-center gap-2.5 flex-1 py-1 -my-1 max-h-[46px] overflow-hidden">
            {chipWidths.map((w) => (
              <Skeleton key={w} className={`h-[32px] ${w} rounded-md`} />
            ))}
          </div>
          <Skeleton className="h-[32px] w-20 rounded-md shrink-0" />
        </div>
      </div>

      {/* ─── Main Content List Skeleton ─── */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-start justify-between py-6 border-b border-neutral-200/60 last:border-0"
            >
              {/* Left Side: Title & Excerpt Skeleton */}
              <div className="flex-1 flex flex-col gap-3 pr-6">
                {/* Title */}
                <Skeleton className="h-5 w-3/4 rounded-md" />
                {/* Excerpt */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-full rounded" />
                  <Skeleton className="h-3 w-5/6 rounded" />
                </div>
              </div>

              {/* Right Side: Published Date Skeleton */}
              <Skeleton className="h-4.5 w-16 rounded shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
