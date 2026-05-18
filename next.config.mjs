/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    unoptimized: isDev,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'aprendiendo-juntos.local',
      },
      {
        protocol: 'https',
        hostname: 'aprendiendo-juntos.local',
      },
      {
        protocol: 'https',
        hostname: 'adminaj.totemmassmedia.com',
      },
      {
        protocol: 'https',
        hostname: '*.aprendiendojuntos.ec',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
