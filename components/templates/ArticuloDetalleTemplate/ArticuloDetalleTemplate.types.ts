import type { ServicesStackingSliderProps } from '@/components/organisms/ServicesStackingSlider'

export interface ArticuloDetalleTemplateProps {
  slug: string
  hero: {
    titulo: string
    subtitulo?: string
    excerpt?: string
    fecha: string
    categoria: string
    imagenSrc?: string
    imagenAlt?: string
  }
  content: string
  archivoUrl?: string
  archivoNombre: string
  archivoSize?: string
  masArticulos: ServicesStackingSliderProps
}
