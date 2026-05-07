import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getServicio, getServicios } from '@/lib/api/servicios'
import { getOpciones } from '@/lib/api/opciones'
import { getGlobalNavbarLinks } from '@/lib/navigation'
import { ServicioDetalleTemplate } from '@/components/templates/ServicioDetalleTemplate'
import type { BadgeProps } from '@/components/atoms/Badge'

async function getServiciosSafe() {
  try {
    return await getServicios()
  } catch {
    return []
  }
}

async function getServicioSafe(slug: string) {
  try {
    return await getServicio(slug)
  } catch {
    return null
  }
}

async function getOpcionesSafe() {
  try {
    return await getOpciones()
  } catch {
    return null
  }
}

async function getGlobalNavbarLinksSafe() {
  try {
    return await getGlobalNavbarLinks()
  } catch {
    return []
  }
}

// ─── Helper: mapea el string de categoría a la variante del Badge ────────────
const mapCategoria = (cat: string | string[] | null | undefined): BadgeProps['variant'] => {
  const raw = Array.isArray(cat) ? (cat[0] ?? '') : (cat ?? '')
  const lower = raw.toLowerCase()
  if (lower.includes('neuro'))  return 'neuropsicologia'
  if (lower.includes('psico'))  return 'psicopedagogia'
  if (lower.includes('lengua')) return 'lenguaje'
  if (lower.includes('sensor')) return 'sensorial'
  return 'default'
}

// ─── Parámetros estáticos para SSG ───────────────────────────────────────────
export async function generateStaticParams() {
  const servicios = await getServiciosSafe()
  return servicios.map(s => ({ slug: s.slug }))
}

// ─── Metadatos dinámicos por servicio ────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const servicio = await getServicioSafe(slug)
  if (!servicio) return { title: 'Servicio no encontrado' }

  const descripcion =
    servicio.servicioFields.metaDescripcion ||
    servicio.servicioFields.descripcionCorta

  return {
    title: `${servicio.title} | Centro Aprendiendo Juntos`,
    description: descripcion,
    openGraph: {
      title: servicio.title,
      description: descripcion,
      images: servicio.featuredImage?.node.sourceUrl
        ? [{ url: servicio.featuredImage.node.sourceUrl }]
        : [],
    },
  }
}

