import type { NextConfig } from 'next';

const BASE_PATH = '/fr/carte-grise';

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
