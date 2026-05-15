import type { WPTestimonio } from '@/lib/types/testimonio.types'
import { stripHtml } from '@/lib/utils/stripHtml'

interface ReviewSchemaItem {
  '@type': 'Review'
  author: {
    '@type': 'Person'
    name: string
  }
  reviewRating: {
    '@type': 'Rating'
    ratingValue: number
    bestRating: 5
  }
  reviewBody: string
  datePublished: string
  itemReviewed: {
    '@type': 'Organization'
    name: string
    url?: string
  }
}

export function buildTestimoniosReviewSchema(
  testimonios: WPTestimonio[],
  siteUrl: string = 'https://aprendiendojuntos.com',
): Array<ReviewSchemaItem> {
  return testimonios.map((t) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: t.testimonioFields.autorNombre,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.testimonioFields.calificacion,
      bestRating: 5,
    },
    reviewBody: stripHtml(t.testimonioFields.texto),
    datePublished: t.date,
    itemReviewed: {
      '@type': 'Organization',
      name: t.testimonioFields.servicioRelacionado?.nodes?.[0]?.title ?? 'Centro Aprendiendo Juntos',
      url: t.testimonioFields.servicioRelacionado?.nodes?.[0]?.slug
        ? `${siteUrl}/servicios/${t.testimonioFields.servicioRelacionado.nodes[0].slug}`
        : siteUrl,
    },
  }))
}
