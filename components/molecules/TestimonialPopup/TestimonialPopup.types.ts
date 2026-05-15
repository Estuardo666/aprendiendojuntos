export interface TestimonialPopupData {
  id: string
  author: string
  role: string
  imageSrc?: string
  imageAlt?: string
  imagenDestacadaTestimonioSrc?: string
  imagenDestacadaTestimonioAlt?: string
  servicioNombre?: string | null
  servicioSlug?: string | null
  texto: string
  calificacion: number
  videoUrl?: string | null
}

export interface TestimonialPopupProps {
  testimonio: TestimonialPopupData
  isOpen: boolean
  onClose: () => void
  origin: { x: number; y: number }
}
