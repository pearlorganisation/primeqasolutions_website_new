"use client";

import React, { useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import { FaTimes, FaRobot, FaPaperPlane } from "react-icons/fa";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { AnimatePresence, m } from "motion/react";

export function AiSummaryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<{ title: string; bullets: string[] } | null>(null);

  // Generate page-specific mock summaries based on document title
  const generateSummary = () => {
    setIsLoading(true);
    setIsOpen(true);
    
    setTimeout(() => {
      const pageTitle = typeof document !== "undefined" ? document.title : "";
      
      let summary = {
        title: "PrimeQA Solutions Overview",
        bullets: [
          "Enterprise-grade QA services specializing in test automation, manual execution, and mobile testing.",
          "AI-driven framework integration that helps teams release products up to 40% faster.",
          "Top-rated quality assurance partner with a verified 4.9/5 stars rating on Clutch."
        ]
      };

      if (pageTitle.toLowerCase().includes("blog")) {
        summary = {
          title: "PrimeQA Insights & Guides",
          bullets: [
            "Curated collection of industry guides covering test automation, load testing, and security.",
            "Expert articles detailing tools like Jenkins, AWS, Playwright, and Selenium.",
            "Actionable strategies for engineering teams to optimize CI/CD pipelines and manual QA workflows."
          ]
        };
      } else if (pageTitle.toLowerCase().includes("tech")) {
        summary = {
          title: "PrimeQA Core Tech Stack",
          bullets: [
            "Advanced test automation tooling including Docker, Python, JS, OpenCV, and Playwright.",
            "Comprehensive mobile and load testing stacks (Appium, JMeter, BrowserStack).",
            "Modern AI-driven testing layers (Mabl, Applitools, Functionize) for automated healing."
          ]
        };
      }

      setSummaryData(summary);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Sparkles Trigger Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <RainbowButton
          onClick={generateSummary}
          style={{
            background: "linear-gradient(#262626, #262626), linear-gradient(#262626 50%, rgba(38,38,38,0.6) 80%, rgba(38,38,38,0)), linear-gradient(90deg, var(--color-1), var(--color-5), var(--color-3), var(--color-4), var(--color-2))",
            backgroundSize: "200%",
            backgroundClip: "padding-box, border-box, border-box",
            backgroundOrigin: "border-box",
            border: "2px solid transparent",
          }}
          className="h-10 px-5 rounded-lg text-xs font-semibold text-white shadow-lg shadow-black/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <HiOutlineSparkles className="size-4 animate-pulse text-amber-300" />
          <span>Summarize with AI</span>
        </RainbowButton>
      </div>

      {/* AI Summary Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:justify-start p-4 sm:p-6 bg-neutral-950/40 backdrop-blur-xs">
            {/* Modal Overlay Click to close */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Modal Container */}
            <m.div
              initial={{ opacity: 0, x: -50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -50, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md bg-neutral-900/95 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md z-10 flex flex-col max-h-[85vh] sm:max-h-[75vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-white">
                  <FaRobot className="size-5 text-primary" />
                  <span className="text-sm font-bold tracking-wide">AI Page Assistant</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close panel"
                >
                  <FaTimes className="size-4" />
                </button>
              </div>

              {/* Content Panel */}
              <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                {isLoading ? (
                  /* Loading Shimmer State */
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-5 rounded-full bg-neutral-800 animate-pulse" />
                      <div className="h-4 w-36 bg-neutral-800 rounded-md animate-pulse" />
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="h-3 w-full bg-neutral-800 rounded-sm animate-pulse" />
                      <div className="h-3 w-[90%] bg-neutral-800 rounded-sm animate-pulse" />
                      <div className="h-3 w-[85%] bg-neutral-800 rounded-sm animate-pulse" />
                    </div>
                  </div>
                ) : (
                  /* Summary Content */
                  summaryData && (
                    <div className="flex flex-col gap-4 text-left">
                      <div className="flex items-center gap-2 text-white">
                        <HiOutlineSparkles className="size-4 text-amber-300" />
                        <h4 className="text-sm font-semibold text-neutral-200">
                          {summaryData.title}
                        </h4>
                      </div>
                      <ul className="space-y-3 mt-1">
                        {summaryData.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start">
                            <span className="text-primary mt-1 text-xs select-none">✦</span>
                            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                              {bullet}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>

              {/* Footer Input for interactivity */}
              <div className="p-4 border-t border-neutral-800 bg-neutral-950/50 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about this page..."
                  className="flex-1 h-9 px-3 rounded-lg border border-neutral-800 bg-neutral-900 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                />
                <button
                  className="flex size-9 items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-750 text-white transition-colors cursor-pointer border border-neutral-750"
                  aria-label="Send query"
                >
                  <FaPaperPlane className="size-3" />
                </button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
