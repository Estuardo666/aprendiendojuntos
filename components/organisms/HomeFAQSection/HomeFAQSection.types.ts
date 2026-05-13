export interface HomeFAQSectionProps {
  pretitulo?: string | null
  heading: string
  faqs: { pregunta: string; respuesta: string }[]
  ctaLabel?: string | null
  ctaHref?: string | null
}
