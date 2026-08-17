/**
 * Centralized Block Component Names
 * ────────────────────────────────
 * This file serves as the single source of truth for all Strapi
 * dynamic-zone component identifiers.
 *
 * Using these constants ensures that:
 * 1. Types in types/home.ts match the Registry in lib/block-registry.ts.
 * 2. Populate logic in lib/strapi/home.ts matches the actual component names.
 * 3. Renaming a component in Strapi only requires a change in one place here.
 */

export const BLOCKS = {
  // Shared & Home Blocks
  HERO: "block.hero-block",
  SERVICES: "block.service-block",
  FEATURE: "block.feature-block",
  PRODUCTS: "block.products-block",
  CTA_BUTTON: "block.cta-button-block",
  CERTIFICATION: "block.certification-block",
  CLIENTS: "block.clients-logo",
  CLIENT_SUCCESS: "block.client-success-block",
  AI_ADVANTAGE: "block.ai-advantage-block",
  GLOBAL_EXCELLENCE: "block.global-excellence",
  METHODOLOGY: "block.collaboration-block",
  FAQ: "block.faq-block",
  BLOG: "block.blog",
  TECH_STACK: "block.tech-stack-block",
  CTA: "block.cta-block",
  CASE_STUDY_BLOCK: "block.case-study-block",
  CLUTCH_WIDGET: "block.clutch-widget-block",
  INDUSTRY_BLOCK: "block.industry-block",

  // Service Page Specific Blocks
  SERVICE_HERO: "block.service-hero",
  CLIENT_STRIP: "block.client-strip",
  TRUST_BUILDING: "block.trust-building-block",
  BENEFITS: "block.benifits-block",
  PRICING: "block.pricing-block",
  AUTOMATION_PROCESS: "block.automation-process",


  // Case Study Page Specific Blocks
  CASE_STUDY_HERO: "block.case-study-hero-block",
  CASE_STUDY_INFO: "block.case-study-info-block",
  CASE_STUDY_STATS: "block.case-study-state-block",
  CASE_STUDY_TECH_STACK: "block.case-study-tech-stack-block",
  CASE_STUDY_TESTIMONIAL: "block.client-success-item",
  CASE_STUDY_MAIN_CONTENT: "block.case-study-main-content-block",
  OFFER: "block.offer-block",

  // About Us Page Specific Blocks
  TEAM_BLOCK: "block.team-block",
  SPLIT_BLOCK: "block.split-block",
  HEADING_BLOCK: "block.heading-block",
  OFFICE_GALLERY_BLOCK: "block.office-gallery-block",
  CTA_FORM: "block.cta-form",
} as const;

export type BlockType = (typeof BLOCKS)[keyof typeof BLOCKS];
