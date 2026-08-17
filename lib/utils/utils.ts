import { STRAPI_URL } from "@/http/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



// Local helper to prefix relative Strapi URLs with the base URL
export function toAbsUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  
  return `${process.env.NEXT_PUBLIC_ASSETS_URL}${url}`;
}
