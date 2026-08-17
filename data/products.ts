// ─── Types ───────────────────────────────────────────────────────────────────
// These types mirror what a backend API response would look like.
// When connecting to a backend, replace the exported `products` array
// with a fetch call that returns data conforming to these types.

export type ProductFeature = {
  /** Icon key — maps to an icon in the component's iconMap */
  icon: string;
  title: string;
  description: string;
};

export type ProductCTA = {
  label: string;
  href: string;
};

export type Product = {
  /** Unique identifier — used as the tab key */
  id: string;
  /** Short name shown in the tab pill */
  tab: string;
  /** Full display name shown in the content panel */
  name: string;
  /** One-line marketing tagline */
  tagline: string;
  /** Longer description paragraph */
  description: string;
  /** List of feature highlights shown below the description */
  features: ProductFeature[];
  /** Primary call-to-action button */
  cta: ProductCTA;
  /** Secondary link (e.g. learn more / docs) */
  secondaryCta?: ProductCTA;
  /** Path to the product screenshot / image (relative to /public) */
  image: string;
  /** Alt text for the product image */
  imageAlt: string;
};

// ─── Data ────────────────────────────────────────────────────────────────────
// Replace this static array with an API fetch in future.

export const products: Product[] = [
  {
    id: "prime-ai",
    tab: "Prime AI",
    name: "Prime AI",
    tagline: "AI-Powered Test Automation Platform",
    description:
      "Prime AI harnesses machine learning to build test suites that adapt as your UI evolves. Say goodbye to brittle scripts and hello to autonomous quality assurance that thinks ahead of your release cycle.",
    features: [
      {
        icon: "robot",
        title: "Self-Healing Scripts",
        description: "Locators auto-update when the DOM changes, slashing maintenance overhead by up to 80%.",
      },
      {
        icon: "chart",
        title: "Predictive Defect Analysis",
        description: "ML models surface high-risk code paths before you hit CI/CD, so defects never reach production.",
      },
     
    ],
    cta: { label: "Request a Demo", href: "/contact" },
    secondaryCta: { label: "View Docs", href: "/docs/prime-ai" },
    image: "/product1.png",
    imageAlt: "Prime AI dashboard showing self-healing test automation",
  },
  {
    id: "baseline-11",
    tab: "BaseLine 11",
    name: "BaseLine 11",
    tagline: "Enterprise-Grade Baseline Testing Platform",
    description:
      "BaseLine 11 gives your QA teams a single source of truth for test management, execution traceability, and compliance reporting — built to satisfy the most demanding enterprise audit requirements.",
    features: [
      {
        icon: "checkDouble",
        title: "Unified Test Repository",
        description: "Centralise test cases, plans, and runs in one searchable, version-controlled repository.",
      },
      {
        icon: "code",
        title: "API & UI Test Orchestration",
        description: "Schedule and parallelise cross-browser, API, and mobile suites from a single dashboard.",
      },
      {
        icon: "users",
        title: "Team Collaboration Boards",
        description: "Assign, review, and sign-off test artefacts with built-in approval workflows and comments.",
      },
      {
        icon: "docChart",
        title: "Compliance & Audit Reports",
        description: "One-click ISO, SOC 2, and GDPR-ready reports to satisfy your enterprise procurement teams.",
      },
    ],
    cta: { label: "Start Free Trial", href: "/contact" },
    secondaryCta: { label: "View Pricing", href: "/pricing" },
    image: "/product.png",
    imageAlt: "BaseLine 11 test management dashboard",
  },
  {
    id: "nexus-flow",
    tab: "Nexus Flow",
    name: "Nexus Flow",
    tagline: "Intelligent Workflow Automation",
    description:
      "Connect your entire toolchain with Nexus Flow. Our intelligent routing engine automatically parses, categorises, and triggers actions across your ecosystem without a single line of code.",
    features: [
      {
        icon: "bolt",
        title: "Lightning Fast Integrations",
        description: "Pre-built connectors for over 500 enterprise applications out of the box.",
      },
      {
        icon: "shield",
        title: "Enterprise Grade Security",
        description: "Bank-level encryption and full audit logs for every automation step.",
      },
    ],
    cta: { label: "Explore Connectors", href: "/contact" },
    secondaryCta: { label: "Read Docs", href: "/docs" },
    image: "/product.png",
    imageAlt: "Nexus Flow workflow dashboard",
  },
  {
    id: "quantum-sync",
    tab: "Quantum Sync",
    name: "Quantum Sync",
    tagline: "Real-time Data Synchronisation",
    description:
      "Eliminate data silos with Quantum Sync. Achieve bi-directional, real-time data flow between your legacy on-premise databases and modern cloud infrastructure.",
    features: [
      {
        icon: "code",
        title: "Zero-Downtime Migration",
        description: "Sync terabytes of data seamlessly without interrupting your business operations.",
      },
    ],
    cta: { label: "View Architecture", href: "/contact" },
    image: "/product1.png",
    imageAlt: "Quantum Sync data flow",
  },
  {
    id: "aura-insights",
    tab: "Aura Insights",
    name: "Aura Insights",
    tagline: "Predictive Analytics & BI",
    description:
      "Turn raw data into actionable intelligence. Aura Insights uses advanced machine learning models to forecast trends, identify bottlenecks, and recommend strategic improvements.",
    features: [
      {
        icon: "chart",
        title: "Interactive Dashboards",
        description: "Create stunning, real-time visualisations with our drag-and-drop builder.",
      },
      {
        icon: "users",
        title: "Collaborative Reporting",
        description: "Share insights securely with stakeholders via automated scheduled reports.",
      },
    ],
    cta: { label: "See Live Demo", href: "/contact" },
    image: "/product.png",
    imageAlt: "Aura Insights analytics dashboard",
  },
];
