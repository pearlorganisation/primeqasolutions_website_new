import type { CaseStudy } from "@/components/sections/shared/case-studies/case-studies";

/**
 * Default case studies used on the homepage.
 * Override by passing your own `cases` prop to <TechnicalValidation />.
 */
export const defaultCaseStudies: CaseStudy[] = [
  {
    industry: "Fintech",
    company: "FinSecure Global",
    title: "Reducing Latency by 40% for a High-Frequency Trading Platform",
    description:
      "How we optimised code-execution paths and database queries to achieve sub-millisecond transaction times during peak market hours.",
    metrics: [
      { value: "40%", label: "Latency Red." },
      { value: "12k", label: "TPS Capacity" },
      { value: "99.9%", label: "Reliability" },
      { value: "<1ms", label: "Execution" },
    ],
    href: "/case-studies/fintech-latency",
  },
  {
    industry: "Healthcare",
    company: "HealthFlow Systems",
    title: "Zero-Downtime Data Migration for a Healthcare Provider",
    description:
      "Migrating 50 TB of sensitive patient records while maintaining 100% uptime and HIPAA compliance through rigorous stress testing.",
    metrics: [
      { value: "100%", label: "Data Integrity" },
      { value: "0", label: "Downtime" },
      { value: "50TB", label: "Data Vol." },
      { value: "HIPAA", label: "Compliance" },
    ],
    href: "/case-studies/healthcare-migration",
  },
  {
    industry: "E-commerce",
    company: "ShopifyPlus Brand",
    title: "Scaling to 45k Concurrent Users for Black Friday",
    description:
      "Identifying and fixing a critical database locking issue just weeks before the biggest sale event of the year.",
    metrics: [
      { value: "45k", label: "Conc. Users" },
      { value: "99.99%", label: "Uptime" },
      { value: "50x", label: "Load Cap." },
      { value: "2.4s", label: "Avg. Load" },
    ],
    href: "/case-studies/ecommerce-scaling",
  },
];
