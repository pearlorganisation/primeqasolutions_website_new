"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Minimal client boundary for Radix UI Tooltip context.
 *
 * Isolating TooltipProvider here (rather than in layout.tsx) prevents
 * the root layout from becoming a client component while still satisfying
 * the Radix requirement that <Tooltip> descendants have a provider in scope.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
