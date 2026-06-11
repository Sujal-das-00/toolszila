import type { NextConfig } from "next";
import { getLegacyRedirects } from "./lib/navigation/site-architecture";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
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

};

export default nextConfig;
