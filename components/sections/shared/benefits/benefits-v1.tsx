import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import { H3 } from "@/components/ui/typography";
import {
  FaDollarSign,
  FaShieldAlt,
  FaExpandArrowsAlt,
  FaClock,
  FaRocket,
  FaEye,
  FaCheckCircle,
  FaInfinity,
  FaChartLine,
} from "react-icons/fa";
import { STRAPI_URL } from "@/http/client";
import type { BenefitsProps, BenefitItem } from "./types";
import { parseHighlight } from "@/lib/utils/text-utils";

// ─── Default Benefits ─────────────────────────────────────────────────────────

const defaultBenefits: BenefitItem[] = [
  { title: "Reduce Cost of Quality", icon: FaDollarSign },
  { title: "Reduce and Manage Risks", icon: FaShieldAlt },
  { title: "Greater Test Coverage", icon: FaExpandArrowsAlt },
  { title: "Rapid Testing Cycles", icon: FaClock },
  { title: "Faster Time-to-Market", icon: FaRocket },
  { title: "Continuous Visibility", icon: FaEye },
  { title: "Improve Testing Quality", icon: FaCheckCircle },
  { title: "DevSecOps Enablement", icon: FaInfinity },
  { title: "Higher QA ROI", icon: FaChartLine },
];

function toAbsUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

function extractPlainText(blocks?: any): string {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  const parts: string[] = [];
  for (const block of blocks) {
    if (block?.children) {
      for (const child of block.children) {
        if (child.type === "text") {
          parts.push(child.text);
        } else if (child.type === "link") {
          parts.push(child.children?.map((cc: any) => cc.text).join("") ?? "");
        }
      }
    }
  }
  return parts.join(" ").trim();
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BenefitsV1({
  data,
  items,
  badge,
  title,
  titleHighlight,
  description,
  className,
}: BenefitsProps) {
  const headingData = data?.heading;
  const benefitsList = data?.benifits || items || defaultBenefits;

  // Resolve heading props
  const resolvedBadge = badge || headingData?.label || headingData?.badge;
  const titleText = title || extractPlainText(headingData?.title);
  const parsedTitle = parseHighlight(titleText);
  const resolvedTitle = parsedTitle.title;
  const resolvedTitleHighlight = titleHighlight || parsedTitle.highlight || headingData?.titleHighlight;
  const resolvedDescription = description || extractPlainText(headingData?.description);

  return (
    <Section className={className}>
      <Container>
        {/* Header */}
        <SectionHeaderResolver 
          variant={headingData?.variant}
          badge={resolvedBadge}
          title={resolvedTitle}
          titleHighlight={resolvedTitleHighlight}
          description={resolvedDescription}
          align={headingData?.align || "center"}
        />

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-8 gap-x-8 mx-auto">
          {benefitsList.map((item: BenefitItem, i: number) => {
            // Check if icon is an object with a url (Strapi)
            const isStrapiIcon =
              item.icon && typeof item.icon === "object" && "url" in item.icon;

            // Otherwise it's a React component
            const IconComponent =
              !isStrapiIcon && typeof item.icon === "function" ? item.icon : null;

            return (
              <div
                key={item.id || i}
                className="group rounded-md bg-cream hover:brightness-[0.97] py-2 px-2 flex items-center"
              >
                {/* Icon - Clean & Minimal */}
                <div className="shrink-0 flex size-12 items-center justify-center rounded-lg text-neutral-950 transition-colors duration-300">
                  {isStrapiIcon ? (
                    <Image
                      src={toAbsUrl((item.icon as any).url)}
                      alt={(item.icon as any).alternativeText || item.title}
                      width={20}
                      height={20}
                      className="object-contain grayscale"
                      unoptimized
                    />
                  ) : IconComponent ? (
                    <IconComponent className="size-5" />
                  ) : null}
                </div>

                {/* Title */}
                <H3 className="text-sm! p-0 font-medium text-primary/80">
                  {item.title}
                </H3>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
