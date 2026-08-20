import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
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
