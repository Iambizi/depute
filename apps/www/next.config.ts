import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  webpack: (config) => {
    // Enable following symlinks so src/depute → ../../src works
    config.resolve.symlinks = true;
    return config;
  },
  async redirects() {
    return [
      {
        source: '/docs/components',
        destination: '/docs/components/plan-card',
        permanent: false,
      },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
