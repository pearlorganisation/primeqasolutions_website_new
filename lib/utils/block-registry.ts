 
/**
 * Block Registry
 * ──────────────
 * The single source of truth that maps every Strapi dynamic-zone
 * __component name  →  the React component that renders it.
 *
 * Separate registries exist per page type so each page only carries
 * what it actually needs.
 */

import React from "react";
import { BLOCKS } from "./blocks";

// ─── Shared component imports ───────────────────────────────────────────────────

import { Services } from "@/components/sections/shared/services";
import { FeatureSection } from "@/components/sections/shared/feature-section";
import { ProductResolver } from "@/components/sections/shared/product";
import { GlobalCTA } from "@/components/sections/shared/global-cta";
import { ClientSuccessResolver } from "@/components/sections/shared/client-success";
import { FrameworkResolver } from "@/components/sections/shared/framework";
import { TechStackResolver } from "@/components/sections/shared/tech-stack";
import { CTAResolver } from "@/components/sections/shared/middle-cta/cta-resolver";
import { AiAdvantageResolver } from "@/components/sections/shared/ai-advantage";
import { ClientsResolver } from "@/components/sections/shared/clients";
import { FaqResolver } from "@/components/sections/shared/faq";
import { ClientStrip } from "@/components/sections/shared/client-strip";
import { TrustBuildingResolver } from "@/components/sections/shared/trust-building";
import { SectionHeroResolver } from "@/components/sections/shared/section-hero";
import { ClutchWidgetResolver } from "@/components/sections/shared/clutch-widget/clutch-widget-v1";
import { IndustryResolver } from "@/components/sections/shared/industry/industry-resolver";
import { CtaForm } from "@/components/sections/shared/cta-form";

// ─── Home page specific imports ────────────────────────────────────────────────

import HeroV2 from "@/components/sections/pages/home/hero_v2";
import { TechnicalValidationResolver } from "@/components/sections/shared/case-studies/case-studies-resolver";

// ─── Service page specific imports ────────────────────────────────────────────
// TODO: replace these stubs with real components as they are built

import { BenefitsResolver } from "@/components/sections/shared/benefits";
import { PricingResolver } from "@/components/sections/shared/pricing";
import { ProcessResolver } from "@/components/sections/shared/process-section";
import { FaqSection } from "@/components/sections/shared/faq/faq-section-v1";

// ─── Case Study page specific imports ─────────────────────────────────────────

import { CaseStudyHero as CaseStudyHeroComponent } from "@/app/case-study/[slug]/components/case-study-hero";
import { CaseStudyStats } from "@/app/case-study/[slug]/components/case-study-stats";
import { CaseStudyTestimonial } from "@/app/case-study/[slug]/components/case-study-testimonial";
import { CaseStudyTools } from "@/app/case-study/[slug]/components/case-study-tools";
import { CaseStudyMainContent } from "@/app/case-study/[slug]/components/case-study-main-content";
import { OfferBlockResolver } from "@/components/sections/shared/offers-block";

// ─── About Us page specific imports ───────────────────────────────────────────

import { TeamBlockResolver } from "@/components/sections/pages/about-us/team-block-resolver";
import { SplitBlock } from "@/components/sections/pages/about-us/split-block-resolver";
import { OfficeGalleryResolver } from "@/components/sections/pages/about-us/office-gallery-resolver";

// ─── Registry type ─────────────────────────────────────────────────────────────

type RegistryComponent = React.ComponentType<{ data: any; allSections?: any[]; pageData?: any }>;
type Registry = Record<string, RegistryComponent>;

// Registry adapter: CaseStudyHero needs (data, infoBlock) but the
// registry only passes { data, allSections }. We extract the info block here.
const CaseStudyHeroAdapter: RegistryComponent = ({ data, allSections, pageData }) => {
  const infoBlock =
    allSections?.find((b: any) => b.__component === BLOCKS.CASE_STUDY_INFO) ?? null;
  
  // Inject industry from top-level document relation if it exists
  const enrichedInfoBlock = infoBlock
    ? {
        ...infoBlock,
        Industry: pageData?.industry?.name ?? infoBlock.Industry,
      }
    : null;

  return React.createElement(CaseStudyHeroComponent, { data, infoBlock: enrichedInfoBlock });
};

// ─── Base Shared Registry (Optional, to avoid repetition) ──────────────────────

