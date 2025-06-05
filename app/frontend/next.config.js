//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {},

  reactStrictMode: true,
  compress: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
  },
  experimental: {
    scrollRestoration: true,
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};

module.exports = composePlugins(withBundleAnalyzer, withNx)(nextConfig);
