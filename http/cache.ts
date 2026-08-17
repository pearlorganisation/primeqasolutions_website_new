import { cacheLife, cacheTag } from "next/cache";

export function cacheCmsContent(revalidate: number, ...tags: string[]) {
  cacheLife({
    stale: Math.max(300, revalidate),
    revalidate,
    expire: revalidate <= 60 ? 3600 : 86400,
  });

  cacheTag("strapi", ...tags.filter(Boolean));
}
