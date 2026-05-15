import type { WPPaginaHeroOptions } from './pagina-options.types'

export type WPPaginaTestimoniosOptions = WPPaginaHeroOptions

export interface WPOpcionesPaginaTestimonios {
  opcionesAprendiendoJuntos?: {
    opcionesPaginaTestimonios?: WPPaginaTestimoniosOptions | null
  } | null
}
