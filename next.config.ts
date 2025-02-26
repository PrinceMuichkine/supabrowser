import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  inlineCss: true,
  
  experimental: {
    optimizePackageImports: [
      "next-themes",
      "framer-motion",
      "lucide-react",
      "@tabler/icons-react"
    ],
    serverActions: {
      bodySizeLimit: '2mb',
    },
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
