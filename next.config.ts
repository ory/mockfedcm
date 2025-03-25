import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
      bodySizeLimit: '2mb',
    },
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  allowedDevOrigins: ['d599481a27fb.ngrok.app'],
};

export default nextConfig;
