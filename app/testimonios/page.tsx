import type { Metadata } from 'next'
import { TestimoniosPageTemplate } from '@/components/templates/TestimoniosPageTemplate'
import { getTestimoniosPageOptions } from '@/lib/api/testimonios-page'
import { getTestimonios } from '@/lib/api/testimonios'
import { stripHtml } from '@/lib/utils/stripHtml'
import { buildTestimoniosReviewSchema } from '@/lib/seo/testimonios-review-schema'

export const metadata: Metadata = {
  title: 'Testimonios | Centro Aprendiendo Juntos',
  description:
    'Conoce las experiencias de familias que han confiado en Centro Aprendiendo Juntos para el desarrollo de sus hijos.',
}

export default async function TestimoniosPage() {
  const [options, testimoniosRaw] = await Promise.all([
    getTestimoniosPageOptions().catch(() => null),
    getTestimonios().catch(() => []),
  ])

  const reviewsJsonLd = buildTestimoniosReviewSchema(testimoniosRaw)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <TestimoniosPageTemplate
        hero={{
          pretitulo: options?.pretitulo ?? 'Testimonios Aprendiendo Juntos',
          titulo: options?.titulo ?? 'Nuestros\ntestimonios',
          descripcion:
            options?.descripcion ??
            'Descubre las historias de familias que han encontrado en nosotros un acompañamiento integral para el desarrollo de sus hijos.',
          imagenSrc: options?.bgHeroImagen?.node?.sourceUrl ?? '/bg-test.jpg',
        }}
        items={testimoniosRaw.map((t) => ({
          id: t.id,
          quote:
            stripHtml(t.testimonioFields.descripcionCortaCard ?? t.testimonioFields.texto).slice(
              0,
              180,
            ) +
            (stripHtml(t.testimonioFields.descripcionCortaCard ?? t.testimonioFields.texto).length >
            180
              ? '...'
              : ''),
          author: t.testimonioFields.autorNombre,
          role: t.testimonioFields.autorRol,
          imageSrc: t.featuredImage?.node?.sourceUrl,
          imageAlt: t.featuredImage?.node?.altText ?? t.testimonioFields.autorNombre,
          rating: t.testimonioFields.calificacion,
          servicioSlug: t.testimonioFields.servicioRelacionado?.nodes?.[0]?.slug ?? null,
          servicioNombre: t.testimonioFields.servicioRelacionado?.nodes?.[0]?.title ?? null,
          texto: stripHtml(t.testimonioFields.texto),
          calificacion: t.testimonioFields.calificacion,
          videoUrl: t.testimonioFields.videoTestimonial?.node?.mediaItemUrl ?? null,
          imagenDestacadaTestimonioSrc:
            t.testimonioFields.imagenDestacadaTestimonio?.node?.sourceUrl ?? undefined,
          imagenDestacadaTestimonioAlt:
            t.testimonioFields.imagenDestacadaTestimonio?.node?.altText ?? undefined,
        }))}
      />
    </>
  )
}
