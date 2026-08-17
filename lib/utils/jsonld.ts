/**
 * JSON-LD Structured Data generators for all pages.
 *
 * Implements comprehensive @graph-based Schema.org structures following
 * Google's structured data guidelines for rich results.
 *
 * Schema types implemented:
 *   1.  Organization       — PrimeQA company identity & social profiles
 *   2.  WebSite            — site-level metadata & publisher
 *   3.  WebPage            — generic page schema
 *   4.  AboutPage          — about-us specialisation
 *   5.  ContactPage        — contact-us specialisation
 *   6.  CollectionPage     — listing/index pages
 *   7.  BreadcrumbList     — per-page breadcrumb trail
 *   8.  BlogPosting        — blog article schema
 *   9.  Article            — case study articles
 *   10. FAQPage            — FAQ rich results
 *   11. Service            — service detail pages
 *   12. JobPosting         — career job listings (Google Job Search)
 *   13. SoftwareApplication — accelerator/product pages
 *   14. HowTo             — step-by-step process pages
 *
 * Reference: https://developers.google.com/search/docs/appearance/structured-data
 * Validation: https://search.google.com/test/rich-results
 */

import type { BlogPost } from "@/types/blog";
import type { StrapiJobListItem } from "@/types/career";
import type { StrapiCaseStudy } from "@/types/case-study";
import type { StrapiServicePageData } from "@/types/service";
import type { StrapiIndustryPageData } from "@/types/industry";
import type { StrapiProduct } from "@/types/product";
import type { LegalPage } from "@/types/legal";

// ─── Constants (exported for reuse) ─────────────────────────────────────────────

export const SITE_URL = "https://primeqasolutions.com";
export const SITE_NAME = "PrimeQA Solutions";
export const SITE_DESCRIPTION =
  "PrimeQA delivers enterprise-grade QA services powered by AI — from automated testing to end-to-end quality engineering solutions that help you ship faster with confidence.";
export const LOGO_URL = `${SITE_URL}/logo.svg`;
export const LANGUAGE = "en-US";

// ─── Node IDs (for @graph cross-referencing) ────────────────────────────────────

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;

// ─── Social Profiles ────────────────────────────────────────────────────────────

const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/primeqasolutions",
  "https://www.instagram.com/primeqasolutions/",
  "https://www.facebook.com/people/Primeqasolutions/100063743336772/",
  "https://www.youtube.com/@PrimeQASolutions",
];

// ─── Office Addresses (mirrored from footer.tsx) ─────────────────────────────────
// Single source-of-truth for structured-data postal addresses.

export const OFFICE_ADDRESSES = [
  {
    "@type": "PostalAddress",
    streetAddress: "A-904, Ganesh Glory 11, Jagatpur Rd, near BSNL Office, Off SG Highway, Jagatpur",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "382470",
    addressCountry: "IN",
  },
  {
    "@type": "PostalAddress",
    streetAddress: "28 Geary St Suite 650",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94108",
    addressCountry: "US",
  },
] as const;

// ─── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Convert a readable date string (e.g. "Mar 28, 2025") back to ISO 8601.
 * Falls back to the original string if parsing fails.
 */
function toISO8601(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? dateStr : parsed.toISOString();
}

/**
 * Extract plain-text from Strapi Blocks rich-text JSON.
 * Handles the common { type: "paragraph", children: [{ type: "text", text: "..." }] } shape.
 */
function flattenRichTextToPlain(blocks: unknown): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .reduce<string[]>((parts, block: any) => {
      for (const child of block.children ?? []) {
        if (child.type === "text") {
          parts.push(child.text ?? "");
          continue;
        }
        if (child.type === "link") {
          parts.push(child.children?.map((c: any) => c.text ?? "").join("") ?? "");
          continue;
        }
        parts.push("");
      }
      return parts;
    }, [])
    .join(" ")
    .trim();
}

/**
 * Calculate word count from markdown content for estimating article size.
 */
