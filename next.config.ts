import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-771cef1ae3e640bd8f325bba8bf1a880.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;