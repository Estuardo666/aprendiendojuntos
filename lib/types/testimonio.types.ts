import type { WPImagen } from '@/lib/types/servicio.types'

export interface WPVideoTestimonial {
  node?: {
    mediaItemUrl?: string | null
    mimeType?: string | null
  } | null
}

export interface WPServicioRelacionado {
  nodes: {
    id: string
    title: string
    slug: string
  }[]
}

export interface WPTestimonioFields {
  autorNombre: string
  autorRol: string
  texto: string
  calificacion: number
  tituloCortoCard?: string | null
  descripcionCortaCard?: string | null
  videoTestimonial?: WPVideoTestimonial | null
  servicioRelacionado?: WPServicioRelacionado | null
}

export interface WPTestimonio {
  id: string
  databaseId: number
  title: string
  slug: string
  testimonioFields: WPTestimonioFields
  featuredImage?: {
    node?: WPImagen | null
  } | null
}
