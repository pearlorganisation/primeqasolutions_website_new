import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Hire QA Engineers | PrimeQA",
  description: "Scale your testing capabilities with our vetted QA professionals. Integrate seamlessly into your workflow to deliver flawless digital experiences faster.",
  alternates: {
    canonical: "/hire-qa-engineers",
  },
  openGraph: {
    title: "Hire QA Engineers | PrimeQA",
    description: "Scale your testing capabilities with our vetted QA professionals. Integrate seamlessly into your workflow to deliver flawless digital experiences faster.",
    type: "website",
    url: "/hire-qa-engineers",
  },
};

export default function HireQAEngineersPage() {
  notFound();
}
