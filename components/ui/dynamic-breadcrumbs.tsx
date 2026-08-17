"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils/utils";

export interface BreadcrumbItemType {
  label: string;
  href?: string;
}

export interface DynamicBreadcrumbsProps {
  /** Provide explicit breadcrumbs to override dynamic generation */
  breadcrumbsProp?: BreadcrumbItemType[];
  /** URL segments to ignore when generating breadcrumbs dynamically */
  skipSegments?: string[];
  /** Custom class for the root Breadcrumb container */
  className?: string;
  /** Custom theme preset for link styling */
  theme?: "light" | "dark";
}

export function DynamicBreadcrumbs({
  breadcrumbsProp,
  skipSegments = ["company", "industries", "services"],
  className,
  theme = "light",
}: DynamicBreadcrumbsProps) {
  const pathname = usePathname();

  // ── Resolve breadcrumbs ──────────────────────────────────────────────────
  let generatedBreadcrumbs: BreadcrumbItemType[] = [{ label: "Home", href: "/" }];
  const segments = (pathname || "").split("/").filter(Boolean);
  let currentPath = "";
  
  const SKIP_SEGMENTS = new Set(skipSegments.map((s) => s.toLowerCase()));

  segments.forEach((segment, index) => {
    if (SKIP_SEGMENTS.has(segment.toLowerCase())) return;

    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    let label = segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
    if (segment.toLowerCase() === "hire-qa-engineers") label = "Hire QA Engineers";
    
    generatedBreadcrumbs.push({
      label,
      href: isLast ? "" : currentPath,
    });
  });

  // Direct prop takes precedence, then dynamically derived from path
  const breadcrumbs: BreadcrumbItemType[] =
    breadcrumbsProp ?? (segments.length > 0 ? generatedBreadcrumbs : []);

  const showBreadcrumb = breadcrumbs.length > 0;

  if (!showBreadcrumb) return null;

  // Theme styles
  const isDark = theme === "dark";
  const linkClass = isDark
    ? "text-white/70 hover:text-white transition-colors duration-200"
    : "text-slate-500 hover:text-slate-900 transition-colors duration-200";
  const pageClass = isDark
    ? "text-white font-medium"
    : "text-slate-900 font-medium";

  return (
    <Breadcrumb className={cn("mb-4", isDark && "text-white", className)}>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, i) => {
          const isLast = i === breadcrumbs.length - 1;
          return (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                {crumb.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href} className={linkClass}>
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className={pageClass}>
                    {crumb.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
