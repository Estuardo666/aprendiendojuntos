import type { TestimonialPopupData } from '@/components/molecules/TestimonialPopup'

export interface TestimonioGridItem {
  id: string
  quote: string
  author: string
  role?: string
  imageSrc?: string
  imageAlt?: string
  rating?: number
  servicioSlug?: string | null
  servicioNombre?: string | null
  texto: string
  calificacion: number
  videoUrl?: string | null
  imagenDestacadaTestimonioSrc?: string
  imagenDestacadaTestimonioAlt?: string
}

export interface TestimoniosGridProps {
  items: TestimonioGridItem[]
}
