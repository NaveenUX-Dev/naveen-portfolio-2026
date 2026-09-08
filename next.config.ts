import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /**
   * Every route is prerendered, so the site ships as static files to Firebase
   * Hosting. No server, no cold starts, no hosting bill beyond the free tier.
   */
  output: "export",
  images: {
    // Static export has no image optimiser at runtime.
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
