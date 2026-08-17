"use client";

import React, { useRef, useState, useEffect } from "react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { m, useScroll, useSpring } from "motion/react";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import type { ProcessSectionProps } from "./types";
import { extractPlainText, toAbsUrl } from "./utils";
import { parseHighlight } from "@/lib/utils/text-utils";

export function ProcessSectionV1({
  data,
  className,
}: ProcessSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll-linked animation for the SVG line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scaleY.on("change", (latest) => {
      setProgress(latest);
    });
  }, [scaleY]);

  const heading = data?.heading;
  
  const items = data?.process_items || [];
  
  const label = heading?.label || "";
  const titleText = extractPlainText(heading?.title);
  const { title, highlight } = parseHighlight(titleText);
  const description = extractPlainText(heading?.description);

  return (
    <Section className={`py-20 lg:py-32 bg-white overflow-hidden ${className || ""}`}>
      <Container>
        {/* Header */}
        <SectionHeaderResolver 
              variant={heading?.variant} 
          align={heading?.align || "center"}
          badge={label}
          title={title}
          titleHighlight={highlight}
          description={description}
        />

        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          
          {/* ── Vertical Motion Line ── */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2 hidden md:block">
            <m.div 
              className="absolute top-0 left-0 w-full bg-neutral-900 origin-top"
              style={{ scaleY, height: "100%" }}
            />
          </div>

          {/* ── Mobile Vertical Line ── */}
          <div className="absolute left-[24px] top-0 bottom-0 w-[2px] bg-slate-100 md:hidden">
            <m.div 
              className="absolute top-0 left-0 w-full bg-neutral-900 origin-top"
              style={{ scaleY, height: "100%" }}
            />
          </div>

          {/* ── Steps ── */}
          <div className="space-y-16 md:space-y-24">
            {items.map((step: any, index: number) => {
              const total = items.length;
              // Map index to the exact vertical percentage of the step in the timeline
              const threshold = total > 1 ? (index / (total - 1)) * 0.85 + 0.07 : 0.07;
              const isActive = progress >= threshold;

              return (
                <ProcessStep
                  key={step.id || index}
                  step={step}
                  index={index}
                  isEven={index % 2 === 0}
                  toAbsUrl={toAbsUrl}
                  isActive={isActive}
                />
              );
            })}
          </div>

        </div>
      </Container>
    </Section>
  );
}

interface ProcessStepProps {
  step: any;
  index: number;
  isEven: boolean;
  toAbsUrl: (url: string) => string;
  isActive: boolean;
}

function ProcessStep({ step, index, isEven, toAbsUrl, isActive }: ProcessStepProps) {
  const stepTitle = step.title || "";
  const stepDesc = extractPlainText(step.description);

  return (
    <div className="relative flex items-center md:justify-center">
      {/* Step Content Wrapper */}
      <div className={`flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
        
        {/* Empty Space for alignment on Desktop */}
        <div className="hidden md:block md:w-1/2" />

        {/* Step Icon / Marker */}
        <div className="absolute left-[24px] md:left-1/2 -translate-x-1/2 z-10">
          <div 
            className={`flex size-10 items-center justify-center rounded-lg border-2 transition-all duration-500 overflow-hidden
              ${isActive 
                ? "bg-black border-black shadow-md scale-110" 
                : "bg-white border-neutral-200 shadow-none scale-100"
              }`}
          >
            {step.icon?.url ? (
              <Image
                src={toAbsUrl(step.icon.url)}
                alt={step.icon.alternativeText || stepTitle}
                width={22}
                height={22}
                className={`object-contain transition-all duration-500
                  ${isActive ? "grayscale-0 opacity-100 brightness-0 invert" : "grayscale opacity-40"}`}
              />
            ) : (
              <FaCheckCircle className={`size-5 transition-all duration-500
                ${isActive ? "text-white" : "text-neutral-300"}`} />
            )}
          </div>
        </div>

        {/* Text Content */}
        <m.div 
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}
        >
          {/* Step Number */}
          <span className={`text-4xl md:text-6xl font-semibold absolute -top-4 md:-top-8 hidden lg:block select-none pointer-events-none transition-colors duration-500
            ${isActive ? "text-neutral-200/55" : "text-neutral-100"}`}
            style={{ [isEven ? 'right' : 'left']: '15%' }}
          >
            0{index + 1}
          </span>

          <h3 className="text-md md:text-xl font-medium text-neutral-900 mb-2 relative z-10">
            {stepTitle}
          </h3>
          {stepDesc && (
            <p className={`text-neutral-500 text-[1rem] leading-relaxed max-w-md ml-0 ${isEven ? 'md:ml-auto' : ''}`}>
              {stepDesc}
            </p>
          )}
        </m.div>

      </div>
    </div>
  );
}