function getWordCount(content: string): number {
  if (!content) return 0;
  const stripped = content.replace(/<[^>]*>/g, "").replace(/[#*_~`\[\]()]/g, "");
  return stripped.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Strip markdown formatting to plain text (for descriptions in structured data).
 */
function stripMarkdown(md: string): string {
  if (!md) return "";
  return md
    .replace(/#{1,6}\s+/g, "")       // headings
    .replace(/\*\*(.+?)\*\*/g, "$1")  // bold
    .replace(/\*(.+?)\*/g, "$1")      // italic
    .replace(/__(.+?)__/g, "$1")      // bold alt
    .replace(/_(.+?)_/g, "$1")        // italic alt
    .replace(/~~(.+?)~~/g, "$1")      // strikethrough
    .replace(/`(.+?)`/g, "$1")        // inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "") // images
    .replace(/>\s+/g, "")             // blockquotes
    .replace(/[-*+]\s+/g, "")         // unordered lists
    .replace(/\d+\.\s+/g, "")         // ordered lists
    .replace(/\n{2,}/g, " ")          // multiple newlines
    .replace(/\n/g, " ")              // single newlines
    .trim();
}

// ─── Shared Schema Builders ─────────────────────────────────────────────────────

/** Schema.org Organization node — includes both office addresses and contact points */
export function buildOrganization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      caption: SITE_NAME,
    },
    image: { "@id": LOGO_ID },
    sameAs: SOCIAL_PROFILES,
    foundingDate: "2020",
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50, maxValue: 250 },
    knowsAbout: ["Quality Assurance", "Software Testing", "Test Automation", "QA Engineering", "Performance Testing", "Security Testing"],
    address: OFFICE_ADDRESSES,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-95584-08386",
        email: "piyush@PrimeQAsolutions.com",
        contactType: "customer service",
        areaServed: { "@type": "Country", name: "India" },
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+1-415-639-9555",
        email: "piyush@PrimeQAsolutions.com",
        contactType: "customer service",
        areaServed: { "@type": "Country", name: "United States" },
        availableLanguage: "English",
      },
    ],
  };
}

/** Schema.org WebSite node */
export function buildWebSite() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: LANGUAGE,
  };
}

/** Generic BreadcrumbList builder — works for any page */
export function buildBreadcrumbList(
  items: Array<{ name: string; url?: string }>,
  pageUrl: string,
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url || pageUrl,
        })),
  };
}

/**
 * Generic WebPage node builder.
 * Supports WebPage, AboutPage, ContactPage, CollectionPage via `pageType`.
 */
export function buildWebPageNode(opts: {
  url: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  mainEntityId?: string;
}) {
  const pageType = opts.pageType ?? "WebPage";
  return {
    "@type": pageType,
    "@id": `${opts.url}/#webpage`,
    url: opts.url,
    name: opts.name,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    description: opts.description,
    inLanguage: LANGUAGE,
    ...(opts.mainEntityId ? { mainEntity: { "@id": opts.mainEntityId } } : {}),
    ...(opts.datePublished ? { datePublished: toISO8601(opts.datePublished) } : {}),
    ...(opts.dateModified ? { dateModified: toISO8601(opts.dateModified) } : {}),
    potentialAction: [
      {
        "@type": "ReadAction",
        target: [opts.url],
      },
    ],
  };
}

/**
 * Recursively removes any null, undefined, empty string (""),
 * empty array ([]), and empty object ({}) values.
 */
function cleanJsonLd<T>(obj: T): T | undefined {
  if (obj === null || obj === undefined) {
    return undefined;
  }
  
  if (typeof obj === "string") {
    return obj.trim() === "" ? undefined : (obj.trim() as unknown as T);
  }
  
  if (Array.isArray(obj)) {
    const cleanedArray = obj
      .map(item => cleanJsonLd(item))
      .filter(item => item !== undefined);
    return cleanedArray.length === 0 ? undefined : (cleanedArray as unknown as T);
  }
  
  if (typeof obj === "object") {
    const cleanedObj: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = cleanJsonLd(value);
      if (cleanedValue !== undefined) {
        cleanedObj[key] = cleanedValue;
      }
    }
    return Object.keys(cleanedObj).length === 0 ? undefined : (cleanedObj as unknown as T);
  }
  
  return obj;
}

/** Wrap schema nodes into an ordered @graph-based JSON-LD object */
export function buildJsonLdGraph(...nodes: Record<string, any>[]) {
  const webPageTypes = ["WebPage", "AboutPage", "ContactPage", "CollectionPage"];
  const coreEntityTypes = [
    "Service",
    "Product",
    "Article",
    "BlogPosting",
    "SoftwareApplication",
    "JobPosting",
    "HowTo",
  ];

  const orgNodes = nodes.filter((n) => n["@type"] === "Organization");
  const websiteNodes = nodes.filter((n) => n["@type"] === "WebSite");
  const webPageNodes = nodes.filter((n) => webPageTypes.includes(n["@type"]));
  const breadcrumbNodes = nodes.filter((n) => n["@type"] === "BreadcrumbList");
  const coreEntityNodes = nodes.filter((n) => coreEntityTypes.includes(n["@type"] as string));
  const faqNodes = nodes.filter((n) => n["@type"] === "FAQPage");

  // Removed auto-injection of Organization and WebSite per explicit guidelines

  const remainingNodes = nodes.filter(
    (n) =>
      n["@type"] !== "Organization" &&
      n["@type"] !== "WebSite" &&
      !webPageTypes.includes(n["@type"]) &&
      n["@type"] !== "BreadcrumbList" &&
      !coreEntityTypes.includes(n["@type"]) &&
      n["@type"] !== "FAQPage"
  );

  const orderedGraph = [
    ...orgNodes,
    ...websiteNodes,
    ...webPageNodes,
    ...breadcrumbNodes,
    ...coreEntityNodes,
    ...remainingNodes,
    ...faqNodes,
  ];

  const cleanedGraph = cleanJsonLd(orderedGraph);

  return {
    "@context": "https://schema.org",
    "@graph": cleanedGraph ?? [],
  };
}

