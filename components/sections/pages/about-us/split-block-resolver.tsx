/**
 * SplitBlockResolver
 * ──────────────────
 * Adapts the raw Strapi `block.split-block` payload into the split section layout.
 * Heading is a plain string, description is Strapi rich-text (Blocks),
 * and image is a Strapi media asset.
 *
 * Registered in the block registry as the handler for BLOCKS.SPLIT_BLOCK.
 */

import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { StrapiBlockRenderer } from "@/components/ui/strapi-block-renderer";
import { strapiMediaUrl } from "@/http/client";
import type { StrapiSplitBlock } from "@/types/about-us";

interface SplitBlockResolverProps {
  data: StrapiSplitBlock;
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SplitBlock({ data }: SplitBlockResolverProps) {
  if (!data) return null;

  const imageUrl = strapiMediaUrl(data.image?.url);
  // Default is image on right (default grid order, text on left).
  // If align is left, the image should be on the left (image order-first) and text on the right (text order-last).
  const isImageLeft = data.align === "left"; 

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`flex flex-col items-start ${isImageLeft ? 'lg:order-last' : ''}`}>
            {data.heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-space tracking-tight leading-[1.15] text-foreground mb-6">
                {data.heading}
              </h2>
            )}

            {data.description && Array.isArray(data.description) && (
              <StrapiBlockRenderer
                blocks={data.description}
                className="text-neutral-600 leading-relaxed text-lg"
              />
            )}

            {/* Buttons */}
            {(data.primaryButton || data.secondaryButton) && (
              <div className="flex flex-wrap items-center gap-4 mt-8">
                {data.primaryButton && data.primaryButton.link && (
                  <Button asChild size="lg" className="rounded-lg!">
                    <Link href={data.primaryButton.link}>
                      {data.primaryButton.label || "Learn More"}
                    </Link>
                  </Button>
                )}
                {data.secondaryButton && data.secondaryButton.link && (
                  <Button asChild variant="outline" size="lg" className="rounded-lg! border-neutral-300 text-neutral-800 hover:bg-neutral-100">
                    <Link href={data.secondaryButton.link}>
                      {data.secondaryButton.label || "Contact Us"}
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Image */}
          {imageUrl && (
            <div className={`relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl ${isImageLeft ? 'lg:order-first' : ''}`}>
              <Image
                src={imageUrl}
                alt={data.image?.alternativeText || data.heading || "About us"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
