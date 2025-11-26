import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const isCI = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  ...(isCI ? { 
    output: "export", 
    basePath: "/taitaja2025",
    assetPrefix: "/taitaja2025/",
  } : {

  }),
  images: {
    unoptimized: true, // required for GitHub Pages
  },
  crossOrigin: "use-credentials",
};

export default nextConfig;
