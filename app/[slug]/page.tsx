import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllDynamicPageSlugs, getDynamicPageData } from "@/http/dynamic-page";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { SectionRenderer } from "./section-renderer";
import { generateDynamicPageJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { toSlugStaticParams } from "@/lib/utils/static-params";


interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllDynamicPageSlugs();
  return toSlugStaticParams(slugs);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDynamicPageData(slug);
  
  if (!page) {
    return {};
  }
  
  return mapStrapiSeoToMetadata(page?.meta_data);
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getDynamicPageData(slug);
  
  if (!page) {
    notFound();
  }

  const sections = page?.page_section ?? [];
  const jsonLd = generateDynamicPageJsonLd({
    slug,
    title: page?.meta_data?.title,
    description: page?.meta_data?.description,
    pageSections: page?.page_section,
  });

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(even)]:bg-section-bg">
      <JsonLd data={jsonLd} />
      <SectionRenderer sections={sections} />
    </main>
  );
}
