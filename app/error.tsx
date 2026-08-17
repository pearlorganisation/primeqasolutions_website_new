"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <div className="relative mb-8 flex justify-center">
        <div className="bg-red-50 text-red-500 rounded-full size-24 flex items-center justify-center z-10 border-8 border-white shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 bg-red-100 blur-2xl opacity-50 z-0 rounded-full" />
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight mb-4">
        Something went wrong!
      </h2>
      <p className="text-lg text-neutral-600 max-w-md mb-10 leading-relaxed">
        We apologize for the inconvenience. An unexpected error has occurred while processing your request.
      </p>
      <div className="flex flex-col sm:flex-row mb-6 gap-4">
        <Button variant="default" className=" w-full" onClick={() => reset()}>
          Try Again
        </Button>
        <Link href="/">
          <Button
            variant="outline"
            className="font-medium text-base border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors w-full"
          >
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
