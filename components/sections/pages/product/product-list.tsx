"use client";

import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { SectionHero } from "@/components/sections/shared/section-hero";
import { Container, Section } from "@/components/ui/container";

import { StrapiBlockRenderer } from "@/components/ui/strapi-block-renderer";
import type { StrapiProduct } from "@/types/product";

interface ProductListProps {
  products: StrapiProduct[];
}

const HERO_DATA = {
  label: "Core Features",
  heading: "Everything you need for perfect quality",
  description: "Our platform provides a comprehensive suite of tools designed to streamline your testing workflow and elevate your product quality to the next level.",
  image: null,
  // primaryButton: {
  //   label: "Book a Consultation",
  //   link: "/contact"
  // }
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <>
      <SectionHero data={HERO_DATA} />
      
      <Section className="overflow-hidden py-0!">
        <Container>
          <div className="flex flex-col">
            {products.map((product, index) => {
              const reverse = index % 2 !== 0;
              const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
              const imageUrl = product.image?.url
                ? product.image.url.startsWith("http")
                  ? product.image.url
                  : `${STRAPI_URL}${product.image.url}`
                : "/product.png";

              return (
              <div key={product.id || index}>
                <div
                  className={`group flex flex-col lg:flex-row items-center gap-16 lg:gap-24 py-10 ${
                    reverse ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Text Content */}
                  <div className="w-full lg:w-[45%] space-y-5">
                    <div className="space-y-2">
                      <h3 className="font-space text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
                        {product.name}
                      </h3>
                      {product.description ? (
                        <StrapiBlockRenderer blocks={product.description} />
                      ) : null}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Button asChild size="lg">
                        <Link href={`/accelerators/${product.slug || product.documentId}`}>
                          <span>View Details</span>
                          <HiArrowRight className="inline-block ml-2 size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Image Content */}
                  <div className="w-full lg:w-[55%] relative">
                    <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>
                  </div>
                </div>

                {/* Separator */}
                {index < products.length - 1 && (
                  <div className="w-full h-px bg-neutral-100/80" />
                )}
              </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
