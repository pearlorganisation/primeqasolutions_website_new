/**
 * Legal page data-fetching layer
 */
import { strapiClient } from "./client";
import { cacheCmsContent } from "./cache";
import type { StrapiLegalPage, LegalPage } from "@/types/legal";

const legalCollection = strapiClient.collection("legals");
const REVALIDATE = 60;

export function normaliseLegalPage(raw: StrapiLegalPage): LegalPage {
  return {
    id: raw.documentId,
    name: raw.name,
    slug: raw.slug,
    content: raw.content ?? "",
    publishAt: raw.publish_at,
  };
}

export const getLegalPageBySlug = async (
  slug: string
): Promise<LegalPage | null> => {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:legals", `strapi:legal:${slug}`);

  const response = await legalCollection.find({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    status: "published",
  });

  const pages = (response?.data ?? []) as unknown as StrapiLegalPage[];
  if (pages.length === 0) return null;
  return normaliseLegalPage(pages[0]);
};

export const getAllLegalSlugs = async (): Promise<string[]> => {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:legals:slugs");

  const response = await legalCollection.find({
    fields: ["slug"],
    pagination: {
      pageSize: 100,
    },
    status: "published",
  });

  const pages = (response?.data ?? []) as unknown as Array<{ slug: string }>;
  return pages.map((page) => page.slug);
};
