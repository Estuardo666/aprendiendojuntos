export interface ProcessStep {
  numero: number
  titulo: string
  descripcion: string
  imagenSrc?: string
  imagenAlt?: string
  ctaLabel?: string
  ctaHref?: string
}

export interface ProcessStepsSectionProps {
  pretitulo?: string
  heading: string
  ctaLabel?: string
  ctaHref?: string
  pasos: ProcessStep[]
}
