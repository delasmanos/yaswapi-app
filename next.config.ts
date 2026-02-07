import type { NextConfig } from "next";
const path = require("path");
const nextConfig: NextConfig = {
  // cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
