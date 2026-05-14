import type { ServiceFeaturedCardProps } from '@/components/molecules/ServiceFeaturedCard'
import type { ProgramListCardProps } from '@/components/molecules/ProgramListCard'
import type { KeywordsMarqueeProps } from '@/components/organisms/KeywordsMarquee'
import type { ProcessStep } from '@/components/organisms/ProcessStepsSection'
import type { HomeTestimonialItem } from '@/components/organisms/HomeTestimonialsSection'

export interface HomeTemplateProps {
  hero: {
    pretitulo?: string | null
    titulo: string
    subtitulo?: string | null
    videoSrc?: string | null
    ctaPrimarioLabel?: string | null
    ctaPrimarioHref?: string | null
    ctaSecundarioLabel?: string | null
    ctaSecundarioHref?: string | null
  }
  keywords: KeywordsMarqueeProps['keywords']
  sobre: {
    imagenSrc?: string | null
    imagenAlt?: string | null
    pretitulo?: string | null
    titulo: string
    descripcion?: string | null
    botonLabel?: string | null
    botonHref?: string | null
  }
  servicios: {
    pretitulo?: string | null
    titulo: string
    parrafo?: string | null
    items: ServiceFeaturedCardProps[]
    botonLabel?: string | null
    botonHref?: string | null
  }
  programas: {
    pretitulo?: string | null
    titulo: string
    parrafo?: string | null
    items: ProgramListCardProps[]
    botonLabel?: string | null
    botonHref?: string | null
  }
  proceso: {
    pretitulo?: string | null
    titulo: string
    parrafo?: string | null
    ctaLabel?: string | null
    ctaHref?: string | null
    pasos: ProcessStep[]
  }
  testimonios: {
    pretitulo?: string | null
    titulo: string
    items: HomeTestimonialItem[]
  }
  faqs: {
    pretitulo?: string | null
    titulo: string
    parrafo?: string | null
    items: { pregunta: string; respuesta: string }[]
    ctaLabel?: string | null
    ctaHref?: string | null
  }
  cta: {
    pretitulo?: string | null
    titulo: string
    cuerpo?: string | null
    botonTexto: string
    botonHref: string
    imagenSrc?: string
    imagenAlt?: string | null
  }
}
