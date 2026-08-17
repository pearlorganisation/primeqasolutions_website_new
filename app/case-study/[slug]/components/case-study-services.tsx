import Link from "next/link";
import { Settings, ShieldCheck, Zap } from "lucide-react";

const DUMMY_SERVICES = [
  {
    title: "QA Automation",
    description: "End-to-end automated testing pipelines ensuring rapid and reliable delivery.",
    icon: Settings,
    href: "/services/qa-automation",
  },
  {
    title: "Performance Testing",
    description: "Stress and load testing to guarantee your application scales flawlessly under high traffic.",
    icon: Zap,
    href: "/services/performance-testing",
  },
  {
    title: "Security Audits",
    description: "Comprehensive vulnerability scanning to secure your critical infrastructure.",
    icon: ShieldCheck,
    href: "/services/security-testing",
  },
];

export function CaseStudyServices() {
  return (
    <section id="services-provided" className="scroll-mt-24">
      <h2 className="text-[1.75rem] font-semibold text-neutral-900 tracking-tight leading-snug mb-6">
        Services Provided
      </h2>
      <div className="border-y border-neutral-200 divide-y divide-neutral-200">
        {DUMMY_SERVICES.map((service, i) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.title}
              href={service.href}
              className="group relative p-6 md:px-8 md:py-6 bg-transparent flex flex-col md:flex-row md:items-center gap-4 md:gap-6 transition-all duration-300"
            >
              {/* Left highlight mark */}
              {/* <div className="absolute left-[-1px] top-0 bottom-0 w-[3px] bg-transparent transition-colors duration-300  z-10" /> */}

              {/* Icon */}
                <Icon className="size-6.5 text-primary transition-transform duration-300 " />

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">{service.title}</h3>
                <p className="text-neutral-600 text-[15px] leading-relaxed line-clamp-2 md:line-clamp-1">
                  {service.description}
                </p>
              </div>

              {/* Minimalistic Action Link */}
              <div className="flex-shrink-0 flex items-center gap-2 text-[14px] font-semibold text-neutral-800 transition-colors duration-300  mt-2 md:mt-0 md:ml-4">
                <span className="border-b border-transparent pb-[2px] transition-colors duration-300 ">
                  Learn more
                </span>
                <svg
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7-7 7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
