import type { WPPaginaHeroOptions } from './pagina-options.types'

export interface WPRecursoFields {
  subtitulo?: string | null
  descripcion?: string | null
  archivo?: {
    node?: {
      mediaItemUrl: string
      filePath?: string | null
      mimeType?: string | null
    } | null
  } | null
}

export interface WPRecurso {
  id: string
  title: string
  recursoFields: WPRecursoFields
}

export type WPPaginaRecursosOptions = WPPaginaHeroOptions

export interface WPOpcionesPaginaRecursos {
  opcionesAprendiendoJuntos?: {
    opcionesPaginaRecursos?: WPPaginaRecursosOptions | null
  } | null
}
