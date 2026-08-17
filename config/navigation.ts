import {
  Building2, Users, Briefcase, Handshake, Network, UserPlus,
  Microscope, Settings, Shield, Accessibility, Smartphone, Server,
  Cloud, Cpu, Zap, Activity, Database, Blocks, Repeat,
  BookOpen, FileText, Calendar, Rss, Layers, CheckCircle, MonitorSmartphone, BookMarked,
  Landmark, HeartPulse, ShieldCheck, Radio, Code, ShoppingCart, Film, Plane, Gamepad2, GraduationCap,
  Target, Bot, Gauge, FileCode2, Calculator as CalculatorIcon,
  UserCheck, ClipboardCheck, Settings2, Lock,
  MonitorSpeaker,
  ListRestart
} from "lucide-react";

export interface NavLink {
  name: string;
  href: string;
  description?: string;
  icon?: any;
}

export interface NavFeatured {
  title: string;
  description: string;
  href: string;
  image?: string;
  tag?: string;
  actionText?: string;
}

export interface NavSection {
  title?: string;
  links: NavLink[];
}

export interface NavItem {
  title: string;
  href?: string;
  sections?: NavSection[];
  featured?: NavFeatured[];
}

export const navigationData: NavItem[] = [
  {
    title: "Services",
    sections: [
      {
        title: "Full-cycle testing services",
        links: [
          { name: "Functional Testing", href: "/services/functional-testing", icon: CheckCircle },
          { name: "Test Automation", href: "/services/test-automation", icon: Zap },
          { name: "Performance Testing", href: "/services/performance-testing-services", icon: Activity },
          { name: "Security Testing", href: "/services/security-testing-services", icon: Shield },
          { name: "Mobile App Testing", href: "/services/mobile-testing-services", icon: Smartphone },
          { name: "API Testing", href: "/services/api-testing-services", icon: Network },
          { name: "Accessibility Testing", href: "#", icon: Accessibility },
          { name: "Managed Testing Services", href: "#", icon: Settings },
          { name: "QA Consulting", href: "#", icon: Microscope },
          { name: "DevOps & CI/CD Testing", href: "#", icon: Repeat },
        ],
      },
      {
        title: "AI Solutions",
        links: [
          { name: "AI Testing", href: "/services/ai-testing", icon: Bot },
          { name: "AI-powered test automation", href: "#", icon: Cpu },
          { name: "Predictive test planning", href: "#", icon: Target },
          { name: "Intelligent test design", href: "#", icon: Layers },
        ],
      },
      {
        title: "Technologies & Platforms",
        links: [
          { name: "Web & Mobile", href: "#", icon: MonitorSmartphone },
          { name: "Cloud Testing (AWS/Azure)", href: "#", icon: Cloud },
          { name: "Salesforce Testing", href: "#", icon: Cloud },
          { name: "SaaS Testing", href: "#", icon: Blocks },
          { name: "ERP & CRM Testing", href: "#", icon: Database },
          { name: "IoT & Embedded Testing", href: "/services/iot-testing", icon: Server },
          { name: "AR/VR Testing", href: "#", icon: Gamepad2 },
        ],
      },
    ],
    featured: [
      {
        title: "FinTech App Security Upgrade",
        description: "How we helped a leading banking app achieve zero-vulnerability status and 99.9% uptime.",
        href: "/case-study/fintech-api-testing-case-study-ipayout",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",

        tag: "Case Study",
        actionText: "Read Case Study"
      }
    ]
  },
  {
    title: "Company",
    sections: [
      {
        title: "Who We Are",
        links: [
          { name: "About us", href: "/company/about-us", description: "Learn about our mission and values", icon: Building2 },
          { name: "Careers", href: "/company/careers", description: "Join our growing team of experts", icon: Briefcase },
          { name: "Life at PrimeQA", href: "/company/life-at-primeqa", description: "Discover our culture and workspace", icon: Users },
        ],
      },
      {
        title: "How We Work",
        links: [
          { name: "Whom We work with", href: "/company/whom-we-work-with", description: "See our trusted partners and clients", icon: Network },
          { name: "Engagement Models", href: "/contact-us", description: "Flexible ways to collaborate with us", icon: Handshake },
          { name: "Become a Partner", href: "/company/become-a-partner", description: "Explore partnership opportunities", icon: UserPlus },
        ],
      },
    ],
    featured: [
      {
        title: "Life at PrimeQA",
        description: "See what it's like to work with a team of passionate QA experts dedicated to excellence.",
        href: "/company/life-at-primeqa",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        tag: "Culture",
        actionText: "Explore Culture"
      }
    ]
  },
  {
    title: "Industries",
    sections: [
      {
        title: "Enterprise Sectors",
        links: [
          { name: "Banking and financial services", href: "/industries/fintech-banking-software-testing-services", icon: Landmark },
          { name: "Healthcare", href: "/industries/healthcare", icon: HeartPulse },
          { name: "Insurance", href: "/industries/insurance", icon: ShieldCheck },
          { name: "Telecommunications", href: "/contact-us", icon: Radio },
          { name: "Software development", href: "/industries/software-development", icon: Code },
        ],
      },
      {
        title: "Consumer & Emerging",
        links: [
          { name: "eCommerce", href: "/industries/ecommerce", icon: ShoppingCart },
          { name: "Media and entertainment", href: "/contact-us", icon: Film },
          { name: "Travel and hospitality", href: "/contact-us", icon: Plane },
          { name: "Gaming", href: "/industries/gaming", icon: Gamepad2 },
          { name: "Education", href: "/contact-us", icon: GraduationCap },
        ],
      },
    ],
    featured: [
      {
        title: "Healthcare Compliance QA",
        description: "Ensuring HIPAA compliance and flawless user experiences for medical platforms.",
        href: "/industries/healthcare",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        tag: "Industry Spotlight",
        actionText: "Explore Healthcare"
      }
    ]
  },
  {
    title: "Accelerators",
    href: "/accelerators",
    sections: [
      {
        title: "AI & Automation",
        links: [
          { name: "Baseline11", href: "/accelerators/baseline11", description: "Streamline your baseline testing", icon: Target },
          { name: "PrimeAI", href: "/accelerators/primeai", description: "Intelligent QA automation platform", icon: Bot },
          { name: "11Automation", href: "/accelerators/11automation", description: "Next-gen test execution engine", icon: Gauge },
        ],
      },
      {
        title: "Developer Tools",
        links: [
          { name: "JSON to JMX", href: "/accelerators/json-to-jmx-converter", description: "Convert JMeter files instantly", icon: FileCode2 },
          { name: "ROI Calculator", href: "/accelerators/performance-calculators", description: "Calculate your testing ROI", icon: CalculatorIcon },
        ],
      },
    ],
    featured: [
      {
        title: "Scaling with PrimeAI",
        description: "See how a Fortune 500 company reduced testing time by 40% using our custom AI accelerators.",
        href: "/case-study/ai-peekaboo-mobile-testing-case-study",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        tag: "Accelerator Success",
        actionText: "Read Success Story"
      }
    ]
  },
  {
    title: "Hire QA Engineers",
    sections: [
      {
        title: "Core Testing Experts",
        links: [
          { name: "Hire QA Testers", href: "/hire-qa-engineers/hire-qa", description: "Detail-oriented functional experts", icon: ClipboardCheck },
          { name: "Hire Automation Testers", href: "/contact-us", description: "SDETs skilled in Selenium, Cypress & more", icon: Settings2 },
          { name: "Detail-oriented functional experts", href: "/contact-us", description: "", icon: CheckCircle },
          { name: "SDETs skilled in Selenium, Cypress & more", href: "/contact-us", description: "", icon: Code },
          { name: "Hire Mobile App Testers", href: "/contact-us", description: "", icon: Smartphone },
          { name: "iOS and Android device specialists", href: "/contact-us", description: "", icon: MonitorSpeaker },


        ],
      },
      {
        title: "Specialized Talent",
        links: [
          { name: "Hire Security Testers", href: "/contact-us", description: "Certified ethical hackers & pen-testers", icon: Lock },
          { name: "Hire Performance Testers", href: "/contact-us", description: "Load and stress testing experts", icon: ListRestart },
          { name: "Load and stress testing experts", href: "/contact-us", description: "Specialists in load, stress, and performance engineering", icon: Activity },
          { name: "Experienced project managers & leads", href: "/contact-us", description: "Senior QA leadership for your teams", icon: Users },
          { name: "Hire QA Leads", href: "/contact-us", description: "Experienced project managers & leads", icon: UserCheck },
        ],
      },
    ],
    featured: [
      {
        title: "Hire Top QA Talent, Fast.",
        description: "Access pre-vetted, top 1% QA engineers with deep domain expertise—ready to embed with your team from day one. No lengthy hiring cycles.",
        href: "/contact-us",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=800",
        tag: "On-Demand Talent",
        actionText: "Contact us"
      }
    ]
  },
  {
    title: "Resources",
    sections: [
      {
        links: [
          { name: "Case study", href: "/case-study", description: "Real-world success stories", icon: FileText },
          { name: "Blogs", href: "/blog", description: "Insights from our QA experts", icon: BookOpen },
          { name: "Events", href: "#", description: "Join our upcoming webinars and talks", icon: Calendar },
          { name: "Press Releases", href: "#", description: "Latest news from PrimeQA", icon: Rss },
          { name: "E-Books", href: "#", description: "In-depth guides and whitepapers", icon: BookMarked },
        ],
      },
    ],
    featured: [
      {
        title: "The Future of AI in Testing",
        description: "Discover how AI is revolutionizing test automation and QA processes.",
        href: "/blog/ai-testing-tools",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        tag: "Latest Blog",
        actionText: "Read Article"
      }
    ]
  },
];
