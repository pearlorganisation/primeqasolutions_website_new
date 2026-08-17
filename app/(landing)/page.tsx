import type { Metadata } from "next";
import { getHomePageData } from "@/http/home";
import { mapStrapiSeoToMetadata } from "@/lib/utils/metadata";
import { SectionRenderer } from "@/app/(landing)/section-renderer";
import { generateHomeJsonLd } from "@/lib/utils/jsonld";
import { JsonLd } from "@/components/seo/json-ld";


export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePageData();
  return mapStrapiSeoToMetadata(home?.meta_data);
}

export default async function Page() {
  const home = await getHomePageData();
  const sections = home?.page_section ?? [];
  const jsonLd = generateHomeJsonLd({ pageSections: sections });

  return (
    <main className="[&>*:nth-child(even)]:border-y [&>*:nth-child(even)]:border-neutral-200/50 [&>*:nth-child(even)]:bg-section-bg [&>*:last-child]:border-0! [&>*:last-child]:bg-white!">
      <JsonLd data={jsonLd} />
      <SectionRenderer sections={sections} />
    </main>
  );
}
