"use client";

import React from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { resolveTechStackProps } from "./types";
import type { TechStackProps } from "./types";
import { MdOutlineBugReport } from "react-icons/md";

export function TechStackV1(props: TechStackProps) {
  const { variant, heading, badge, title, titleHighlight, description, categories } =
    resolveTechStackProps(props);

  return (
    <Section className="relative bg-white overflow-hidden">
      <Container className="relative z-10">
        {/* Header */}
        <SectionHeaderResolver
          variant={heading?.variant}
          badge={badge}
          title={title}
          titleHighlight={titleHighlight}
          description={description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10 items-center">
          {/* Categories Rows with boundary */}
          <div className="lg:col-span-8 border-none rounded-xl bg-slate-50/5 p-6 md:p-8 shadow-xs divide-y divide-slate-100">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 py-5 first:pt-0 last:pb-0"
              >
                {/* Category */}
                <div className="w-full shrink-0 md:w-44">
                  <span className="font-display font-normal text-primary/70 text-base tracking-tight">
                    {cat.category}
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-3">
                  {cat.tools.map((tool) => (
                    <span
                      key={tool.name}
                      className="tool-badge tool-badge-text inline-flex items-center rounded-md  border-color bg-neutral-50 px-2.5 py-1 transition-colors duration-200 hover:border-neutral-300 hover:bg-white hover:text-secondary"
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Contact Card */}
          {/* <div className="lg:col-span-4 lg:sticky lg:top-28 w-full">
            <div className="bg-linear-to-b from-neutral-900 via-neutral-950 to-neutral-950 border border-neutral-800/80 rounded-xl p-6 flex flex-col items-center text-center shadow-sm relative overflow-hidden">
              Background Ambient Red Glows
              <div className="absolute -top-20 -right-20 size-52 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 size-52 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

              Bug Icon Box with Red Gradient & Glow
              <div className="size-10 bg-linear-to-br from-red-500/20 via-rose-500/15 to-red-500/5 border border-red-500/30 rounded-lg flex items-center justify-center mb-4 relative z-10 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                <MdOutlineBugReport className="size-6" />
              </div>

              <h3 className="relative z-10 w-full text-base font-medium text-neutral-50 mb-2 tracking-tight leading-snug">
                Download Free Software Testing Report Templates
              </h3>

              <p className="relative z-10 w-full text-neutral-300/80 text-xs md:text-sm leading-relaxed mb-4">
                Access a complete collection of software testing reports and templates for every QA phase.
              </p>

              <ul className="relative z-10 w-full flex flex-col gap-2.5 text-left text-xs md:text-sm text-neutral-300/80 mb-5 px-1">
                <li className="flex items-start gap-2.5">
                  <FaCheckCircle className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>20+ ready-to-use QA report templates</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FaCheckCircle className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Covers functional, automation, API, performance, security &amp; mobile testing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FaCheckCircle className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Fully customizable for your projects</span>
                </li>
              </ul>

              <Link href="https://drive.google.com/drive/folders/1DwwnM9ENBmWlrtRPp91xMVbR3fyHmB1i" target="_blank" className="w-full block relative z-10">
                <Button asChild className="w-full bg-white text-neutral-950 hover:bg-neutral-100 hover:text-neutral-950 transition-all duration-200">
                  <span>Download Free Test</span>
                </Button>
              </Link>
            </div>
          </div> */}

          <div className="w-full lg:sticky lg:top-28 lg:col-span-4">
            <div className="relative flex flex-col items-center overflow-hidden rounded-xl bg-cream p-6 text-center brightness-[0.97] shadow-sm">

              {/* Bug Icon Box */}
              <div
                className="
                  relative z-10 mb-4
                  flex size-10 items-center justify-center
                  rounded-lg
                  border border-primary/10
                  bg-primary/5
                  text-primary
                "
              >
                <MdOutlineBugReport className="size-6" />
              </div>

              {/* Title */}
              <h3
                className="
                  relative z-10 mb-2 w-full
                  text-base
                  font-medium
                  leading-snug
                  tracking-tight
                  text-primary
                "
              >
                Download Free Software Testing Report Templates
              </h3>

              {/* Description */}
              <p
                className="
                  relative z-10 mb-4 w-full
                  text-xs
                  leading-relaxed
                  text-secondary
                  md:text-sm
                "
              >
                Access a complete collection of software testing reports and templates
                for every QA phase.
              </p>

              {/* Features */}
              <ul
                className="
                  relative z-10 mb-5 flex w-full flex-col
                  gap-2.5 px-1
                  text-left
                  text-xs
                  text-secondary
                  md:text-sm
                "   
              >
                <li className="flex items-start gap-2.5">
                  {/* <FaCheckCircle className="mt-0.5 size-4 shrink-0 text-primary" /> */}
                  <FaCheckCircle className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    20+ ready-to-use QA report templates
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  {/* <FaCheckCircle className="mt-0.5 size-4 shrink-0 text-primary" /> */}
                  <FaCheckCircle className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Covers functional, automation, API, performance, security &amp;
                    mobile testing
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  {/* <FaCheckCircle className="mt-0.5 size-4 shrink-0 text-primary" /> */}
                  <FaCheckCircle className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Fully customizable for your projects
                  </span>
                </li>
              </ul>

              {/* CTA */}
              <Link
                href="https://drive.google.com/drive/folders/1DwwnM9ENBmWlrtRPp91xMVbR3fyHmB1i"
                target="_blank"
                className="relative z-10 block w-full"
              >
                <Button
                  asChild
                  className="
                      w-full
                      bg-primary
                      text-white
                      transition-all
                      duration-200
                      hover:bg-primary/90
                      hover:text-white
                    "
                >
                  <span>Download Free Test</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

