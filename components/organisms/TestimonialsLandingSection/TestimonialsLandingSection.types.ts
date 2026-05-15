export interface TestimonialLandingCard {
  id: string
  quote: string
  author: string
  role: string
  rating?: number
  imageSrc?: string
  imageAlt?: string
  texto: string
  calificacion: number
  videoUrl?: string | null
  imagenDestacadaTestimonioSrc?: string
  imagenDestacadaTestimonioAlt?: string
  servicioNombre?: string | null
  servicioSlug?: string | null
}

export interface TestimonialsLandingSectionProps {
  pretitulo?: string | null
  titulo: string
  parrafo?: string | null
  testimonios: TestimonialLandingCard[]
  botonLabel?: string | null
  botonHref?: string | null
}
