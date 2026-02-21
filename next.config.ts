import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/personal-blog",
  assetPrefix: "/personal-blog",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;


