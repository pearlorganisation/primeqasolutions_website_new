"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationData } from "@/config/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export function DesktopNav() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [closedItem, setClosedItem] = useState<string | null>(null);

  // Force close mega menus on navigation by temporarily removing the 'group' class
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <nav className="flex items-center gap-6" aria-label="Main navigation">
      {navigationData.map((item) => (
        <div
          key={item.title}
          onMouseLeave={() => setClosedItem(null)}
          className={cn(
            "h-16 flex items-center",
            closedItem !== item.title && !isNavigating && "group"
          )}
        >
          {/* Main Nav Link */}
          {item.href ? (
            <Link
              href={item.href}
              className="text-base font-medium tracking-tight text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5 h-full group-hover:text-neutral-900 antialiased"
            >
              {item.title}
              {item.sections && item.sections.length > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:rotate-180 text-gray-400 group-hover:text-neutral-900"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              )}
            </Link>
          ) : (
            <button type="button" className="bg-transparent border-none p-0 outline-none focus:outline-none focus:ring-0 text-base font-medium tracking-tight text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-1.5 h-full group-hover:text-neutral-900 antialiased">
              {item.title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:rotate-180 text-gray-400 group-hover:text-neutral-900"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          )}

          {/* Mega Menu Dropdown */}
          {item.sections && item.sections.length > 0 && (
            <div className="absolute top-full left-0 w-full z-50 pointer-events-none">
              {/* Invisible bridge for diagonal hovering */}
              <div className="absolute inset-0 h-112.5 hidden group-hover:block pointer-events-auto bg-transparent" />

              {/* Centered Dropdown Card */}
              <div className="w-full flex justify-center relative z-10">
                <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-section-bg rounded-b-lg rounded-t-none shadow-md border-x border-b border-neutral-200/60 flex justify-between overflow-hidden pointer-events-none group-hover:pointer-events-auto w-max max-w-[95vw] lg:max-w-full">
                  {/* Sections Grid */}
                  <div
                    className={cn(
                      "flex-1 p-6 grid gap-y-8 gap-x-8 xl:gap-x-10",
                      item.sections.length > 2
                        ? "grid-cols-3"
                        : item.sections.length === 2
                        ? "grid-cols-2"
                        : "grid-cols-1"
                    )}
                  >
                     {item.sections.map((section, idx) => (
                      <div key={section.title ?? `section-${idx}`} className="flex flex-col min-w-[240px]">
                        {section.title && (
                          <div className="text-sm font-semibold text-neutral-900 border-b border-neutral-200 pb-2.5 mb-3.5 antialiased">
                            {section.title}
                          </div>
                        )}
                        <ul className="flex flex-col gap-1">
                          {section.links.map((link) => {
                            const Icon = link.icon;
                            return (
                              <li key={link.name}>
                                <Link
                                  href={link.href}
                                  className="group/link flex items-start gap-3.5 py-1.5 transition-all"
                                >
                                  {Icon && (
                                    <div
                                      className="flex shrink-5 items-start justify-center text-secondary mt-1.5 rounded-lg"
                                      aria-hidden="true"
                                    >
                                      <Icon size={16} strokeWidth={2} />
                                    </div>
                                  )}
                                  <div className="flex flex-col gap-0.5 mt-0.5">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-sm font-medium tracking-tight text-neutral-600 group-hover/link:text-neutral-900 transition-colors antialiased">
                                        {link.name}
                                      </span>
                                      <ArrowRight className="size-3 text-neutral-900 opacity-0 -translate-x-1 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0" />
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Featured Section */}
                  {item.featured && item.featured.length > 0 && (
                    <div className="w-[300px] shrink-0 border-l border-neutral-200 bg-white p-5 flex flex-col">
                      {item.featured.map((feature) => (
                        <div key={feature.title} className="flex flex-col">
                          {feature.image && (
                            <Link
                              href={feature.href}
                              className="relative h-40 mb-4 rounded-md overflow-hidden shrink-0 group/img block"
                            >
                              <Image
                                src={feature.image}
                                alt={feature.title}
                                fill
                                sizes="300px"
                                unoptimized
                                className="object-cover transition-transform duration-700 group-hover/img:scale-105"
                              />
                            </Link>
                          )}
                          <div className="flex flex-col">
                            <div className="mb-1.5 text-sm font-bold text-neutral-900 leading-snug antialiased">
                              {feature.title}
                            </div>
                            <p className="mb-4 text-sm text-neutral-500 leading-relaxed antialiased line-clamp-3">
                              {feature.description}
                            </p>
                            <div className="flex items-center gap-4">
                              {feature.actionText && (
                                <Link
                                  href={feature.href}
                                  className="group/feat-link inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-800 transition-colors"
                                >
                                  <span>{feature.actionText}</span>
                                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/feat-link:translate-x-1" />
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
