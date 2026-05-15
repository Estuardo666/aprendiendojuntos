import type { WPImagen } from './servicio.types'

export interface WPPaginaHeroOptions {
  bgHeroImagen?: {
    node?: WPImagen | null
  } | null
  pretitulo?: string | null
  titulo?: string | null
  descripcion?: string | null
}
