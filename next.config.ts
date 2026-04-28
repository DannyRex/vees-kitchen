import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The parent directory has a stray package.json/lock from prior work, so
  // Next infers it as the workspace root. Harmless warning; no functional
  // impact. We don't pin turbopack.root because doing so was breaking PostCSS
  // resolution in this environment.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
    qualities: [50, 75, 90],
  },
};

export default nextConfig;
