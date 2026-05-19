import { ServicesHero } from '@/components/organisms/ServicesHero'
import { RecursosListSection } from '@/components/organisms/RecursosListSection'
import { ServiceCTASection } from '@/components/organisms/ServiceCTASection'
import type { RecursosPageTemplateProps } from './RecursosPageTemplate.types'

export function RecursosPageTemplate({ hero, items, cta }: RecursosPageTemplateProps) {
  return (
    <main className="bg-brand-crema">
      <ServicesHero {...hero} />
      <RecursosListSection items={items} />
      <ServiceCTASection {...cta} />
    </main>
  )
}
