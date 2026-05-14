export interface TestimonialLandingCard {
  id: string
  quote: string
  author: string
  role: string
  rating?: number
  imageSrc?: string
  imageAlt?: string
}

export interface TestimonialsLandingSectionProps {
  pretitulo?: string | null
  titulo: string
  parrafo?: string | null
  testimonios: TestimonialLandingCard[]
  botonLabel?: string | null
  botonHref?: string | null
}
