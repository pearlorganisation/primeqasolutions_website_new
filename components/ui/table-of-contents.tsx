"use client";

import { useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import Link from "next/link";
import { m } from "motion/react";

interface Heading {
  text: string;
  id: string;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || "");
  const isManualScrollRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollActiveLinkIntoView = useCallback((id: string) => {
    const activeElement = document.querySelector(`[href="#${id}"]`);
    const container = document.querySelector('.custom-scrollbar');

    if (activeElement && container) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = activeElement.getBoundingClientRect();

      if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
        // Calculate the exact offset instead of using scrollIntoView, 
        // which can cause the entire window to aggressively jump.
        const offset = elementRect.top - containerRect.top;
        container.scrollBy({ top: offset - 20, behavior: 'smooth' });
      }
    }
  }, []);

  const updateActiveId = useCallback((id: string) => {
    setActiveId(id);
    scrollActiveLinkIntoView(id);
  }, [scrollActiveLinkIntoView]);
  const updateActiveIdEvent = useEffectEvent(updateActiveId);

  useEffect(() => {
    // Collect DOM elements
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const handleScroll = () => {
      if (isManualScrollRef.current) return;
      let currentActiveId = "";
      
      // Loop through all section elements to check scroll positions
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        // If the top of the section comes within 150px of the viewport's top, consider it active
        if (rect.top <= 150) {
          currentActiveId = element.id;
        }
      }

      // If no section has scrolled past the offset, default to the first
      if (!currentActiveId && elements.length > 0) {
        currentActiveId = elements[0].id;
      }
      
      // For sticking to the bottom-most when scroll hits bottom
      if (window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 50) {
        currentActiveId = elements[elements.length - 1].id;
      }

      updateActiveIdEvent(currentActiveId);
    };

    // Attach listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="rounded-xl border border-neutral-200/60 bg-white p-6 shadow-md">
      <p className="flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-widest text-neutral-800 mb-6">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80"
        >
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
        On This Page
      </p>
      <div className="max-h-[calc(100vh-320px)] overflow-y-auto pr-2 custom-scrollbar">
        <ul className="flex flex-col border-l-2 border-neutral-100 ml-1 relative">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id}>
                <Link
                  href={`#${h.id}`}
                  className={`flex relative pl-5 py-2 text-[0.875rem] font-medium transition-colors ${
                    isActive ? "text-neutral-900 font-semibold" : "text-neutral-500 hover:text-neutral-900"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetList = document.getElementById(h.id);
                    if (targetList) {
                      isManualScrollRef.current = true;
                      
                      // 1. Immediately set active state & offset inside TOC scrollbar
                      updateActiveId(h.id);

                      // 2. Perform smooth window scroll using absolute coordinates
                      const targetPosition = targetList.getBoundingClientRect().top + window.scrollY - 100;
                      window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                      });

                      // 3. Update browser history hash without jumping
                      window.history.pushState(null, "", `#${h.id}`);

                      // 4. Setup scroll tracking cleanup
                      const clearManualScroll = () => {
                        isManualScrollRef.current = false;
                        window.removeEventListener("scrollend", clearManualScroll);
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      };

                      window.addEventListener("scrollend", clearManualScroll, { once: true });

                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      timeoutRef.current = setTimeout(clearManualScroll, 800);
                    }
                  }}
                >
                  {isActive && (
                    <m.span
                      layoutId="toc-indicator"
                      className="absolute left-[-2px] inset-y-0 w-[2px] bg-neutral-900 rounded-r"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  {h.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
