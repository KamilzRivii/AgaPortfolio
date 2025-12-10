import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ['image/webp'],
    remotePatterns: [],
    unoptimized: true
  },
};

export default nextConfig;