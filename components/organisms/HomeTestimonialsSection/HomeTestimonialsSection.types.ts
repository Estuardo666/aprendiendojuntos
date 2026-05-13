export interface HomeTestimonialCard {
  id: string
  quote: string
  author: string
  role: string
  rating?: number
  imageSrc?: string
  imageAlt?: string
}

export interface HomeTestimonialsSectionProps {
  pretitulo?: string | null
  titulo: string
  parrafo?: string | null
  testimonios: HomeTestimonialCard[]
  botonLabel?: string | null
  botonHref?: string | null
}
