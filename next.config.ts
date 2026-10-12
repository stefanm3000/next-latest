import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: false,
  reactCompiler: {
    compilationMode: "annotation",
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        hostname: "m.media-amazon.com",
      },
      {
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
