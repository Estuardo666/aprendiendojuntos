export interface HomeTestimonialItem {
  id: string
  slug: string
  tituloCorto: string
  descripcionCorta: string
  author: string
  role: string
  imageSrc?: string
  imageAlt?: string
  servicioNombre?: string | null
  servicioSlug?: string | null
}

export interface HomeTestimonialsSectionProps {
  pretitulo?: string | null
  titulo: string
  testimonios: HomeTestimonialItem[]
}