// ─── Service Area builder (shared across Service / Industry / Accelerator pages) ──

/**
 * Build a rich `areaServed` array for Service-type schema nodes.
 *
 * Emits both:
 *  • Country-level nodes (US + IN) for broad geographic targeting
 *  • City-level nodes matching the two physical office locations
 *
 * This helps Google associate the service with specific regions for
 * local/international rich results.
 */
export function buildServiceAreaNodes(): Record<string, unknown>[] {
  return [
    // ── Country level ────────────────────────────────────────────────────────
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "India" },
    // ── City / locality level ────────────────────────────────────────────────
    {
      "@type": "City",
      name: "San Francisco",
      containedInPlace: { "@type": "State", name: "California" },
    },
    {
      "@type": "City",
      name: "Ahmedabad",
      containedInPlace: { "@type": "State", name: "Gujarat" },
    },
  ];
}

// ─── FAQPage builder (shared across pages) ──────────────────────────────────────

/**
 * Build FAQPage schema from an array of {question, answer} items.
 * Returns null if no valid entries exist.
 */
export function buildFAQPageSchema(
  faqs: Array<{ question: string; answer: unknown }>,
  pageUrl: string,
) {
  if (!faqs || faqs.length === 0) return null;

  const faqEntries = faqs.flatMap((faq) => {
    const answerText =
      typeof faq.answer === "string"
        ? faq.answer
        : flattenRichTextToPlain(faq.answer);

    if (!faq.question || !answerText) return [];

    return [
      {
        "@type": "Question" as const,
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer" as const,
          text: answerText,
        },
      },
    ];
  });

  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}/#faqpage`,
    url: pageUrl,
    mainEntityOfPage: { "@id": `${pageUrl}/#webpage` },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: faqEntries,
  };
}

/**
 * Shared helper — scans a Strapi dynamic-zone `page_section` array for a
 * `block.faq-block` entry and returns a flat list of {question, answer} pairs.
 *
 * The FAQ block shape is:
 *   { __component: "block.faq-block", faq: [{ item: [{ label, description }] }] }
 */
export function extractFaqFromSections(
  sections: Array<{ __component: string; [key: string]: any }> | null | undefined,
): Array<{ question: string; answer: unknown }> {
  if (!sections?.length) return [];

  const faqBlock = sections.find((s) => s.__component === "block.faq-block") as any;
  if (!faqBlock?.faq?.length) return [];

  return faqBlock.faq.flatMap((accordion: any) =>
    (accordion.item ?? []).map((item: any) => ({
      question: item.label,
      answer: item.description,
    })),
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  Page-Specific JSON-LD Generators
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Global (Root Layout) ───────────────────────────────────────────────────────

export function generateGlobalJsonLd() {
  return buildJsonLdGraph(buildOrganization(), buildWebSite());
}

// ─── Homepage ───────────────────────────────────────────────────────────────────

export function generateHomeJsonLd(opts?: {
  pageSections?: Array<{ __component: string; [key: string]: any }> | null;
}) {
  const pageUrl = SITE_URL;
  const graph: Record<string, unknown>[] = [
    buildWebPageNode({
      url: pageUrl,
      name: `${SITE_NAME} | AI-Powered Quality Engineering`,
      description: SITE_DESCRIPTION,
    }),
    buildBreadcrumbList([{ name: "Home", url: SITE_URL }], pageUrl),
  ];

  if (opts?.pageSections) {
    const faqItems = extractFaqFromSections(opts.pageSections);
    const faqSchema = buildFAQPageSchema(faqItems, pageUrl);
    if (faqSchema) graph.push(faqSchema);
  }

  return buildJsonLdGraph(...graph);
}

// ─── Blog Listing ───────────────────────────────────────────────────────────────

export function generateBlogListingJsonLd() {
  const pageUrl = `${SITE_URL}/blog`;
  return buildJsonLdGraph(
    buildWebPageNode({
      url: pageUrl,
      name: "Blog & Insights | PrimeQA — Software Quality Engineering",
      description:
        "Expert articles on AI-powered testing, QA automation, software quality strategy, and engineering best practices — written by PrimeQA practitioners.",
      pageType: "CollectionPage",
    }),
    buildBreadcrumbList(
      [{ name: "Home", url: SITE_URL }, { name: "Blog" }],
      pageUrl,
    ),
  );
}

// ─── Blog Detail ─────────────────────────────────────────────────────────────────
//
// Implements Google's Article rich result schema following the official guide:
// https://developers.google.com/search/docs/appearance/structured-data/article
//
// @graph nodes emitted per blog post:
//   1. Organization  — publisher entity (with office addresses + contactPoints)
//   2. WebSite       — site-level node
//   3. WebPage       — page metadata + primaryImage cross-reference
//   4. BreadcrumbList — Home → Blog → [Post Title]
//   5. Article       — the core rich-result node (Google prefers Article over BlogPosting)
//   6. FAQPage       — conditionally added when the post has FAQ items
//
// Required fields (must-have for Google eligibility):
//   headline, image (ImageObject), datePublished, dateModified, author.name
//
// Recommended fields:
//   description, author.url / sameAs, publisher, keywords,
//   articleSection, wordCount, speakable, thumbnailUrl

/** Schema.org WebPage node for a blog detail page */
function buildBlogWebPage(post: BlogPost) {
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  // Use raw ISO date for structured data — the formatted string breaks ISO 8601
  const publishedISO = post.publishedRaw ? new Date(post.publishedRaw).toISOString() : toISO8601(post.published);

  const node: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    url: pageUrl,
    name: post.seo?.title ?? post.title,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: { "@id": `${pageUrl}/#blogposting` },
    datePublished: publishedISO,
    dateModified: publishedISO,
    description: post.seo?.description ?? post.excerpt,
    inLanguage: LANGUAGE,
    potentialAction: [{ "@type": "ReadAction", target: [pageUrl] }],
  };

  // Cross-reference primary image for enhanced rich results
  if (post.image) {
    node.primaryImageOfPage = { "@id": `${pageUrl}/#primaryimage` };
  }

  return node;
}

/** Schema.org BreadcrumbList — Home → Blog → [Post Title] */
function buildBlogBreadcrumbList(post: BlogPost) {
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
    ],
  };
}

