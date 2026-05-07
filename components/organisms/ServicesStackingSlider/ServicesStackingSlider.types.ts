export interface StackingSlide {
  titulo: string
  slug: string
  imagenSrc?: string
  imagenAlt?: string
  categoria: string
  ctaLabel?: string
}

export interface ServicesStackingSliderProps {
  heading: string
  slides: StackingSlide[]
  hrefBase?: string
}
