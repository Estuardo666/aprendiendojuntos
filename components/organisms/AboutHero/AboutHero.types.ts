import type { WPPaginaNosotrosFields } from '@/lib/types/nosotros.types'

export interface AboutHeroProps {
  pretitulo: string
  titulo: WPPaginaNosotrosFields['heroTitulo']
  descripcion?: WPPaginaNosotrosFields['heroSubtitulo']
  videoSrc?: WPPaginaNosotrosFields['heroVideo']
}
