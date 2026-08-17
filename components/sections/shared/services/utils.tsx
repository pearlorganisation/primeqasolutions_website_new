import React from "react";
import Image from "next/image";
import { IconType } from "react-icons";
import {
  FaRobot,
  FaMobileAlt,
  FaShieldAlt,
  FaTachometerAlt,
  FaCloud,
  FaCogs,
  FaCode,
  FaChartLine,
  FaCheckDouble,
  FaUniversalAccess,
  FaNetworkWired,
  FaCubes,
} from "react-icons/fa";
import { STRAPI_URL } from "@/http/client";
import type { StrapiRichTextBlock, StrapiServiceItem, StrapiTextNode, StrapiLinkNode } from "@/types/home";

export const ICON_FALLBACK_MAP: Record<string, IconType> = {
  "QA Consulting & Strategy": FaChartLine,
  "Test Automation": FaRobot,
  "Security Testing": FaShieldAlt,
  "Performance Testing": FaTachometerAlt,
  "Mobile & Web Testing": FaMobileAlt,
  "DevOps & CI/CD QA": FaCogs,
  "Cloud & SaaS Testing": FaCloud,
  "API Integration Testing": FaCode,
  "AI-Powered Testing": FaCheckDouble,
  "Accessibility Testing": FaUniversalAccess,
  "IoT Testing": FaNetworkWired,
  "Blockchain Testing": FaCubes,
};

export const DEFAULT_ICON = FaCode;

export function extractPlainText(blocks?: StrapiRichTextBlock[]): string {
  if (!Array.isArray(blocks)) return "";
  const parts: string[] = [];
  for (const block of blocks) {
    for (const child of block.children ?? []) {
      if (child.type === "text") {
        parts.push((child as StrapiTextNode).text);
      } else if (child.type === "link") {
        parts.push(
          (child as StrapiLinkNode).children?.map((cc) => cc.text).join("") ?? "",
        );
      }
    }
  }
  return parts.join(" ").trim();
}

export function toAbsUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

interface ServiceIconProps {
  service: StrapiServiceItem;
  className?: string;
  width?: number;
  height?: number;
}

export function ServiceIcon({
  service,
  className = "",
  width = 48,
  height = 48,
}: ServiceIconProps) {
  if (service.icon?.url) {
    return (
      <Image
        src={toAbsUrl(service.icon.url)}
        alt={service.icon.alternativeText || service.title}
        width={width}
        height={height}
        className={className}
      />
    );
  }
  const FallbackIcon = ICON_FALLBACK_MAP[service.title] ?? DEFAULT_ICON;
  return <FallbackIcon className={className} />;
}
