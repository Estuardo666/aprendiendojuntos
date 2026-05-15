import type { ServicesHeroProps } from '@/components/organisms/ServicesHero'
import type { TestimonioGridItem } from '@/components/organisms/TestimoniosGrid'

export interface TestimoniosPageTemplateProps {
  hero: ServicesHeroProps
  items: TestimonioGridItem[]
}
