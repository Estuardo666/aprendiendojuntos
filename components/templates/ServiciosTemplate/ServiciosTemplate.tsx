import { ServicesHero } from '@/components/organisms/ServicesHero'
import { FeaturedServicesSection } from '@/components/organisms/FeaturedServicesSection'
import { ServicesListSection } from '@/components/organisms/ServicesListSection'
import { ServiceCTASection } from '@/components/organisms/ServiceCTASection'
import type { ServiciosTemplateProps } from './ServiciosTemplate.types'

export function ServiciosTemplate({
  hero,
  destacados,
  resto,
  cta,
}: ServiciosTemplateProps) {
  return (
    <main className="bg-brand-crema">
      <ServicesHero {...hero} />

      <FeaturedServicesSection {...destacados} />

      <ServicesListSection {...resto} />

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
