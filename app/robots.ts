import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://aprendiendojuntos.ec/sitemap.xml',
    host: 'https://aprendiendojuntos.ec',
  }
}
