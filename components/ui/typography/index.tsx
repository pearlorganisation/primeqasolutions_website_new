import { cn } from "@/lib/utils/utils";
import React from "react";

/**
 * Typography System
 * A comprehensive set of text components for consistent hierarchy and styling across the site.
 */

const H1 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h1
    className={cn(
      "scroll-m-20 text-[2.5rem] font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h1>
);

const H2 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h2
    className={cn(
      "text-3xl sm:text-4xl  text-white tracking-tight leading-tight mb-4",
      className
    )}
  >
    {children}
  </h2>
);

const H3 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h3
    className={cn(
      "font-dispaly scroll-m-20 font-normal text-sm md:text-base tracking-tight",
      className
    )}
  >
    {children}
  </h3>
);

const H4 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h4
    className={cn(
      "scroll-m-20 text-base font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h4>
);

const P = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p
    className={cn(
      "text-xs md:text-sm leading-relaxed text-secondary not-first:mt-0",
      className
    )}
  >
    {children}
  </p>
);

const Lead = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p
    className={cn(
      "text-lg md:text-xl text-neutral-600 leading-relaxed",
      className
    )}
  >
    {children}
  </p>
);

const Small = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <small
    className={cn("text-sm font-medium leading-none text-neutral-400", className)}
  >
    {children}
  </small>
);

const Muted = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p className={cn("text-sm text-neutral-500/70", className)}>{children}</p>
);

const Large = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn("text-lg font-semibold", className)}>{children}</div>;

export { H1, H2, H3, H4, P, Lead, Small, Muted, Large };
