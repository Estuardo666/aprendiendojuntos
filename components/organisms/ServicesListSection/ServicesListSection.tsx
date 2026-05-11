import { ServiceListCard } from '@/components/molecules/ServiceListCard'
import type { ServicesListSectionProps } from './ServicesListSection.types'

export function ServicesListSection({
  servicios,
}: ServicesListSectionProps) {
  return (
    <section className="px-4 pb-8 pt-4 md:px-6 md:pb-10 md:pt-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {servicios.map((servicio, index) => (
          <ServiceListCard key={index} {...servicio} />
        ))}
      </div>
    </section>
  )
}
