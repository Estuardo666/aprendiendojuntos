import type { WPImagen } from './servicio.types'

export interface WPBloqueRepetidor {
  tituloRepetidor: string
  tituloInterno?: string | null
  contenidoWysiwyg?: string | null
}

export interface WPLandingBeneficio {
  icono: string
  texto: string
}

export interface WPLandingFAQNode {
  id: string
  faqFields?: {
    pregunta: string
    respuesta: string
  }
}

export interface WPLandingTestimonioNode {
  id: string
  testimonioFields?: {
    autorNombre?: string | null
    autorRol?: string | null
    texto: string
    calificacion?: number | null
  }
}

export interface WPLandingPageFields {
  imagenHero?: { node: WPImagen } | null
  pretitulo?: string | null
  titulo: string
  descripcionCorta?: string | null
  infoEvento?: string | null
  formTitulo?: string | null
  formCtaTexto?: string | null
  urgencia?: string | null
  beneficios?: WPLandingBeneficio[] | null
  faqs?: { nodes: WPLandingFAQNode[] } | null
  testimonios?: { nodes: WPLandingTestimonioNode[] } | null
  bloquesRepetidor?: WPBloqueRepetidor[] | null
  imagenCta?: { node: WPImagen } | null
  ctaPretitulo?: string | null
  ctaTitulo?: string | null
  ctaSubtitulo?: string | null
  ctaTextoBoton?: string | null
  ctaLinkBoton?: string | null
}

export interface WPLandingPage {
  id: string
  title: string
  slug: string
  landingPageFields: WPLandingPageFields
}

export interface LandingBeneficio {
  icono: string
  texto: string
}

export interface LandingFAQ {
  id: string
  pregunta: string
  respuesta: string
}

export interface LandingTestimonio {
  id: string
  autor: string
  cargo?: string
  texto: string
  calificacion?: number
}

export interface LandingPageData {
  slug: string
  title: string
  imagenHeroSrc?: string
  imagenHeroAlt?: string
  pretitulo?: string
  titulo: string
  descripcionCorta?: string
  infoEvento?: string
  formTitulo: string
  formCtaTexto: string
  urgencia?: string
  beneficios?: LandingBeneficio[]
  faqs?: LandingFAQ[]
  testimonios?: LandingTestimonio[]
  bloquesRepetidor?: WPBloqueRepetidor[]
  imagenCtaSrc?: string
  imagenCtaAlt?: string
  ctaPretitulo?: string
  ctaTitulo?: string
  ctaSubtitulo?: string
  ctaTextoBoton?: string
  ctaLinkBoton?: string
}