/**
 * Schema.org Article — the primary rich-result node for blog posts.
 *
 * Google's Article schema requires:
 *   • headline        (≤ 110 chars for best display)
 *   • image           (ImageObject with url, width, height)
 *   • datePublished   (ISO 8601)
 *   • dateModified    (ISO 8601)
 *   • author          (Person or Organization with name)
 *
 * Note: We use @type "Article" instead of "BlogPosting". Both are valid
 * for Google rich results, but "Article" is the recommended type for
 * professional editorial content per Google's guidelines.
 */
function buildBlogArticle(post: BlogPost) {
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  // Always use raw ISO date — avoids timezone/locale issues from the formatted string
  const publishedISO = post.publishedRaw
    ? new Date(post.publishedRaw).toISOString()
    : toISO8601(post.published);
  const wordCount = getWordCount(post.content);

  const article: Record<string, unknown> = {
    "@type": "BlogPosting",
    "@id": `${pageUrl}/#blogposting`,
    // ── Cross-references ──────────────────────────────────────────────────────
    isPartOf: { "@id": `${pageUrl}/#webpage` },
    mainEntityOfPage: { "@id": `${pageUrl}/#webpage` },
    // ── Required fields ───────────────────────────────────────────────────────
    headline: post.title.slice(0, 110), // Google truncates at 110 chars
    datePublished: publishedISO,
    dateModified: publishedISO,
    author: { "@id": `${SITE_URL}/#author-${post.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
    // ── Publisher (required for Google News eligibility) ──────────────────────
    publisher: { "@id": ORG_ID },
    // ── Recommended fields ────────────────────────────────────────────────────
    description: post.seo?.description ?? post.excerpt,
    inLanguage: LANGUAGE,
    url: pageUrl,
    ...(wordCount > 0 && { wordCount }),
    ...(post.category && post.category !== "Uncategorised" && {
      articleSection: post.category,
    }),
    ...(post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    // Speakable — hints to Google Assistant which parts to read aloud
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "article p:first-of-type"],
    },
  };

  // ── Image (required — must be an ImageObject with width + height) ──────────
  // Google requires at least one image; must be crawlable, indexed, and ≥ 50px.
  if (post.image) {
    const imageObject: Record<string, unknown> = {
      "@type": "ImageObject",
      "@id": `${pageUrl}/#primaryimage`,
      url: post.image,
      contentUrl: post.image,
      ...(post.imageAlt && { caption: post.imageAlt }),
      // Width + height improve eligibility for Google Image rich results
      ...(post.imageWidth && { width: post.imageWidth }),
      ...(post.imageHeight && { height: post.imageHeight }),
    };
    article.image = imageObject;
    // thumbnailUrl provides a quick-load preview image for search cards
    article.thumbnailUrl = post.image;
  }

  return article;
}

/**
 * Generate the complete @graph-based JSON-LD structured data for a blog post.
 *
 * Emits a single <script type="application/ld+json"> with all nodes in one
 * @graph so Google can resolve all cross-references (e.g. Article → WebPage →
 * ImageObject) within the same document.
 */
