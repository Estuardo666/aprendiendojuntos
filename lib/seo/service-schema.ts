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
    url: `https://aprendiendojuntos.ec/servicios/${service.slug}`,
    provider: {
      '@type': 'MedicalBusiness',
      name: 'Centro Aprendiendo Juntos',
      url: 'https://aprendiendojuntos.ec',
    },
    ...(service.imagenSrc && { image: service.imagenSrc }),
  }
}
