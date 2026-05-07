import type { WPImagen } from '@/lib/types/nosotros.types'

export interface AboutStoryAccordionItem {
  titulo: string
  contenido: string
}

export interface AboutStorySectionProps {
  pretitulo: string
  titulo: string
  parrafo: string
  accordionItems: AboutStoryAccordionItem[]
  imagenes: WPImagen[]
}
