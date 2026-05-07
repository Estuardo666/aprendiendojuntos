export interface FAQServiceSectionProps {
  pretitulo?: string
  heading: string
  faqs: { pregunta: string; respuesta: string }[]
  ctaLabel?: string
  ctaHref?: string
}
