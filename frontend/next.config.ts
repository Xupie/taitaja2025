import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const isCI = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  ...(isCI ? { output: "export" } : {}),
  images: {
    unoptimized: true, // required for GitHub Pages
  },
};

export default nextConfig;
