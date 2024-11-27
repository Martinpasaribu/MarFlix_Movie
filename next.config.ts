import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com'

      },
      {
        protocol: 'https',
        hostname: 'www.google.com'

      },
     
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com'

      }
     
    ],
  },
};

export default nextConfig;
