import { ServicesHero } from '@/components/organisms/ServicesHero'
import { TestimoniosGrid } from '@/components/organisms/TestimoniosGrid'
import type { TestimoniosPageTemplateProps } from './TestimoniosPageTemplate.types'

export function TestimoniosPageTemplate({
  hero,
  items,
}: TestimoniosPageTemplateProps) {
  return (
    <main className="bg-brand-crema">
      <ServicesHero {...hero} />
      <TestimoniosGrid items={items} />
    </main>
  )
}
