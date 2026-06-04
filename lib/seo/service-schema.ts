export function buildServiceSchema(service: {
  title: string
  slug: string
  descripcionCorta: string
  imagenSrc?: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.descripcionCorta,
    url: `https://www.aprendiendojuntos.ec/servicios/${service.slug}`,
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Centro Aprendiendo Juntos',
      url: 'https://www.aprendiendojuntos.ec',
    },
    ...(service.imagenSrc && { image: service.imagenSrc }),
  }
}
