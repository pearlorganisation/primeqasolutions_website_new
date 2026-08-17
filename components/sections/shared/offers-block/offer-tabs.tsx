"use client";

import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { Section, Container } from "@/components/ui/container";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import { SectionHeaderResolver } from "@/components/sections/shared/section-heading/section-header-resolver";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { OfferTabsProps } from "./types";
import { strapiMediaUrl } from "@/http/client";
import { StrapiBlockRenderer } from "@/components/ui/strapi-block-renderer";
import { H3 } from "@/components/ui/typography";

function extractText(blocks: any): string {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (Array.isArray(blocks)) {
    return blocks
      .map((block) => {
        if (block.children) {
          return block.children.map((child: any) => child.text || "").join("");
        }
        return block.text || "";
      })
      .join("\n");
  }
  return "";
}

export function OfferTabs({ data }: OfferTabsProps) {
  const tabsData = (data?.offers || []).map((offer) => {
    // Safe feature list handling
    const rawFeature = (offer as any).icon_list;
    const features = Array.isArray(rawFeature) ? rawFeature : rawFeature ? [rawFeature] : [];

    const linkObj = (offer as any).custom_link || (offer as any).button || (offer as any).link;

    return {
      id: offer.offerId || offer.id.toString(),
      label: offer.title,
      title: offer.title,
      description: offer.description,
      features: features,
      image: strapiMediaUrl(offer.image?.url),
      button: linkObj ? {
        label: typeof linkObj === "string" ? linkObj : linkObj.label || linkObj.text || "Learn More",
        link: typeof linkObj === "string" ? linkObj : linkObj.link || linkObj.url || "#",
      } : null,
    };
  });

  const [selectedTab, setSelectedTab] = useState(tabsData[0]?.id);

  // Sync activeTab purely during render if data changes
  const activeTab = tabsData.find((t) => t.id === selectedTab)
    ? selectedTab
    : tabsData[0]?.id;

  const setActiveTab = setSelectedTab;

  // Gracefully handle missing data
  if (!data?.offers || data.offers.length === 0) {
    return null;
  }

  const activeContent = tabsData.find((tab) => tab.id === activeTab) || tabsData[0];

  if (!activeContent) return null;

  return (
    <Section className="bg-[#F8F9FA] py-16 lg:py-24">
      <Container>
        {/* Header */}
        {(data?.heading?.title || data?.heading?.description) && (
          <SectionHeaderResolver 
            variant={data?.heading?.variant} 
            title={extractText(data.heading.title)}
            description={<StrapiBlockRenderer blocks={data.heading.description} />}
            align={data.heading.align || "center"}
          />
        )}

        {/* Tabs Navigation */}
        <div className="flex justify-center mt-1 mb-8 w-full px-4 sm:px-6">
          <div className="flex items-center gap-1 bg-neutral-100 border border-neutral-200/80 p-1 rounded-lg overflow-x-auto max-w-full scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shadow-inner">
            {tabsData.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative rounded-md text-xs sm:text-sm font-semibold px-4 py-2 transition-colors duration-300 whitespace-nowrap shrink-0 cursor-pointer",
                    isActive
                      ? "text-white"
                      : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/30"
                  )}
                >
                  {isActive && (
                    <m.div
                      layoutId="activeOfferTabIndicator"
                      className="absolute inset-0 bg-neutral-900 rounded-md -z-0"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Card Panel */}
        <div className="w-full">
          <div className="rounded-lg border border-neutral-200/60 bg-white p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
            <AnimatePresence mode="wait">
              <m.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch"
              >
                {/* Left Content Column */}
                <div className="flex flex-col justify-center items-start w-full">
                  <H3 className="text-2xl font-bold font-space text-neutral-900 mb-4 tracking-tight">
                    {activeContent.title}
                  </H3>
                  <StrapiBlockRenderer 
                    blocks={activeContent.description} 
                    className="text-base text-neutral-600 leading-relaxed [&_p]:text-base [&_p]:text-neutral-600"
                  />

                  {activeContent.features.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
                      {activeContent.features.map((feature: any) => (
                        <li key={feature.id ?? feature.title} className="flex items-center gap-4">
                          {feature.icon?.url ? (
                            <div className="shrink-0 flex items-center justify-center size-12 rounded-md bg-neutral-50 border border-neutral-150 p-2 shadow-xs relative">
                              <Image 
                                src={strapiMediaUrl(feature.icon.url)}
                                alt={feature.title || ""}
                                fill
                                sizes="3rem"
                                className="object-contain p-2"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="shrink-0 flex items-center justify-center size-10 rounded-md bg-primary/8 border border-primary/15 text-primary shadow-xs">
                              <CheckCircle className="size-5" strokeWidth={2} />
                            </div>
                          )}
                          <span className="text-neutral-700 text-sm sm:text-base font-semibold leading-relaxed">
                            {feature.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeContent.button && activeContent.button.label && (
                    <div className="mt-8">
                      <Button asChild className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-md px-6 h-11 text-sm font-semibold">
                        <Link href={activeContent.button.link || "#"}>
                          {activeContent.button.label}
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right Image Column */}
                <div className="relative w-full aspect-16/10 sm:aspect-[4/3] lg:aspect-auto lg:h-full rounded-md overflow-hidden border border-neutral-300 bg-neutral-50 shrink-0">
                  {activeContent.image && (
                    <Image
                      src={activeContent.image}
                      alt={activeContent.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                      unoptimized
                    />
                  )}
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default OfferTabs;


