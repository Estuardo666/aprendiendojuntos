import { ServicesHero } from '@/components/organisms/ServicesHero'
import { ArticulosGrid } from '@/components/organisms/ArticulosGrid'
import type { ArticulosTemplateProps } from './ArticulosTemplate.types'

export function ArticulosTemplate({ hero, items }: ArticulosTemplateProps) {
  return (
    <main className="bg-brand-crema">
      <ServicesHero {...hero} />
      <ArticulosGrid items={items} />
    </main>
  )
}
