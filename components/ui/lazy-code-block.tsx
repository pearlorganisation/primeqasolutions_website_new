"use client";

import dynamic from "next/dynamic";

export const LazyCodeBlock = dynamic(
  () => import("@/components/ui/code-block").then((mod) => mod.CodeBlock),
  {
    ssr: false,
    loading: () => null,
  }
);
