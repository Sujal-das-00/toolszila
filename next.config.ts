import type { NextConfig } from "next";
import { getLegacyRedirects } from "./lib/navigation/site-architecture";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/paycheck-calculator",
        destination: "/calculators/income/paycheck-calculator",
        permanent: true,
      },
      ...getLegacyRedirects(),
    ];
  },
  // Static generation optimized for Vercel edge CDN
  poweredByHeader: false,

  // Compress responses for faster TTFB
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },

  // Experimental: optimize package imports for smaller client bundles
  experimental: {
    optimizePackageImports: ["@/lib/tax", "@/components/calculator"],
  },
};

export default nextConfig;
