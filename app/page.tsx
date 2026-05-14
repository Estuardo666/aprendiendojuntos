import type { Metadata } from 'next'
import { getFAQs } from '@/lib/api/faqs'
import { getPaginaHome } from '@/lib/api/home'
import { getProgramas } from '@/lib/api/programas'
import { getServicios } from '@/lib/api/servicios'
import { getTestimonios } from '@/lib/api/testimonios'
import { HomeTemplate } from '@/components/templates/HomeTemplate'
import type { BadgeProps } from '@/components/atoms/Badge'
import type { HomeTemplateProps } from '@/components/templates/HomeTemplate'

const DEFAULT_KEYWORDS = [
  { texto: 'Neuropsicología', emoji: '🧠' },
  { texto: 'Apoyo Escolar', emoji: '📚' },
  { texto: 'TDAH', emoji: '⚡' },
  { texto: 'Dificultades de Aprendizaje', emoji: '✍️' },
  { texto: 'Coaching Educativo', emoji: '🎯' },
  { texto: 'Evaluación Psicológica', emoji: '🔍' },
  { texto: 'Psicomotricidad', emoji: '🤸' },
  { texto: 'Terapia de Lenguaje', emoji: '💬' },
]

const DEFAULT_PROCESO = [
  {
    numero: 1,
    titulo: 'Evaluación inicial',
    descripcion: 'Identificamos fortalezas, necesidades y objetivos para comprender el punto de partida.',
  },
  {
    numero: 2,
    titulo: 'Plan personalizado',
    descripcion: 'Diseñamos una ruta de intervención adaptada al ritmo, edad y contexto familiar.',
  },
  {
    numero: 3,
    titulo: 'Sesiones de intervención',
    descripcion: 'Acompañamos el proceso con estrategias activas, seguimiento profesional y objetivos claros.',
  },
  {
    numero: 4,
    titulo: 'Seguimiento continuo',
    descripcion: 'Medimos avances y coordinamos con familia y escuela para sostener los resultados.',
  },
]

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function normalizeCategoria(categoria: string | string[] | undefined): BadgeProps['variant'] {
  const value = Array.isArray(categoria) ? (categoria[0] ?? 'default') : (categoria ?? 'default')
  const allowed: BadgeProps['variant'][] = ['neuropsicologia', 'psicopedagogia', 'lenguaje', 'sensorial', 'default']

  return allowed.includes(value as BadgeProps['variant']) ? value as BadgeProps['variant'] : 'default'
}

export async function generateMetadata(): Promise<Metadata> {
  const home = await getPaginaHome()

  return {
    title: home.metaTitle ?? 'Inicio | Aprendiendo Juntos',
    description: home.metaDescription ?? 'Centro Neuropsicopedagógico Aprendiendo Juntos.',
    openGraph: {
      title: home.metaTitle ?? 'Inicio | Aprendiendo Juntos',
      description: home.metaDescription ?? 'Centro Neuropsicopedagógico Aprendiendo Juntos.',
      images: home.imagenDestacada?.node?.sourceUrl ? [home.imagenDestacada.node.sourceUrl] : undefined,
    },
  }
}

