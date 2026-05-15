export interface TestimonioCardProps {
  id: string
  quote: string
  author: string
  role?: string
  imageSrc?: string
  imageAlt?: string
  rating?: number
  servicioNombre?: string | null
  servicioSlug?: string | null
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
