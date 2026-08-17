import { Services } from "@/components/sections/shared/services";

import { FeatureSection } from "@/components/sections/shared/feature-section";
import { ClientsResolver as Clients } from "@/components/sections/shared/clients";
import { GlobalCTA } from "@/components/sections/shared/global-cta";
import { Blog } from "@/components/sections/pages/home/blog";
import { FaqSection } from "@/components/sections/shared/faq/faq-section-v1";
import { GlobalExcellence } from "@/components/sections/pages/home/global-excellence";
import Hero from "@/components/sections/pages/home/hero_v2";
import { CaseStudiesV1 } from "@/components/sections/shared/case-studies/case-studies";
import { defaultCaseStudies } from "@/data/case-studies";

import { TechStackV1 } from "@/components/sections/shared/tech-stack/tech-stack-v1";
import { CollaborationFramework } from "@/components/sections/shared/framework/collaboration-framework-v1";

export const HomePageSections = {
  Services,
  // AiAdvantage,
  FeatureSection,
  // Products,
  Clients,
  GlobalCTA,
  Blog,
  FaqSection,
  GlobalExcellence,
  Hero,
  CaseStudiesV1,
  defaultCaseStudies,
  // ClientSuccess,
  TechStackV1,
  CollaborationFramework,
  // MiddleCTA,
};
