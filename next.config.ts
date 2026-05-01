import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: generates plain HTML/CSS/JS files in `out/` that can be
  // opened directly in a browser, screenshotted, or hosted on any static host
  // (GoDaddy cPanel, S3, Netlify drop, even a USB stick).
  // To re-enable a dynamic Next.js deployment later, remove the next two
  // settings and run `npm run build` against your chosen host.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
