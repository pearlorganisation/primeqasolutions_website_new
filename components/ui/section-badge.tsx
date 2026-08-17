import React from "react";
import { cn } from "@/lib/utils/utils";

interface SectionBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  icon?: React.ElementType;
  iconClassName?: string;
  labelClassName?: string;
}

export function SectionBadge({
  label,
  className,
  icon: Icon,
  iconClassName,
  labelClassName,
  children,
  ...props
}: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "group relative flex mx-auto max-w-fit items-center justify-center gap-2 rounded-lg",
        "px-4 py-2",
        "bg-[var(--color-page-canvas)]",
        "border-neutral-200/80 border-[0.5px] dark:border-neutral-800",
        "transition-all duration-300 cursor-default",
        "hover:-translate-y-px",
        className
      )}
      {...props}
    >
      {/* Shimmer overlay */}
      <span
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
        aria-hidden="true"
      >
        <span className="absolute -inset-x-full top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
      </span>

      {Icon && (
        <Icon
          className={cn(
            "relative z-10 hidden md:block size-3.5 self-center shrink-0 text-neutral-700 dark:text-neutral-300 transition-transform duration-300 group-hover:scale-110",
            iconClassName
          )}
        />
      )}

      {(label || children) && (
        <span
          className={cn(
            "relative z-10 text-[0.813rem] font-medium uppercase tracking-[0.12em] leading-none md:whitespace-nowrap",
            "text-primary/55 dark:text-neutral-200",
            "transition-all duration-300",
            labelClassName
          )}
        >
          {label || children}
        </span>
      )}
    </div>
  );
}
