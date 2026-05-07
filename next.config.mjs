/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development'

const nextConfig = {
  images: {
    // En desarrollo local el cert de LocalWP es auto-firmado y el optimizador
    // server-side de Next.js lo rechaza → desactivar optimización en dev.
    // En producción (Vercel) la optimización queda activa con los dominios reales.
    unoptimized: isDev,
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
};

export default nextConfig;