const sharedRegistry: Registry = {
  [BLOCKS.SERVICES]: Services as RegistryComponent,
  [BLOCKS.FEATURE]: FeatureSection as RegistryComponent,
  [BLOCKS.PRODUCTS]: ProductResolver as RegistryComponent,
  [BLOCKS.CTA_BUTTON]: GlobalCTA as RegistryComponent,
  [BLOCKS.TECH_STACK]: TechStackResolver as RegistryComponent,
  [BLOCKS.CTA]: CTAResolver as RegistryComponent,
  [BLOCKS.FAQ]: FaqResolver as RegistryComponent,
  [BLOCKS.METHODOLOGY]: FrameworkResolver as RegistryComponent,
  [BLOCKS.CLIENT_SUCCESS]: ClientSuccessResolver as RegistryComponent,
  [BLOCKS.AI_ADVANTAGE]: AiAdvantageResolver as RegistryComponent,
  [BLOCKS.CLIENTS]: ClientsResolver as RegistryComponent,
  [BLOCKS.CLIENT_STRIP]: ClientStrip as RegistryComponent,
  [BLOCKS.TRUST_BUILDING]: TrustBuildingResolver as RegistryComponent,
  [BLOCKS.BENEFITS]: BenefitsResolver as RegistryComponent,
  [BLOCKS.PRICING]: PricingResolver as RegistryComponent,
  [BLOCKS.AUTOMATION_PROCESS]: ProcessResolver as RegistryComponent,
  [BLOCKS.CLUTCH_WIDGET]: ClutchWidgetResolver as RegistryComponent,
  [BLOCKS.CASE_STUDY_BLOCK]: TechnicalValidationResolver as RegistryComponent,
  [BLOCKS.OFFER]: OfferBlockResolver as RegistryComponent,
  [BLOCKS.SPLIT_BLOCK]: SplitBlock as RegistryComponent,
  [BLOCKS.INDUSTRY_BLOCK]: IndustryResolver as RegistryComponent,
  [BLOCKS.CTA_FORM]: CtaForm as RegistryComponent,
};

// ─── Home Block Registry ───────────────────────────────────────────────────────

export const blockRegistry: Registry = {
  ...sharedRegistry,
  [BLOCKS.HERO]: HeroV2 as RegistryComponent,
  [BLOCKS.SERVICE_HERO]: SectionHeroResolver as RegistryComponent,
  [BLOCKS.CERTIFICATION]: () => null,
};

// ─── Service Block Registry ────────────────────────────────────────────────────

export const serviceBlockRegistry: Registry = {
  ...sharedRegistry,
  [BLOCKS.SERVICE_HERO]: SectionHeroResolver as RegistryComponent,
};

// ─── Case Study Block Registry ────────────────────────────────────────────────

export const caseStudyBlockRegistry: Registry = {
  [BLOCKS.CASE_STUDY_HERO]: CaseStudyHeroAdapter,
  [BLOCKS.CASE_STUDY_INFO]: () => null, // info data is consumed by the hero adapter
  [BLOCKS.CASE_STUDY_STATS]: CaseStudyStats as RegistryComponent,
  [BLOCKS.CASE_STUDY_TECH_STACK]: CaseStudyTools as RegistryComponent,
  [BLOCKS.CASE_STUDY_TESTIMONIAL]: CaseStudyTestimonial as RegistryComponent,
  [BLOCKS.CASE_STUDY_MAIN_CONTENT]: CaseStudyMainContent as RegistryComponent,
};

// ─── Hire QA Engineer Block Registry ───────────────────────────────────────────


export const hireQaEngineerBlockRegistry: Registry = {
  ...serviceBlockRegistry, // Re-use all service blocks
  [BLOCKS.SERVICE_HERO]: SectionHeroResolver as RegistryComponent,
  [BLOCKS.OFFER]: OfferBlockResolver as RegistryComponent,
};

// ─── Become Partner Block Registry ─────────────────────────────────────────────

export const becomePartnerBlockRegistry: Registry = {
  ...serviceBlockRegistry, // Re-use all service blocks
  [BLOCKS.SERVICE_HERO]: SectionHeroResolver as RegistryComponent,
  [BLOCKS.OFFER]: OfferBlockResolver as RegistryComponent,
};

// ─── Industry Block Registry ───────────────────────────────────────────────────

export const industryBlockRegistry: Registry = {
  ...sharedRegistry,
  [BLOCKS.SERVICE_HERO]: SectionHeroResolver as RegistryComponent,
  [BLOCKS.OFFER]: OfferBlockResolver as RegistryComponent,
};

// ─── About Us Block Registry ───────────────────────────────────────────────────

export const aboutUsBlockRegistry: Registry = {
  ...sharedRegistry,
  [BLOCKS.SERVICE_HERO]: SectionHeroResolver as RegistryComponent,
  [BLOCKS.TEAM_BLOCK]: TeamBlockResolver as RegistryComponent,
  [BLOCKS.SPLIT_BLOCK]: SplitBlock as RegistryComponent,
  [BLOCKS.OFFICE_GALLERY_BLOCK]: OfficeGalleryResolver as RegistryComponent,
  [BLOCKS.HEADING_BLOCK]: () => null, // Standalone heading block — rendered inline if needed
};

// ─── Engagement Model Block Registry ───────────────────────────────────────────

export const engagementModelBlockRegistry: Registry = {
  ...aboutUsBlockRegistry,
};

// ─── Life at PrimeQA Block Registry ───────────────────────────────────────────

export const lifeAtPrimeqaBlockRegistry: Registry = {
  ...aboutUsBlockRegistry,
};

// ─── Whom We Work With Block Registry ─────────────────────────────────────────

export const whomWeWorkWithBlockRegistry: Registry = {
  ...aboutUsBlockRegistry,
};

// ─── Helper ────────────────────────────────────────────────────────────────────

/** Returns the component from a given registry or undefined */
export function getBlockComponent(
  componentName: string,
  registry: Registry = blockRegistry,
): RegistryComponent | undefined {
  return registry[componentName];
}

