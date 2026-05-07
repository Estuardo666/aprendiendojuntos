// Imagen WP reutilizable
export interface WPImagen {
  sourceUrl: string
  altText: string
}

// Paso del proceso
export interface WPProcesoPaso {
  numero: number
  titulo: string
  descripcion: string
  /** Campo imagen ACF — WPGraphQL devuelve AcfMediaItemConnectionEdge */
  imagen?: { node: WPImagen }
  ctaLabel?: string
  ctaHref?: string
}

// Keyword para marquee
export interface WPKeywordMarquee {
  texto: string
  emoji: string
}

// Tag
export interface WPTag {
  tag: string
}

// Servicio relacionado (versión reducida)
export interface WPServicioRelacionado {
  id: string
  title: string
  slug: string
  servicioFields: {
    descripcionCorta: string
    iconoEmoji: string
    categoria: string | string[]
  }
  featuredImage?: {
    node: WPImagen
  }
}

// FAQ relacionada
export interface WPFAQRelacionada {
  id: string
  faqFields: {
    pregunta: string
    respuesta: string
    orden?: number
  }
}

// Campos ACF del servicio (completos)
export interface WPServicioFields {
  tituloCorto?: string
  descripcionCorta: string
  descripcionLarga: string
  iconoEmoji: string
  categoria: string | string[]
  destacado?: boolean
  /** Campo imagen ACF expuesto por WPGraphQL como AcfMediaItemConnectionEdge */
  imagenHero?: { node: WPImagen }
  ctaHeroSecundarioLabel?: string
  ctaHeroSecundarioHref?: string
  metaDescripcion?: string
  proceso?: WPProcesoPaso[]
  tags?: WPTag[]
  serviciosRelacionados?: { nodes: WPServicioRelacionado[] }
  ctaHeading?: string
  ctaDescripcion?: string
  ctaLabel?: string
  ctaHref?: string
  /** Campo imagen ACF — WPGraphQL devuelve AcfMediaItemConnectionEdge */
  ctaImagen?: { node: WPImagen }
  faqsPersonalizadas?: { nodes: WPFAQRelacionada[] }
  keywordsMarquee?: WPKeywordMarquee[]
}

// Tipo principal del CPT
export interface WPServicio {
  id: string
  title: string
  slug: string
  servicioFields: WPServicioFields
  featuredImage?: {
    node: WPImagen
  }
}

// Tipo reducido para listados (sin campos pesados)
export interface WPServicioResumen {
  id: string
  title: string
  slug: string
  servicioFields: Pick<WPServicioFields,
    'descripcionCorta' | 'iconoEmoji' | 'categoria' | 'destacado'
  >
  featuredImage?: {
    node: WPImagen
  }
}
