import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  staticPageGenerationTimeout: 300,
  experimental: {
    inlineCss:true,
    optimizePackageImports: ["lucide-react", "react-icons", "motion","lottie-react","react-markdown"],
  },
  images: {
    qualities: [50, 75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "svgl.app" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "img.youtube.com" },
      {
        protocol: "https",
        hostname: "assets.primeqasolutions.com",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "website.primeqasolutions.com",
        pathname: "/**",
      },

      {
        // Local Strapi dev server
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
