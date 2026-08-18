import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ai-decorator-backend-358218923651.us-central1.run.app/api/:path*",
      },
    ];
  },
};
export default nextConfig;