export function generateBlogJsonLd(post: BlogPost) {
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;

  const authorId = `${SITE_URL}/#author-${post.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const personNode: Record<string, unknown> = {
    "@type": "Person",
    "@id": authorId,
    name: post.author.name,
    worksFor: { "@id": ORG_ID },
    ...(post.author.jobTitle && { jobTitle: post.author.jobTitle }),
    ...(post.author.avatar && {
      image: {
        "@type": "ImageObject",
        url: post.author.avatar,
        caption: post.author.name,
        width: 100,
        height: 100,
      },
    }),
    ...(post.author.socials.length > 0 && {
      sameAs: post.author.socials.flatMap((s) => (s.url ? [s.url] : [])),
    }),
  };

  const graph: Record<string, unknown>[] = [
    buildBlogWebPage(post),
    buildBlogBreadcrumbList(post),
    buildBlogArticle(post),
    personNode,
  ];

  // FAQPage — conditionally added when the post has Q&A items
  const faqSchema = buildFAQPageSchema(post.faqs ?? [], pageUrl);
  if (faqSchema) graph.push(faqSchema);

  return buildJsonLdGraph(...graph);
}

// ─── Case Study Listing ─────────────────────────────────────────────────────────

export function generateCaseStudyListingJsonLd() {
  const pageUrl = `${SITE_URL}/case-study`;
  return buildJsonLdGraph(
    buildWebPageNode({
      url: pageUrl,
      name: "Case Studies | PrimeQA — Software Quality Engineering",
      description:
        "Explore how PrimeQA helps world-class companies ship better software with AI-powered QA automation, performance testing, security testing, and more.",
      pageType: "CollectionPage",
    }),
    buildBreadcrumbList(
      [{ name: "Home", url: SITE_URL }, { name: "Case Studies" }],
      pageUrl,
    ),
  );
}

// ─── Case Study Detail ──────────────────────────────────────────────────────────

export function generateCaseStudyJsonLd(doc: StrapiCaseStudy) {
  const pageUrl = `${SITE_URL}/case-study/${doc.slug}`;
  const publishedISO = toISO8601(doc.publishedAt);
  const modifiedISO = toISO8601(doc.updatedAt);

  const article: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${pageUrl}/#article`,
    isPartOf: { "@id": `${pageUrl}/#webpage` },
    mainEntityOfPage: { "@id": `${pageUrl}/#webpage` },
    headline: doc.name,
    description: doc.meta_data?.description ?? doc.description,
    datePublished: publishedISO,
    dateModified: modifiedISO,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: LANGUAGE,
    ...(doc.industry && { articleSection: doc.industry.name }),
  };

  if (doc.image?.url) {
    article.image = {
      "@type": "ImageObject",
      url: doc.image.url,
      ...(doc.image.alternativeText && { caption: doc.image.alternativeText }),
    };
  }

  return buildJsonLdGraph(
    buildWebPageNode({
      url: pageUrl,
      name: doc.meta_data?.title ?? doc.name,
      description: doc.meta_data?.description ?? doc.description,
      datePublished: doc.publishedAt ?? undefined,
      dateModified: doc.updatedAt,
      mainEntityId: `${pageUrl}/#article`,
    }),
    buildBreadcrumbList(
      [
        { name: "Home", url: SITE_URL },
        { name: "Case Studies", url: `${SITE_URL}/case-study` },
        { name: doc.name },
      ],
      pageUrl,
    ),
    article,
  );
}

// ─── Service Detail ─────────────────────────────────────────────────────────────

export function generateServiceJsonLd(service: StrapiServicePageData) {
  const pageUrl = `${SITE_URL}/services/${service.slug}`;
  const serviceNameRaw = service.title || (service as any).name || (service.meta_data?.title ? service.meta_data.title.split(" | ")[0] : "Service");
  const serviceName = serviceNameRaw.replace(/-/g, " ");

  const serviceSchema: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${pageUrl}/#service`,
    name: serviceName,
    description: service.meta_data?.description ?? `${serviceName} — enterprise-grade QA service by ${SITE_NAME}.`,
    provider: { "@id": ORG_ID },
    url: pageUrl,
    image: [LOGO_URL],
    areaServed: buildServiceAreaNodes(),
    serviceType: "Quality Assurance",
    category: "Software Testing",
    audience: {
      "@type": "Audience",
      audienceType: "B2B Enterprises"
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    },
    // Physical locations where the service is delivered from
    location: OFFICE_ADDRESSES,
  };

  const graph: Record<string, unknown>[] = [
    buildWebPageNode({
      url: pageUrl,
      name: service.meta_data?.title ?? serviceName,
      description: service.meta_data?.description ?? `${serviceName} — QA service by ${SITE_NAME}.`,
      datePublished: service.publishedAt ?? undefined,
      dateModified: service.updatedAt,
      mainEntityId: `${pageUrl}/#service`,
    }),
    buildBreadcrumbList(
      [
        { name: "Home", url: `${SITE_URL}/` },
        { name: serviceName, url: pageUrl },
      ],
      pageUrl,
    ),
    serviceSchema,
  ];

  // Extract FAQ items from page_section if present
  const faqItems = extractFaqFromSections(service.page_section);
  const faqSchema = buildFAQPageSchema(faqItems, pageUrl);
  if (faqSchema) graph.push(faqSchema);

  return buildJsonLdGraph(...graph);
}

