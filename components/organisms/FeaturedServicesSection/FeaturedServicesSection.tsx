import { ServiceFeaturedCard } from '@/components/molecules/ServiceFeaturedCard'
import type { FeaturedServicesSectionProps } from './FeaturedServicesSection.types'

export function FeaturedServicesSection({
  servicios,
}: FeaturedServicesSectionProps) {
  return (
    <section className="px-4 pb-8 pt-4 md:px-6 md:pb-10 md:pt-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
        {servicios.map((servicio, index) => (
          <ServiceFeaturedCard key={index} {...servicio} />
        ))}
      </div>
    </section>
  )
}
