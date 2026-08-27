"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { Button } from "@/components/ui/button";
import { FiChevronDown } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  items?: FaqItem[];
  badge?: string;
  title?: string;
  titleHighlight?: string;
  description?: string | any[];
  showContactCard?: boolean;
  cta?: {
    title?: string;
    description?: string;
    buttonLabel?: string;
    buttonLink?: string;
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

const DEFAULT_ITEMS: FaqItem[] = [];

export function FaqSection({
  items = DEFAULT_ITEMS,
  badge,
  title,
  titleHighlight,
  description,
  showContactCard = true,
  cta,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section>
      <Container>
          {/* Section Header */}
          <SectionHeaderResolver 
            align="center"
            badge={badge}
            title={title}
            titleHighlight={titleHighlight}
            description={description}
          />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - FAQ Accordion */}
          <div className={`${showContactCard ? "lg:col-span-7 xl:col-span-8" : "lg:col-span-12"} flex flex-col`}>
            <div className="w-full">
              {items.map((faq, index) => (
                <div
                  key={faq.question}
                  className="border-b border-neutral-100 last:border-0"
                >
                  <button type="button"
                    onClick={() => toggleOpen(index)}
                    className="w-full flex items-center justify-between hover:cursor-pointer py-4.5 text-left focus:outline-none group"
                  >
                    <span className="text-sm md:text-base font-medium text-primary/80 group-hover:text-primary transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <div className="ml-4 shrink-0">
                      <FiChevronDown className={`size-5 text-neutral-400 group-hover:text-neutral-600 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-5 pr-8 text-secondary md:text-sm text-xs leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Card */}
          {showContactCard && (
            <div className="col-span-1 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
              <div className="bg-cream brightness-[0.97] rounded-lg p-7 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute -top-20 -right-20 size-48 bg-cream-800/20 rounded-full blur-3xl pointer-events-none" />

                <div className="size-10 bg-cream brightness-[0.87]  rounded-lg flex items-center justify-center mb-5 relative z-10 text-primary">
                  <FaRegCommentDots className="size-5" />
                </div>

                <h3 className="relative z-10 w-full text-base font-medium text-primary mb-2 tracking-tight leading-snug">
                  {cta?.title || "Do You Have More Questions?"}
                </h3>

                <p className="relative z-10 w-full text-secondary text-[13px] md:text-sm leading-relaxed mb-6">
                  {cta?.description || "Our team is ready to provide you with a detailed consultation and answer any specific questions you may have."}
                </p>

                <Link href={cta?.buttonLink || "/contact-us"} className="w-full block relative z-10">
                  <Button asChild className="w-full bg-primary text-white hover:bg-primary/90  transition-all duration-200">
                    <span>{cta?.buttonLabel || "Contact Us"}</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}

          </div>
      </Container>
    </Section>
  );
}
