import type { Metadata } from "next";
import { SectionHero } from "@/components/sections/shared/section-hero";
import { ContactInfo } from "@/components/sections/pages/contact/contact-info";
import { generateContactJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Contact Us | PrimeQA",
  description: "Get in touch with the PrimeQA team. Find our office locations, contact information, and ways to connect with our quality assurance experts.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Us | PrimeQA",
    description: "Get in touch with the PrimeQA team. Find our office locations, contact information, and ways to connect with our quality assurance experts.",
    type: "website",
    url: "/contact-us",
  },
};

const heroData = {
  label: "Contact Us",
  heading: "Let's Build Quality Together",
  description: "Have a question about our services or need to talk to an expert? We're here to help you achieve flawless digital experiences.",
  image: null,
  primaryButton: null,
};

export default function ContactPage() {
  const jsonLd = generateContactJsonLd();

  return (
    <main>
      <JsonLd data={jsonLd} />
      <SectionHero data={heroData} />
      <ContactInfo />
    </main>
  );
}
