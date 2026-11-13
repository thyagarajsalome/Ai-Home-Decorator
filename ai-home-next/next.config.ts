import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone / local network access during development
  allowedDevOrigins: [
    "192.168.31.163",
    "192.168.31.163:3000",
    "localhost",
    "localhost:3000",
    "127.0.0.1",
    "127.0.0.1:3000",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "fhplqcddcvwyqflgbfaj.supabase.co",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/decorate",
        destination: "https://ai-decorator-backend-358218923651.us-central1.run.app/api/decorate",
      },
    ];
  },
};

export default nextConfig;
