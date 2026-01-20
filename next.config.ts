import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://panel.devflare.de/attachments/**')],
  },
};

export default nextConfig;
