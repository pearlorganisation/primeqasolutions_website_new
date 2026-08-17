import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const APP_URL =
    process.env.NEXT_PUBLIC_APP_URL || "https://primeqasolutions.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/","/cdn-cgi/"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot"],
        allow: "/", // Allow everything
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
