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
};

const withMDX = createMDX();

export default withMDX(nextConfig);
