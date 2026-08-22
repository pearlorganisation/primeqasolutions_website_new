import React from "react";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionBadge } from "@/components/ui/section-badge";

const certifications = [
  {
    badge: "/images/cirtifications/badge-1.png",
    name: "ISO 9001:2015",
    body: "Quality Management System",
    description: "Internationally certified for consistent delivery of quality products and services.",
  },
  {
    badge: "/images/cirtifications/badge-2.png",
    name: "ISO 27001",
    body: "Information Security",
    description: "Certified for robust information security practices protecting client data at all times.",
  },
  {
    badge: "/images/cirtifications/badge-3.png",
    name: "ISTQB Certified",
    body: "Software Testing",
    description: "Our engineers hold internationally recognized software testing qualifications.",
  },
  {
    badge: "/images/cirtifications/badge-4.png",
    name: "CMMI Level 3",
    body: "Process Maturity",
    description: "Assessed at CMMI Level 3 for well-defined, consistently performed engineering processes.",
  },
  {
    badge: "/images/cirtifications/badge-5.png",
    name: "SOC 2 Type II",
    body: "Security & Availability",
    description: "Independently audited for security, availability, and confidentiality of client systems.",
  },
  {
    badge: "/images/cirtifications/badge-6.png",
    name: "DesignRush Awarded",
    body: "Top QA Company",
    description: "Recognized by DesignRush as a top-ranked software testing company in the USA & UK.",
  },
];

export function GlobalExcellence() {
  return (
    <Section className="py-24 lg:py-32 bg-white border-t border-slate-100">
      <Container>
        {/* Section Header — Centered */}
        <div className="flex flex-col items-center text-center bg-(--color-page-canvas) max-w-2xl mx-auto mb-16 md:mb-20">
          <SectionBadge label="Global Excellence" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-5 font-space tracking-tight">
            Internationally Recognized &{" "}
            <span className="text-primary">Certified</span>
          </h2>
          <p className="text-foreground/60 text-lg leading-relaxed">
            Our credentials speak before we do. Every certification reflects our unwavering commitment to quality, security, and engineering excellence at a global standard.
          </p>
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="group flex flex-col items-start gap-6 rounded-3xl border border-slate-100 bg-slate-50/50 p-8 transition-all duration-300 hover:bg-white hover:border-primary/20 hover:shadow-[0_8px_30px_-8px_rgba(37,99,235,0.1)]"
            >
              {/* Badge Image */}
              <div className="flex size-20 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm p-2 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={cert.badge}
                  alt={cert.name}
                  width={64}
                  height={64}
                  className="h-14 w-auto object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <p className="text-[0.75rem] font-bold uppercase tracking-widest text-primary">
                  {cert.body}
                </p>
                <h3 className="text-lg font-extrabold text-foreground tracking-tight">
                  {cert.name}
                </h3>
                <p className="text-[0.9375rem] text-foreground/55 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="size-9 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-[0.625rem] font-bold text-primary shadow-sm"
              >
                {i < 4 ? `0${i}` : "★"}
              </div>
            ))}
          </div>
          <p className="text-[0.9375rem] text-foreground/50 font-medium">
            Trusted by <span className="font-bold text-foreground">200+ enterprise clients</span> across the USA, UK & beyond.
          </p>
        </div>
      </Container>
    </Section>
  );
}
