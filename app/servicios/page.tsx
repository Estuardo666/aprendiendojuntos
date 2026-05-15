import type { Metadata } from 'next'
import { ServiciosTemplate } from '@/components/templates/ServiciosTemplate'
import { getServicios } from '@/lib/api/servicios'
import { getPaginaNosotros } from '@/lib/api/nosotros'
import { getServiciosPageOptions } from '@/lib/api/pagina-options'
import type { WPServicioResumen } from '@/lib/types/servicio.types'

export const metadata: Metadata = {
  title: 'Nuestros Servicios | Centro Aprendiendo Juntos',
  description:
    'Descubre nuestros servicios especializados en neuropsicología, psicopedagogía y acompañamiento integral para niños, adolescentes y familias.',
}

// Mapea categoría string a pretítulo legible
function mapCategoriaToPretitulo(categoria: string | string[] | undefined): string {
  const raw = Array.isArray(categoria) ? (categoria[0] ?? '') : (categoria ?? '')
  const lower = raw.toLowerCase()
  if (lower.includes('neuro')) return 'Neuropsicología'
  if (lower.includes('psico')) return 'Psicopedagogía'
  if (lower.includes('lengua')) return 'Lenguaje'
  if (lower.includes('sensor')) return 'Integración Sensorial'
  return 'Acompañamiento Integral'
}

// Selecciona 2 servicios destacados al azar si hay más de 2
function pickDestacados(servicios: WPServicioResumen[]): WPServicioResumen[] {
  const destacados = servicios.filter((s) => s.servicioFields.destacado)
  if (destacados.length <= 2) return destacados
  // Shuffle y toma 2
  const shuffled = [...destacados].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 2)
}

export default async function ServiciosPage() {
  const [serviciosRaw, nosotros, options] = await Promise.all([
    getServicios(),
    getPaginaNosotros().catch(() => null),
    getServiciosPageOptions().catch(() => null),
  ])

  const destacadosRaw = pickDestacados(serviciosRaw)
  const destacadosSlugs = new Set(destacadosRaw.map((s) => s.slug))
  const restoRaw = serviciosRaw.filter((s) => !destacadosSlugs.has(s.slug))

  return (
    <ServiciosTemplate
      hero={{
        pretitulo: options?.pretitulo ?? 'Servicios Aprendiendo Juntos',
        titulo: options?.titulo ?? 'Nuestros\nservicios',
        descripcion:
          options?.descripcion ??
          'Ofrecemos servicios especializados en neuropsicología, psicopedagogía, lenguaje e integración sensorial, diseñados para acompañar el desarrollo de cada niño y adolescente.',
        imagenSrc: options?.bgHeroImagen?.node?.sourceUrl ?? '/bg-test.jpg',
      }}
      destacados={{
        servicios: destacadosRaw.map((s) => ({
          imagenSrc: s.featuredImage?.node.sourceUrl,
          imagenAlt: s.featuredImage?.node.altText ?? s.title,
          pretitulo: mapCategoriaToPretitulo(s.servicioFields.categoria),
          titulo: s.title,
          descripcion: s.servicioFields.descripcionCorta,
          href: `/servicios/${s.slug}`,
        })),
      }}
      resto={{
        servicios: restoRaw.map((s) => ({
          imagenSrc: s.featuredImage?.node.sourceUrl,
          imagenAlt: s.featuredImage?.node.altText ?? s.title,
          pretitulo: mapCategoriaToPretitulo(s.servicioFields.categoria),
          titulo: s.title,
          descripcion: s.servicioFields.descripcionCorta,
          href: `/servicios/${s.slug}`,
        })),
      }}
      cta={{
        pretitulo: nosotros?.ctaPretitulo ?? '¿Listo para Transformar el Aprendizaje?',
        heading: nosotros?.ctaTitulo ?? 'Tu hijo merece ser comprendido. Nos encantaría conocerte y ser parte de su camino.',
        descripcion: nosotros?.ctaCuerpo ?? undefined,
        ctaLabel: nosotros?.ctaBotonTexto ?? 'Agenda una Consulta',
        ctaHref: nosotros?.ctaBotonUrl ?? '/contacto',
        imagenSrc: nosotros?.ctaImagen?.sourceUrl,
        imagenAlt: nosotros?.ctaImagen?.altText,
      }}
    />
  )
}
