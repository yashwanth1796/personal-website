import type { NextConfig } from "next";

// Fully static build: `next build` writes plain HTML/CSS/JS to `out/`, which Cloudflare
// serves from its CDN. No server runs per request. Content from Notion is fetched at build
// time, and the scheduled deploy workflow rebuilds daily so new posts appear.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: { root: process.cwd() },
};

export default nextConfig;
