import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  experimental: {
    // Two root layouts (site + Payload admin) — see src/app/global-not-found.tsx.
    globalNotFound: true,
  },
  async redirects() {
    // 301s from the previous builds' URLs (Doc 05 §1).
    return [
      { source: "/wholesale-enquiry", destination: "/contact#quote", permanent: true },
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:slug", destination: "/resources/:slug", permanent: true },
      { source: "/about", destination: "/the-farm", permanent: true },
      { source: "/our-farm", destination: "/the-farm", permanent: true },
      { source: "/products", destination: "/our-eggs", permanent: true },
      { source: "/our-eggs-and-supply", destination: "/our-eggs", permanent: true },
      { source: "/partner-with-us", destination: "/contact#quote", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
