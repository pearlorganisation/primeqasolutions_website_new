import { cn } from "@/lib/utils/utils"

interface SkeletonProps extends React.ComponentProps<"div"> {
  animationType?: "shimmer" | "pulse" | "none";
}

function Skeleton({ className, animationType = "shimmer", ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden bg-slate-200/60",
        animationType === "shimmer" &&
          "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:content-['']",
        animationType === "pulse" && "animate-pulse opacity-75",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
