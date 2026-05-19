import type { ServicesHeroProps } from '@/components/organisms/ServicesHero'
import type { RecursoCardItem } from '@/components/organisms/RecursoCard'
import type { ServiceCTASectionProps } from '@/components/organisms/ServiceCTASection'

export interface RecursosPageTemplateProps {
  hero: ServicesHeroProps
  items: RecursoCardItem[]
  cta: ServiceCTASectionProps
}
