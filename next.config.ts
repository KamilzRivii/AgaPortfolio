import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "export",
  images: {
    formats: ['image/webp'],
    remotePatterns: [],
    unoptimized: true
  },
};

export default nextConfig;