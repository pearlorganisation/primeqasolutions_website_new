import React from "react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import Link from "next/link";
import { resolveGlobalCtaProps, type GlobalCtaProps } from "./types";
import { cn } from "@/lib/utils/utils";
import { NoiseTexture } from "@/components/ui/noise-texture";
import { H2, P } from "@/components/ui/typography";


export function GlobalCtaV1(props: GlobalCtaProps) {
  const { title, description, buttonLabel, buttonLink } = resolveGlobalCtaProps(props);

  return (
    <div className={cn("w-full px-0 md:px-4 lg:px-0 mx-auto max-w-7xl", props.className)}>
      <div className="relative overflow-hidden bg-cream! brightness-[0.97]! py-10 md:py-12 px-6 md:px-12 rounded-none md:rounded-lg flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        
        {/* Background Noise Overlay */}
        <NoiseTexture className="opacity-40 mix-blend-overlay pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
          <h2 className="text-primary text-xl md:text-2xl font-medium tracking-tight leading-snug mb-2">
            {title}
          </h2>
          <p className="text-secondary text-sm md:text-base leading-relaxed font-normal">
            {description}
          </p>
        </div>
        
        {/* Action Button */}
        <div className="relative z-10 shrink-0">
          <Button 
            className="bg-primary/70 hover:bg-primary text-white font-meduim rounded-lg h-11 px-6 text-sm shadow-xs transition-colors duration-200 cursor-pointer" 
            asChild
          >
            <Link href={buttonLink}>
              {buttonLabel}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
