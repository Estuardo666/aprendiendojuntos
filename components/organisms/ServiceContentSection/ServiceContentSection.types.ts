export interface ServiceContentSectionProps {
  pretitulo?: string
  heading: string
  /** HTML string proveniente de WordPress — renderizado con dangerouslySetInnerHTML */
  descripcionLarga: string
  imagenSrc?: string
  imagenAlt?: string
  ctaLabel?: string
  ctaHref?: string
}
