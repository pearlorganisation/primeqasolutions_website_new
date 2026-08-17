import type { MetadataRoute } from "next";
import qs from "qs";
import { cacheCmsContent } from "@/http/cache";
import { STRAPI_URL, STRAPI_TOKEN } from "@/http/client";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://primeqasolutions.com";
const PAGE_SIZE = 100;

type StrapiCollectionItem = {
  slug?: string;
  updatedAt?: string;
  attributes?: {
    slug?: string;
    updatedAt?: string;
  };
};

function getItemField(
  item: StrapiCollectionItem,
  field: "slug" | "updatedAt",
) {
  return item[field] ?? item.attributes?.[field];
}

function buildStrapiUrl(
  resource: string,
  params: Record<string, unknown>,
): string {
  const query = qs.stringify(params, { encodeValuesOnly: true });
  return `${STRAPI_URL}/api/${resource}?${query}`;
}

async function fetchCollection(collection: string) {
  try {
    const fetchPage = async (page: number) => {
      const url = buildStrapiUrl(collection, {
        fields: ["slug", "updatedAt"],
        pagination: {
          page,
          pageSize: PAGE_SIZE,
        },
        status: "published",
      });

      const res = await fetch(url, {
        headers: STRAPI_TOKEN
          ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
          : undefined,
      });
      if (!res.ok) {
        return { items: [] as StrapiCollectionItem[], pageCount: 1 };
      }

      const json = await res.json();
      return {
        items: (json?.data ?? []) as StrapiCollectionItem[],
        pageCount: json?.meta?.pagination?.pageCount ?? 1,
      };
    };

    const firstPage = await fetchPage(1);
    if (firstPage.pageCount <= 1) {
      return firstPage.items;
    }

    const remainingPages = await Promise.all(
      Array.from({ length: firstPage.pageCount - 1 }, (_, index) =>
        fetchPage(index + 2),
      ),
    );

    return [
      ...firstPage.items,
      ...remainingPages.flatMap((page) => page.items),
    ];
  } catch (error) {
    console.error(`Error fetching collection ${collection}:`, error);
    return [];
  }
}

async function fetchSingleton(singleton: string) {
  try {
    const url = buildStrapiUrl(singleton, {
      fields: ["updatedAt"],
      status: "published",
    });
    const res = await fetch(url, {
      headers: STRAPI_TOKEN
        ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
        : undefined,
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    console.error(`Error fetching singleton ${singleton}:`, error);
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheCmsContent(3600, "strapi:sitemap");

  const routes: MetadataRoute.Sitemap = [];

  // Fetch singleton pages for their updatedAt dates
  const [
    home,
    aboutUs,
    becomePartner,
    engagementModel,
    lifeAtPrimeqa,
    whomWeWorkWith,
  ] = await Promise.all([
    fetchSingleton("home"),
    fetchSingleton("about-us"),
    fetchSingleton("become-a-partner"),
    fetchSingleton("engagement-model"),
    fetchSingleton("life-at-primeqa"),
    fetchSingleton("whom-we-work-with"),
  ]);

  // Root / Home
  routes.push({
    url: `${APP_URL}`,
    lastModified: home?.updatedAt ? new Date(home.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 1,
  });

  // Static / Singleton Pages
  routes.push({
    url: `${APP_URL}/company/about-us`,
    lastModified: aboutUs?.updatedAt ? new Date(aboutUs.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  routes.push({
    url: `${APP_URL}/company/become-a-partner`,
    lastModified: becomePartner?.updatedAt
      ? new Date(becomePartner.updatedAt)
      : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  });

  // Other purely static pages
  const staticPages = [
    { path: "/blog", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/company/careers", lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/case-study", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/contact-us", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/hire-qa-engineers", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/accelerators", lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    {
      path: "/company/engagement-model",
      lastModified: engagementModel?.updatedAt
        ? new Date(engagementModel.updatedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/company/life-at-primeqa",
      lastModified: lifeAtPrimeqa?.updatedAt
        ? new Date(lifeAtPrimeqa.updatedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/company/whom-we-work-with",
      lastModified: whomWeWorkWith?.updatedAt
        ? new Date(whomWeWorkWith.updatedAt)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];
  staticPages.forEach((route) => {
    routes.push({
      url: `${APP_URL}${route.path}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  });

  // Dynamic Collections mapping
  const collections = [
    { name: "services", path: "/services" },
    { name: "industries", path: "/industries" },
    { name: "case-studies", path: "/case-study" },
    { name: "blogs", path: "/blog" },
    { name: "job-lists", path: "/company/careers" },
    { name: "hire-qa-engineers", path: "/hire-qa-engineers" },
    { name: "legals", path: "/legal" },
    { name: "accelerators", path: "/accelerators" },
  ];

  await Promise.all(
    collections.map(async ({ name, path }) => {
      const items = await fetchCollection(name);
      items.forEach((item) => {
        const slug = getItemField(item, "slug");
        const updatedAt = getItemField(item, "updatedAt");

        if (slug) {
          routes.push({
            url: `${APP_URL}${path}/${slug}`,
            lastModified: updatedAt ? new Date(updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: name === "services" ? 0.8 : 0.6,
          });
        }
      });
    })
  );

  return routes;
}