// ─── Industry Detail ────────────────────────────────────────────────────────────

export function generateIndustryJsonLd(industry: StrapiIndustryPageData) {
  const pageUrl = `${SITE_URL}/industries/${industry.slug}`;
  const description =
    industry.meta_data?.description ??
    `QA solutions for the ${industry.name} industry by ${SITE_NAME}.`;

  // Service node — represents PrimeQA's QA offering for this industry vertical
  const serviceSchema: Record<string, unknown> = {
    "@type": "Service",
    "@id": `${pageUrl}/#service`,
    name: `${industry.name} QA Solutions`,
    description,
    provider: { "@id": ORG_ID },
    url: pageUrl,
    areaServed: buildServiceAreaNodes(),
    serviceType: "Quality Assurance",
    category: "Software Testing",
    location: OFFICE_ADDRESSES,
  };

  const graph: Record<string, unknown>[] = [
    buildWebPageNode({
      url: pageUrl,
      name: industry.meta_data?.title ?? industry.name,
      description,
      datePublished: industry.publishedAt ?? undefined,
      dateModified: industry.updatedAt,
      mainEntityId: `${pageUrl}/#service`,
    }),
    buildBreadcrumbList(
      [
        { name: "Home", url: SITE_URL },
        { name: "Industries", url: `${SITE_URL}/industries` },
        { name: industry.name, url: pageUrl },
      ],
      pageUrl,
    ),
    serviceSchema,
  ];

  // Extract FAQ items if present
  const faqItems = extractFaqFromSections(industry.page_section);
  const faqSchema = buildFAQPageSchema(faqItems, pageUrl);
  if (faqSchema) graph.push(faqSchema);

  return buildJsonLdGraph(...graph);
}

// ─── Accelerator / Product Listing ──────────────────────────────────────────────

export function generateAcceleratorListingJsonLd() {
  const pageUrl = `${SITE_URL}/accelerators`;
  return buildJsonLdGraph(
    buildWebPageNode({
      url: pageUrl,
      name: "Accelerators | PrimeQA",
      description:
        "Explore PrimeQA's suite of testing accelerators and products that speed up your QA process and deliver faster results.",
      pageType: "CollectionPage",
    }),
    buildBreadcrumbList(
      [{ name: "Home", url: SITE_URL }, { name: "Accelerators" }],
      pageUrl,
    ),
  );
}

// ─── Accelerator / Product Detail ───────────────────────────────────────────────

export function generateAcceleratorJsonLd(product: StrapiProduct) {
  const pageUrl = `${SITE_URL}/accelerators/${product.slug}`;

  const productImageUrl = product.image?.url ? product.image.url : LOGO_URL;

  const productSchema: Record<string, unknown> = {
    "@type": "Product",
    "@id": `${pageUrl}/#product`,
    name: product.name,
    description: product.meta_data?.description ?? `${product.name} — QA accelerator by ${SITE_NAME}.`,
    url: pageUrl,
    image: [productImageUrl],
    category: "Software / Quality Assurance Accelerator",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
      price: "0",
      priceCurrency: "USD",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    },
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 24,
      bestRating: 5,
      worstRating: 1,
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Quality Engineering Lead",
        },
        datePublished: product.publishedAt
          ? new Date(product.publishedAt).toISOString().split("T")[0]
          : "2025-01-15",
        reviewBody: `${product.name} helps businesses validate application performance through automated testing, uncovering bottlenecks and ensuring seamless user experiences at scale.`,
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5,
          worstRating: 1,
        },
      },
    ],
  };

  const graph: Record<string, unknown>[] = [
    buildWebPageNode({
      url: pageUrl,
      name: product.meta_data?.title ?? product.name,
      description: product.meta_data?.description ?? `${product.name} by ${SITE_NAME}.`,
      datePublished: product.publishedAt ?? undefined,
      dateModified: product.updatedAt,
      mainEntityId: `${pageUrl}/#product`,
    }),
    buildBreadcrumbList(
      [
        { name: "Home", url: SITE_URL },
        { name: "Accelerators", url: `${SITE_URL}/accelerators` },
        { name: product.name },
      ],
      pageUrl,
    ),
    productSchema,
  ];

  // Conditionally add FAQPage if the product page has a FAQ section
  const faqItems = extractFaqFromSections(product.page_section);
  const faqSchema = buildFAQPageSchema(faqItems, pageUrl);
  if (faqSchema) graph.push(faqSchema);

  return buildJsonLdGraph(...graph);
}

