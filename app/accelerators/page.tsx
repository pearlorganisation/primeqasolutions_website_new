import type { Metadata } from "next";
import { getProductPageData } from "@/http/product-page";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { SectionRenderer } from "@/components/sections/shared/section-renderer";
import { serviceBlockRegistry } from "@/lib/utils/block-registry";
import { generateAcceleratorListingJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";


export async function generateMetadata(): Promise<Metadata> {
  const data = await getProductPageData();
  return mapStrapiSeoToMetadata(data?.meta_data, {
    defaultTitle: "Accelerators",
    defaultCanonical: "/accelerators",
  });
}

export default async function ProductPage() {
  const data = await getProductPageData();
  const sections = data?.page_section ?? [];
  const jsonLd = generateAcceleratorListingJsonLd();

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(2)]:bg-white [&>*:nth-child(even)]:bg-section-bg">
      <JsonLd data={jsonLd} />
      <SectionRenderer sections={sections} registry={serviceBlockRegistry} />
    </main>
  );
}
