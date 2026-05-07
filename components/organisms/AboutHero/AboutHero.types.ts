import type { WPImagenItem, WPPaginaNosotrosFields } from '@/lib/types/nosotros.types'

export interface AboutHeroProps {
  pretitulo: string
  titulo: WPPaginaNosotrosFields['heroTitulo']
  descripcion?: WPPaginaNosotrosFields['heroSubtitulo']
  imagenDestacada?: WPPaginaNosotrosFields['imagenDestacada']
  imagenesCarrusel?: WPImagenItem[]
}
