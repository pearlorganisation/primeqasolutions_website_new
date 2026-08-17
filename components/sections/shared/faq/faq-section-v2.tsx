"use client";

import React, { useState } from "react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { FiChevronDown } from "react-icons/fi";
import { StrapiBlockRenderer } from "@/components/ui/strapi-block-renderer";

export interface FaqItem {
  question: string;
  answer: string | any[];
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

const DEFAULT_ITEMS: FaqItem[] = [];

export function FaqSection({
  items = DEFAULT_ITEMS,
  badge,
  title,
  titleHighlight,
  description,
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
          align="left"
          badge={badge}
          title={title}
          titleHighlight={titleHighlight}
          description={description}
        />

        <div className="w-full mt-12 ">
          {items.map((faq, index) => (
            <div
              key={faq.question}
              className="border-b border-neutral-100 last:border-0"
            >
              <button type="button"
                onClick={() => toggleOpen(index)}
                className="w-full flex items-center justify-between hover:cursor-pointer py-4.5 text-left focus:outline-none group"
              >
                <span className="text-base lg:text-lg font-medium text-neutral-800 group-hover:text-neutral-950 transition-colors leading-snug">
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
                  <div className="pb-5 pr-8 text-neutral-500 text-sm leading-relaxed">
                    {typeof faq.answer === 'string' ? (
                      faq.answer
                    ) : (
                      <StrapiBlockRenderer blocks={faq.answer} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