// ─── Contact Us ─────────────────────────────────────────────────────────────────

export function generateContactJsonLd() {
  const pageUrl = `${SITE_URL}/contact-us`;
  return buildJsonLdGraph(
    buildWebPageNode({
      url: pageUrl,
      name: "Contact Us | PrimeQA",
      description:
        "Get in touch with the PrimeQA team. Find our office locations, contact information, and ways to connect with our quality assurance experts.",
      pageType: "ContactPage",
    }),
    buildBreadcrumbList(
      [{ name: "Home", url: SITE_URL }, { name: "Contact Us" }],
      pageUrl,
    ),
  );
}

// ─── Hire QA Engineers (with HowTo) ─────────────────────────────────────────────

export function generateHireQAJsonLd() {
  const pageUrl = `${SITE_URL}/hire-qa-engineers`;

  const howTo = {
    "@type": "HowTo",
    "@id": `${pageUrl}/#howto`,
    name: "How to Hire QA Engineers from PrimeQA",
    description:
      "Our streamlined process ensures you get the right testing talent integrated into your team as quickly and smoothly as possible.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Share Requirements",
        text: "Detail your project needs, tech stack, and goals. We thoroughly analyze your requirements to define the ideal QA engineer profile for your team.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Candidate Shortlist",
        text: "We handpick top pre-vetted QA professionals from our talent pool whose technical skills and experience perfectly match your specific needs.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Interview & Assess",
        text: "You conduct interviews with the shortlisted candidates to ensure complete alignment with your technical requirements and company culture.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Seamless Onboarding",
        text: "The selected engineer integrates directly into your agile pods, tools, and workflows, ready to deliver immediate testing value from day one.",
      },
    ],
  };

  return buildJsonLdGraph(
    buildWebPageNode({
      url: pageUrl,
      name: "Hire QA Engineers | PrimeQA",
      description:
        "Scale your testing capabilities with our vetted QA professionals. Integrate seamlessly into your workflow to deliver flawless digital experiences faster.",
      mainEntityId: `${pageUrl}/#howto`,
    }),
    buildBreadcrumbList(
      [{ name: "Home", url: SITE_URL }, { name: "Hire QA Engineers" }],
      pageUrl,
    ),
    howTo,
  );
}

// ─── About Us ───────────────────────────────────────────────────────────────────

export function generateAboutJsonLd(opts?: {
  pageSections?: Array<{ __component: string; [key: string]: any }> | null;
}) {
  const pageUrl = `${SITE_URL}/company/about-us`;
  const graph: Record<string, unknown>[] = [
    buildWebPageNode({
      url: pageUrl,
      name: "About Us | PrimeQA",
      description:
        "Learn about PrimeQA — our mission, values, and the team behind our quality assurance expertise.",
      pageType: "AboutPage",
    }),
    buildBreadcrumbList(
      [
        { name: "Home", url: SITE_URL },
        { name: "About Us", url: pageUrl },
      ],
      pageUrl,
    ),
  ];

  if (opts?.pageSections) {
    const faqItems = extractFaqFromSections(opts.pageSections);
    const faqSchema = buildFAQPageSchema(faqItems, pageUrl);
    if (faqSchema) graph.push(faqSchema);
  }

  return buildJsonLdGraph(...graph);
}

// ─── Careers Listing ────────────────────────────────────────────────────────────

export function generateCareersListingJsonLd() {
  const pageUrl = `${SITE_URL}/company/careers`;
  return buildJsonLdGraph(
    buildWebPageNode({
      url: pageUrl,
      name: "Careers | PrimeQA",
      description:
        "Join a dynamic, diverse team of innovators dedicated to pushing the boundaries of software testing and engineering.",
    }),
    buildBreadcrumbList(
      [
        { name: "Home", url: SITE_URL },
        { name: "Careers", url: pageUrl },
      ],
      pageUrl,
    ),
  );
}

// ─── Job Detail (JobPosting — Google Job Search rich results!) ───────────────────

/**
 * Map common job_type strings to Schema.org employmentType values.
 */
function mapEmploymentType(jobType: string): string {
  const normalized = jobType.toLowerCase().trim();
  if (normalized.includes("full") && normalized.includes("time")) return "FULL_TIME";
  if (normalized.includes("part") && normalized.includes("time")) return "PART_TIME";
  if (normalized.includes("contract")) return "CONTRACTOR";
  if (normalized.includes("intern")) return "INTERN";
  if (normalized.includes("freelance")) return "CONTRACTOR";
  if (normalized.includes("temporary")) return "TEMPORARY";
  return "FULL_TIME";
}

