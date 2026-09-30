import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "charmoctane.com",
      },
      {
        protocol: "https",
        hostname: "images.asos-media.com",
      },
    ],
  },
};

export default nextConfig;
