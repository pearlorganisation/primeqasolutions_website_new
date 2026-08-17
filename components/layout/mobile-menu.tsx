"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { navigationData } from "@/config/navigation";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/utils";

/**
 * MobileMenu — the ONLY client component in the navigation tree.
 *
 * Extracted from header.tsx so the parent Header can remain a
 * Server Component. This keeps all navigation markup server-rendered
 * and only ships the tiny toggle interaction to the client.
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  function closeMenu() {
    setIsOpen(false);
  }

  function toggleMenu(title: string) {
    setOpenMenu((current) => (current === title ? null : title));
  }

  return (
    <>
      {/* Hamburger Toggle Button */}
      <button type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="xl:hidden inline-flex size-10 items-center justify-center rounded-lg text-neutral-900 transition-all hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/20 "
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        {isOpen ? (
          <X className="size-5" strokeWidth={2} />
        ) : (
          <Menu className="size-6" strokeWidth={2} />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              id="mobile-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="fixed inset-x-0 bottom-0 top-16 z-[40] flex flex-col bg-white xl:hidden shadow-xl border-t border-neutral-100"
            >
              <m.nav
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="min-h-0 flex-1 overflow-y-auto px-5 py-4"
              >
                <div className="divide-y divide-neutral-100">
                  {navigationData.map((item) => {
                    const hasSubmenu = Boolean(item.sections?.length);
                    const isExpanded = openMenu === item.title;

                    if (!hasSubmenu && item.href) {
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          className="group flex py-3 items-center justify-between text-[13.5px] font-medium text-neutral-900 transition-colors hover:text-neutral-600"
                          onClick={closeMenu}
                        >
                          {item.title}
                          <ArrowRight className="size-3.5 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      );
                    }

                    return (
                      <div key={item.title}>
                        <button
                          type="button"
                          onClick={() => toggleMenu(item.title)}
                          className={cn(
                            "flex py-3 w-full items-center justify-between text-left text-[13.5px] font-medium transition-colors",
                            isExpanded
                              ? "text-neutral-950 font-semibold"
                              : "text-neutral-900 hover:text-neutral-600",
                          )}
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-menu-${item.title}`}
                        >
                          <span>{item.title}</span>
                          <ChevronDown
                            className={cn(
                              "size-3.5 text-neutral-400 transition-transform",
                              isExpanded && "rotate-180 text-neutral-700",
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <m.div
                              id={`mobile-menu-${item.title}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-neutral-50 pb-4 pt-1.5">
                                <div className="space-y-4">
                                  {item.sections?.map((section, sectionIndex) => (
                                    <section
                                      key={section.title ?? `section-${sectionIndex}`}
                                      className="space-y-2"
                                    >
                                      {section.title && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                                          {section.title}
                                        </span>
                                      )}

                                      <ul className="space-y-0.5">
                                        {section.links.map((link) => (
                                          <li key={link.name}>
                                            <Link
                                              href={link.href}
                                              className="group flex py-1.5 items-center gap-3 text-[12.5px] font-normal text-neutral-600 transition-colors hover:text-neutral-950"
                                              onClick={closeMenu}
                                            >
                                              <span className="min-w-0 flex-1 leading-snug">
                                                {link.name}
                                              </span>
                                              <ArrowRight className="size-3 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-700" />
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </section>
                                  ))}

                                  {item.featured?.map((feature) => (
                                    <Link
                                      key={feature.title}
                                      href={feature.href}
                                      className="group flex items-center justify-between gap-4 border-t border-neutral-100 pt-3 text-[12.5px] font-medium text-neutral-900 transition-colors hover:text-neutral-700"
                                      onClick={closeMenu}
                                    >
                                      <span className="leading-snug">{feature.title}</span>
                                      <ArrowRight className="size-3 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="sticky bottom-0 mt-4 grid grid-cols-2 gap-3 border-t border-neutral-100 bg-white py-3">
                  <Link
                    href="/blog"
                    onClick={closeMenu}
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-[13px] font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 hover:border-neutral-300 hover:text-neutral-900"
                  >
                    Blog
                  </Link>
                  <Link href="/contact-us" onClick={closeMenu}>
                    <Button variant="default" className="h-10 w-full rounded-lg px-4 py-0 text-[13px]" asChild>
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </m.nav>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}
