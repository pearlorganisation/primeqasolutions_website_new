"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Critical Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased ">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-white">
          <div className="bg-red-50 text-red-600 rounded-full size-24 flex items-center justify-center mb-8 shadow-sm border-8 border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 tracking-tight mb-6">
            A critical error occurred
          </h2>
          <p className="text-lg text-neutral-600 max-w-lg mb-10 leading-relaxed">
            We've encountered a fatal error that prevents this application from loading. Our team has been notified.
          </p>
          <Button
            onClick={() => reset()}
            className="bg-[#0A0A0A]! hover:bg-[#0A0A0A]/90 text-white rounded-xl px-8 py-6 font-medium text-base shadow-lg"
          >
            Reload application
          </Button>
        </div>
      </body>
    </html>
  );
}