// ─── Page: Server Component puro, sin JSX de UI propio ───────────────────────
export default async function ServicioDetallePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Fetch en paralelo: servicio y opciones globales del centro
  const [servicio, opciones, navbarLinks] = await Promise.all([
    getServicioSafe(slug),
    getOpcionesSafe(),
    getGlobalNavbarLinksSafe(),
  ])

  // Si el servicio no existe en WP → 404
  if (!servicio) notFound()

  const { servicioFields: sf } = servicio

  // ── HERO: banner principal del servicio ─────────────────────────────────────
  const hero = {
    titulo:      servicio.title,
    descripcion: sf.descripcionCorta,
    categoria:   Array.isArray(sf.categoria) ? (sf.categoria[0] ?? 'Servicio') : (sf.categoria ?? 'Servicio'),
    categoriaVariant: mapCategoria(sf.categoria),
    imagenSrc:   servicio.featuredImage?.node.sourceUrl
      ?? '/images/hero-default.jpg',
    imagenAlt:   servicio.featuredImage?.node.altText
      ?? servicio.title,
    ctaPrimaryLabel:    sf.ctaLabel ?? 'Agendar cita',
    ctaPrimaryHref:     sf.ctaHref  ?? '/contacto',
    ctaSecondaryLabel:  sf.ctaHeroSecundarioLabel,
    ctaSecondaryHref:   sf.ctaHeroSecundarioHref,
  }

  // ── CONTENIDO: descripción larga y tags del servicio ────────────────────────
  const contenido = {
    pretitulo:        'Conoce nuestro servicio',
    heading:          `¿Qué es ${servicio.title.toLowerCase()}?`,
    descripcionLarga: sf.descripcionLarga ?? '',
    imagenSrc:        sf.imagenHero?.node.sourceUrl
      ?? servicio.featuredImage?.node.sourceUrl,
    imagenAlt:        sf.imagenHero?.node.altText
      ?? servicio.featuredImage?.node.altText
      ?? servicio.title,
    ctaLabel:         sf.ctaLabel ?? 'Agendar cita',
    ctaHref:          sf.ctaHref ?? '/contacto',
  }

  // ── PROCESO: pasos de trabajo con el servicio ────────────────────────────────
  const proceso = {
    pretitulo: 'Cómo trabajamos',
    heading:   '¿Cómo es el proceso?',
    pasos: (sf.proceso ?? []).map(p => ({
      numero:      p.numero,
      titulo:      p.titulo,
      descripcion: p.descripcion,
      imagenSrc:   p.imagen?.node.sourceUrl,
      imagenAlt:   p.imagen?.node.altText ?? p.titulo,
      ctaLabel:    p.ctaLabel,
      ctaHref:     p.ctaHref,
    })),
  }

  // ── CTA SECTION: llamada a la acción principal ────────────────────────────────
  const cta = {
    pretitulo:   'Próximos pasos',
    heading:     sf.ctaHeading     ?? '¿Listo para dar el primer paso?',
    descripcion: sf.ctaDescripcion ?? 'Agenda una evaluación inicial gratuita.',
    ctaLabel:    sf.ctaLabel       ?? 'Agendar evaluación gratuita',
    ctaHref:     sf.ctaHref        ?? '/contacto',
    imagenSrc:   sf.ctaImagen?.node.sourceUrl,
    imagenAlt:   sf.ctaImagen?.node.altText ?? 'Agendar cita',
  }

  // ── FAQs: preguntas específicas del servicio (opcional) ──────────────────────
  // Si el servicio no tiene FAQs personalizadas, el organismo las omite
  const faqNodes = sf.faqsPersonalizadas?.nodes ?? []
  const faqs = faqNodes.length > 0
    ? {
        pretitulo: 'Resolvemos tus dudas',
        heading:    'Preguntas frecuentes',
        faqs: faqNodes
          .sort((a, b) => (a.faqFields.orden ?? 0) - (b.faqFields.orden ?? 0))
          .map(f => ({
            pregunta:  f.faqFields.pregunta,
            respuesta: f.faqFields.respuesta,
          })),
      }
    : undefined

  // ── MÁS SERVICIOS: slider con servicios relacionados (máx 4) ─────────────────
  const masServicios = {
    heading: 'Más servicios',
    slides: (sf.serviciosRelacionados?.nodes ?? []).map(s => ({
      titulo:    s.title,
      slug:      s.slug,
      imagenSrc: s.featuredImage?.node.sourceUrl,
      imagenAlt: s.featuredImage?.node.altText ?? s.title,
      categoria: Array.isArray(s.servicioFields.categoria) ? (s.servicioFields.categoria[0] ?? 'Servicio') : (s.servicioFields.categoria ?? 'Servicio'),
      ctaLabel:  'Ver servicio',
    })),
  }

  // ── MARQUEE: keywords del servicio con fallback genérico del centro ───────────
  const keywords = sf.keywordsMarquee && sf.keywordsMarquee.length > 0
    ? sf.keywordsMarquee
    : [
        { texto: 'Neuropsicología', emoji: '🧠' },
        { texto: 'Aprendizaje',     emoji: '📚' },
        { texto: 'Acompañamiento',  emoji: '🤝' },
        { texto: 'Potencial',       emoji: '🌟' },
        { texto: 'Neurodiversidad', emoji: '🌈' },
        { texto: 'Familias',        emoji: '👨‍👩‍👧' },
      ]

  const marquee = {
    keywords,
    velocidad: 'normal' as const,
  }

  // ── FOOTER: datos de contacto desde opciones globales de WP ──────────────────
  const footer = {
    links: navbarLinks,
    contactItems: [
      {
        type:  'telefono' as const,
        label: 'Teléfono',
        value: opciones?.contactoTelefono ?? '(07) 261-3255',
        href:  `tel:${opciones?.contactoTelefono ?? '072613255'}`,
      },
      {
        type:  'direccion' as const,
        label: 'Dirección',
        value: opciones?.contactoDireccion
          ?? 'Bilbao entre Valencia y Lérida, Loja',
      },
      {
        type:  'whatsapp' as const,
        label: 'WhatsApp',
        value: opciones?.ctaWhatsappNumero ?? '098 578 8925',
        href:  `https://wa.me/${
          opciones?.ctaWhatsappNumero?.replace(/\D/g, '')
          ?? '593985788925'
        }`,
      },
    ],
    socialLinks: [
      { platform: 'instagram' as const,
        href: 'https://www.instagram.com/aprendiendojuntosec/' },
      { platform: 'facebook'  as const,
        href: 'https://www.facebook.com/aprendiendojuntosec/' },
    ],
  }

  // ── RENDER: delega todo el UI al template ────────────────────────────────────
  return (
    <ServicioDetalleTemplate
      hero={hero}
      contenido={contenido}
      proceso={proceso}
      cta={cta}
      faqs={faqs}
      masServicios={masServicios}
      marquee={marquee}
      footer={footer}
    />
  )
}
