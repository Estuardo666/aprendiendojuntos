import type { MetadataRoute } from 'next'
import { getServicios } from '@/lib/api/servicios'
import { getProgramas } from '@/lib/api/programas'
import { getArticulos } from '@/lib/api/articulos'
import { getLandingPages } from '@/lib/api/landing-pages'

const BASE = 'https://aprendiendojuntos.ec'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/programas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/testimonios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/articulos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE}/recursos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/terminos-uso`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${BASE}/politica-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  const [servicios, programas, articulos, landings] = await Promise.all([
    getServicios().catch(() => []),
    getProgramas().catch(() => []),
    getArticulos().catch(() => []),
    getLandingPages().catch(() => []),
  ])

  const servicioPages: MetadataRoute.Sitemap = servicios.map((s) => ({
    url: `${BASE}/servicios/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const programaPages: MetadataRoute.Sitemap = programas.map((p) => ({
    url: `${BASE}/programas/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const articuloPages: MetadataRoute.Sitemap = articulos.map((a) => ({
    url: `${BASE}/articulos/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const landingPages: MetadataRoute.Sitemap = landings.map((l) => ({
    url: `${BASE}/landing/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...servicioPages,
    ...programaPages,
    ...articuloPages,
    ...landingPages,
  ]
}
