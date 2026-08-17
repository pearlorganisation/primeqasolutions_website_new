"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { cn } from "@/lib/utils/utils";
import { AnimatePresence, m } from "motion/react";

function getScrollState() {
  if (typeof window === "undefined") {
    return { isVisible: false, isAtBottom: false };
  }

  const scrollPosition = window.innerHeight + window.scrollY;
  const threshold = document.documentElement.scrollHeight - 100;

  return {
    isVisible: window.scrollY > 300,
    isAtBottom: scrollPosition >= threshold,
  };
}

function scrollWindowToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    // Set initial scroll state on client mount
    const nextState = getScrollState();
    setIsVisible(nextState.isVisible);
    setIsAtBottom(nextState.isAtBottom);

    const toggleVisibility = () => {
      const nextState = getScrollState();
      setIsVisible(nextState.isVisible);
      setIsAtBottom(nextState.isAtBottom);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollWindowToTop}
          className={cn(
            "fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300",
            isAtBottom 
              ? "bg-white text-slate-900 hover:bg-slate-100" 
              : "bg-slate-900 text-white hover:bg-slate-800",
            "focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          )}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="size-4.5" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
