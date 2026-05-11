import type { ServicesHeroProps } from '@/components/organisms/ServicesHero'
import type { ProgramFeaturedSliderProps } from '@/components/organisms/ProgramFeaturedSlider'
import type { ProgramListSectionProps } from '@/components/organisms/ProgramListSection'
import type { ServiceCTASectionProps } from '@/components/organisms/ServiceCTASection'

export interface ProgramasTemplateProps {
  hero: ServicesHeroProps
  featured: ProgramFeaturedSliderProps
  resto: ProgramListSectionProps
  cta: ServiceCTASectionProps
}