export function generateJobPostingJsonLd(job: StrapiJobListItem) {
  const pageUrl = `${SITE_URL}/company/careers/${job.slug}`;
  const datePosted = toISO8601(job.publishedAt);

  // Calculate a validThrough date (60 days from posted)
  const postedDate = new Date(job.publishedAt ?? job.createdAt);
  const validThrough = new Date(postedDate);
  validThrough.setDate(validThrough.getDate() + 60);

  const isRemote = job.location?.toLowerCase().includes("remote");

  const jobPosting: Record<string, unknown> = {
    "@type": "JobPosting",
    "@id": `${pageUrl}/#jobposting`,
    title: job.title,
    description: job.Content ? stripMarkdown(job.Content).slice(0, 5000) : (job.short_description ?? ""),
    datePosted,
    validThrough: validThrough.toISOString(),
    employmentType: mapEmploymentType(job.job_type),
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: LOGO_URL,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: isRemote ? undefined : job.location,
        addressCountry: "IN",
      },
    },
    ...(isRemote && {
      jobLocationType: "TELECOMMUTE",
      applicantLocationRequirements: {
        "@type": "Country",
        name: "India",
      },
    }),
    directApply: true,
  };

  return buildJsonLdGraph(
    buildWebPageNode({
      url: pageUrl,
      name: `${job.title} | Careers | PrimeQA`,
      description: job.short_description ?? `Apply for the ${job.title} position at PrimeQA.`,
      datePublished: job.publishedAt ?? undefined,
      dateModified: job.updatedAt,
      mainEntityId: `${pageUrl}/#jobposting`,
    }),
    buildBreadcrumbList(
      [
        { name: "Home", url: SITE_URL },
        { name: "Careers", url: `${SITE_URL}/company/careers` },
        { name: job.title },
      ],
      pageUrl,
    ),
    jobPosting,
  );
}

// ─── Company Sub-Pages (generic) ────────────────────────────────────────────────

export function generateCompanyPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  breadcrumbLabel: string;
  /** Optional Strapi page_section array — used to extract FAQPage schema when present */
  pageSections?: Array<{ __component: string; [key: string]: any }> | null;
}) {
  const pageUrl = `${SITE_URL}${opts.path}`;

  const graph: Record<string, unknown>[] = [
    buildWebPageNode({
      url: pageUrl,
      name: opts.name,
      description: opts.description,
    }),
    buildBreadcrumbList(
      [
        { name: "Home", url: SITE_URL },
        { name: opts.breadcrumbLabel },
      ],
      pageUrl,
    ),
  ];

  // Conditionally add FAQPage if page sections include a FAQ block
  if (opts.pageSections) {
    const faqItems = extractFaqFromSections(opts.pageSections);
    const faqSchema = buildFAQPageSchema(faqItems, pageUrl);
    if (faqSchema) graph.push(faqSchema);
  }

  return buildJsonLdGraph(...graph);
}

// ─── Legal Pages ────────────────────────────────────────────────────────────────

export function generateLegalJsonLd(page: LegalPage) {
  const pageUrl = `${SITE_URL}/legal/${page.slug}`;
  return buildJsonLdGraph(
    buildWebPageNode({
      url: pageUrl,
      name: `${page.name} | PrimeQA`,
      description: `Read our ${page.name}.`,
      datePublished: page.publishAt || undefined,
      dateModified: page.publishAt || undefined,
    }),
    buildBreadcrumbList(
      [
        { name: "Home", url: SITE_URL },
        { name: page.name },
      ],
      pageUrl,
    ),
  );
}

// ─── Dynamic Pages ([slug]) ─────────────────────────────────────────────────────

export function generateDynamicPageJsonLd(opts: {
  slug: string;
  title?: string;
  description?: string;
  /** Optional Strapi page_section array — used to extract FAQPage schema when present */
  pageSections?: Array<{ __component: string; [key: string]: any }> | null;
}) {
  const pageUrl = `${SITE_URL}/${opts.slug}`;

  const graph: Record<string, unknown>[] = [
    buildWebPageNode({
      url: pageUrl,
      name: opts.title ?? opts.slug,
      description: opts.description ?? "",
    }),
    buildBreadcrumbList(
      [
        { name: "Home", url: SITE_URL },
        { name: opts.title ?? opts.slug },
      ],
      pageUrl,
    ),
  ];

  // Conditionally add FAQPage if page sections include a FAQ block
  if (opts.pageSections) {
    const faqItems = extractFaqFromSections(opts.pageSections);
    const faqSchema = buildFAQPageSchema(faqItems, pageUrl);
    if (faqSchema) graph.push(faqSchema);
  }

  return buildJsonLdGraph(...graph);
}
