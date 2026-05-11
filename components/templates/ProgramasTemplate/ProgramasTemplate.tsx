import { ServicesHero } from '@/components/organisms/ServicesHero'
import { ProgramFeaturedSlider } from '@/components/organisms/ProgramFeaturedSlider'
import { ProgramListSection } from '@/components/organisms/ProgramListSection'
import { ServiceCTASection } from '@/components/organisms/ServiceCTASection'
import type { ProgramasTemplateProps } from './ProgramasTemplate.types'

export function ProgramasTemplate({
  hero,
  featured,
  resto,
  cta,
}: ProgramasTemplateProps) {
  return (
    <main className="bg-brand-crema">
      <ServicesHero {...hero} />

      <ProgramFeaturedSlider {...featured} />

      <ProgramListSection {...resto} />

      {/* Separador amarillo centrado */}
      <div className="flex justify-center px-4 py-8 md:px-6 md:py-10">
        <img
          src="/separador amarillo.svg"
          alt=""
          aria-hidden="true"
          className="h-6 w-auto max-w-[215px]"
        />
      </div>

      <ServiceCTASection {...cta} />
    </main>
  )
}
