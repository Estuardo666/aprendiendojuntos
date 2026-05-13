import type { ServiceFeaturedCardProps } from '@/components/molecules/ServiceFeaturedCard'

export interface HomeServicesCarouselProps {
  servicios: ServiceFeaturedCardProps[]
  botonLabel?: string | null
  botonHref?: string | null
}
