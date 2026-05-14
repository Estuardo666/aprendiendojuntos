import type { WPImagen } from '@/lib/types/servicio.types'

export interface WPVideoTestimonial {
  url?: string | null
  mimeType?: string | null
}

export interface WPServicioRelacionado {
  id: string
  title: string
  slug: string
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
