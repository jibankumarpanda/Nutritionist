import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  // Webpack configuration for non-Turbopack builds
  webpack: (config, { isServer }) => {
    // Configure path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
    };
    return config;
  },
  
  // Turbopack configuration
  turbopack: {
    // Empty config to satisfy the error message
  },
  
  // Disable the experimental warning
  experimental: {
    // Add any other experimental features here
  },
};

// For Turbopack, we need to ensure the config is properly typed
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      __NEXT_PRIVATE_STANDALONE_CONFIG?: string;
    }
  }
}

export default nextConfig;
