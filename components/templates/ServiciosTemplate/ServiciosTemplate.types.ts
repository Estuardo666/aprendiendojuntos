import type { ServicesHeroProps } from '@/components/organisms/ServicesHero'
import type { FeaturedServicesSectionProps } from '@/components/organisms/FeaturedServicesSection'
import type { ServicesListSectionProps } from '@/components/organisms/ServicesListSection'
import type { ServiceCTASectionProps } from '@/components/organisms/ServiceCTASection'

export interface ServiciosTemplateProps {
  hero: ServicesHeroProps
  destacados: FeaturedServicesSectionProps
  resto: ServicesListSectionProps
  cta: ServiceCTASectionProps
}
