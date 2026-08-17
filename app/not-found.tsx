"use client";

import Link from "next/link";
import { LottieAnimation } from "@/components/ui/lottie-animation";
import { Button } from "@/components/ui/button";
import animationData from "@/public/404.json";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center overflow-hidden">
      <div className="relative w-full max-w-2xl mx-auto -mb-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60%] bg-linear-to-br from-[#DDE5FF] via-[#E2DEFF] to-[#F3E5FF] blur-3xl opacity-50 -z-10 rounded-full" />
        <LottieAnimation animationData={animationData} className="w-full h-auto drop-shadow-xl" />
      </div>
      {/* <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight z-10 relative">
        Looks like you're lost in space!
      </h2> */}
      <p className="text-lg text-neutral-600 max-w-md mx-auto mt-10 mb-5  leading-relaxed z-10 relative">
        The page you are looking for has been moved into a black hole or perhaps never existed. Let's get you back to the earth.
      </p>
      <Link href="/" className="z-10 relative">
        <Button className="bg-[#0A0A0A]! hover:bg-[#0A0A0A]/90 text-white rounded-xl px-6 py-2 font-medium text-base shadow-lg shadow-black/5 transition-all hover:-translate-y-1">
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
}