export default async function HomePage() {
  const [home, servicios, programas, testimonios, faqs] = await Promise.all([
    getPaginaHome(),
    getServicios(),
    getProgramas(),
    getTestimonios().catch(() => []),
    getFAQs(),
  ])

  const serviciosDestacados = servicios
    .filter((servicio) => servicio.servicioFields.destacado)
    .slice(0, 4)
    .map((servicio) => ({
      imagenSrc: servicio.featuredImage?.node.sourceUrl,
      imagenAlt: servicio.featuredImage?.node.altText ?? servicio.title,
      pretitulo: normalizeCategoria(servicio.servicioFields.categoria),
      titulo: servicio.title,
      descripcion: servicio.servicioFields.descripcionCorta,
      href: `/servicios/${servicio.slug}`,
    }))

  const programasItems = programas.slice(0, 6).map((programa) => ({
    imagenSrc: programa.programaFields.imagenDestacada?.node.sourceUrl,
    imagenAlt: programa.programaFields.imagenDestacada?.node.altText ?? programa.title,
    pretitulo: programa.programaFields.edadObjetivo ?? 'Programa',
    titulo: programa.title,
    descripcion: programa.programaFields.descripcionHeroTexto ?? stripHtml(programa.programaFields.descripcion),
    href: `/programas/${programa.slug}`,
  }))

  const procesoPasos = (home.procesoPasos ?? [])
    .filter((paso) => Boolean(paso?.titulo && paso?.descripcion))
    .map((paso, index) => ({
      numero: paso.numero ?? index + 1,
      titulo: paso.titulo ?? '',
      descripcion: paso.descripcion ?? '',
      imagenSrc: paso.imagen?.node?.sourceUrl,
      imagenAlt: paso.imagen?.node?.altText ?? paso.titulo ?? '',
    }))

  const templateProps: HomeTemplateProps = {
    hero: {
      pretitulo: home.heroPretitulo,
      titulo: home.heroTitulo,
      subtitulo: home.heroSubtitulo,
      videoSrc: home.heroVideo?.node?.mediaItemUrl ?? home.heroVideo?.node?.sourceUrl,
      ctaPrimarioLabel: home.heroCtaPrimarioLabel,
      ctaPrimarioHref: home.heroCtaPrimarioHref,
      ctaSecundarioLabel: home.heroCtaSecundarioLabel,
      ctaSecundarioHref: home.heroCtaSecundarioHref,
    },
    keywords: (home.keywords ?? [])
      .filter((keyword) => Boolean(keyword?.texto))
      .map((keyword) => ({
        texto: keyword.texto ?? '',
        emoji: keyword.emoji ?? '',
      }))
      .concat(home.keywords?.length ? [] : DEFAULT_KEYWORDS),
    sobre: {
      imagenSrc: home.sobreImagen?.node?.sourceUrl,
      imagenAlt: home.sobreImagen?.node?.altText,
      pretitulo: home.sobrePretitulo,
      titulo: home.sobreTitulo ?? 'Nuestra Historia, Nuestro Propósito',
      descripcion: home.sobreDescripcion,
      botonLabel: home.sobreBotonLabel,
      botonHref: '/nosotros',
    },
    servicios: {
      pretitulo: home.serviciosPretitulo,
      titulo: home.serviciosTitulo ?? 'Servicios destacados',
      parrafo: home.serviciosParrafo,
      items: serviciosDestacados,
      botonLabel: home.serviciosBotonLabel,
      botonHref: home.serviciosBotonHref,
    },
    programas: {
      pretitulo: home.programasPretitulo,
      titulo: home.programasTitulo ?? 'Programas',
      parrafo: home.programasParrafo,
      items: programasItems,
      botonLabel: home.programasBotonLabel,
      botonHref: home.programasBotonHref,
    },
    proceso: {
      pretitulo: home.procesoPretitulo,
      titulo: home.procesoTitulo ?? 'Un proceso claro, humano y efectivo',
      parrafo: home.procesoParrafo,
      ctaLabel: home.procesoCtaLabel,
      ctaHref: home.procesoCtaHref,
      pasos: procesoPasos.length > 0 ? procesoPasos : DEFAULT_PROCESO,
    },
    testimonios: {
      pretitulo: home.testimoniosPretitulo,
      titulo: home.testimoniosTitulo ?? 'Familias que avanzan junto a nosotros',
      items: testimonios.map((testimonio) => ({
        id: testimonio.id,
        slug: testimonio.slug,
        tituloCorto:
          testimonio.testimonioFields.tituloCortoCard?.trim() ||
          testimonio.title,
        descripcionCorta:
          testimonio.testimonioFields.descripcionCortaCard?.trim() ||
          stripHtml(testimonio.testimonioFields.texto).slice(0, 180) +
            (stripHtml(testimonio.testimonioFields.texto).length > 180 ? '...' : ''),
        author: testimonio.testimonioFields.autorNombre,
        role: testimonio.testimonioFields.autorRol,
        imageSrc: testimonio.featuredImage?.node?.sourceUrl,
        imageAlt: testimonio.featuredImage?.node?.altText ?? testimonio.testimonioFields.autorNombre,
        servicioNombre: testimonio.testimonioFields.servicioRelacionado?.title ?? null,
        servicioSlug: testimonio.testimonioFields.servicioRelacionado?.slug ?? null,
      })),
    },
    faqs: {
      pretitulo: home.faqsPretitulo,
      titulo: home.faqsTitulo ?? 'Resolvemos tus dudas',
      parrafo: home.faqsParrafo,
      ctaLabel: home.faqsCtaLabel,
      ctaHref: home.faqsCtaHref,
      items: faqs.slice(0, 5).map((faq) => ({
        pregunta: faq.faqFields.pregunta,
        respuesta: faq.faqFields.respuesta,
      })),
    },
    cta: {
      pretitulo: home.ctaPretitulo,
      titulo: home.ctaTitulo ?? '¿Listo para transformar el aprendizaje?',
      cuerpo: home.ctaCuerpo,
      botonTexto: home.ctaBotonTexto ?? 'Agendar ahora',
      botonHref: home.ctaBotonUrl ?? '/contacto',
      imagenSrc: home.ctaImagen?.node?.sourceUrl,
      imagenAlt: home.ctaImagen?.node?.altText,
    },
  }

  return <HomeTemplate {...templateProps} />
}
