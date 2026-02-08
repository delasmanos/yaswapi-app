import path from "path";

import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  turbopack: {
    root: path.join(import.meta.dirname, "."),
  },
};

export default nextConfig;
