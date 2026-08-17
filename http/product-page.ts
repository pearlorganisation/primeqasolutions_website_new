import qs from "qs";
import { cacheCmsContent } from "./cache";
import { STRAPI_URL, STRAPI_TOKEN } from "./client";
import { basePopulateConfig } from "./populate";

const REVALIDATE = 60;

const headers: HeadersInit = STRAPI_TOKEN
  ? { Authorization: `Bearer ${STRAPI_TOKEN}` }
  : {};

export async function getProductPageData() {
  "use cache";
  cacheCmsContent(REVALIDATE, "strapi:product-page");

  const query = qs.stringify(
    {
      populate: basePopulateConfig,
    },
    { encodeValuesOnly: true },
  );

  const URL = `${STRAPI_URL}/api/product-page?${query}`;

  const res = await fetch(URL, { headers });
  if (!res.ok) {
    if (process.env.NODE_ENV === "development")
      console.error(`[Strapi] ${res.status} ${res.statusText} — ${res.url}`);
    return null;
  }

  const json = await res.json();
  return json?.data || null;
}
