import type { WPImagen } from '@/lib/types/servicio.types'

export interface WPTestimonioFields {
  autorNombre: string
  autorRol: string
  texto: string
  calificacion: number
}

export interface WPTestimonio {
  id: string
  title: string
  testimonioFields: WPTestimonioFields
  featuredImage?: {
    node?: WPImagen | null
  } | null
}
