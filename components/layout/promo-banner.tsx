import React from "react";
import { Container } from "@/components/ui/container";
import { PartyPopper } from "lucide-react";

export function PromoBanner() {
  return (
    <div className="w-full bg-linear-to-r from-blue-700 via-indigo-600 to-blue-700 text-white py-2 shadow-sm">
      <Container>
        <div className="flex items-center justify-center text-[0.875rem] font-medium tracking-wide">
          <span className="flex items-center gap-2">
            <PartyPopper aria-hidden className="size-4" />
            We are proud to be featured on DesignRush for our outstanding work.
          </span>
        </div>
      </Container>
    </div>
  );
}
