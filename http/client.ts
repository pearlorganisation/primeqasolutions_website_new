/**
 * Strapi Client instance — powered by the official @strapi/client SDK.
 *
 * Usage: import { strapiClient } from "@/lib/strapi/client";
 *
 * Documentation: https://docs.strapi.io/cms/api/client
 */

import { strapi } from "@strapi/client";

const RAW_STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";


  
/** Ensure no trailing slash so the SDK doesn't produce double-slash URLs */
const STRAPI_URL = RAW_STRAPI_URL.replace(/\/+$/, "");

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN ?? "";

/**
 * Singleton Strapi Client instance.
 * Uses API-token auth when STRAPI_API_TOKEN is provided, otherwise unauthenticated.
 */
export const strapiClient = strapi({
  baseURL: `${STRAPI_URL}/api`,
  ...(STRAPI_TOKEN ? { auth: STRAPI_TOKEN } : {}),
});

/** Resolve any Strapi media URL to the public Strapi host.
 *
 * Strapi may return relative paths or absolute URLs rooted at localhost.
 * Use NEXT_PUBLIC_STRAPI_URL so the browser sees the correct public host.
 */
export function strapiMediaUrl(path: string | null | undefined): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${STRAPI_URL}${normalizedPath}`;
}

/** Re-export for building absolute media URLs and native fetch headers */
export { STRAPI_URL, STRAPI_TOKEN };
