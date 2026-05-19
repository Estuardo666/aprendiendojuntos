import { RecursoCard } from '@/components/organisms/RecursoCard'
import type { RecursosListSectionProps } from './RecursosListSection.types'

export function RecursosListSection({ items }: RecursosListSectionProps) {
  if (items.length === 0) {
    return (
      <section className="py-16 px-4 text-center">
        <p className="text-[#4a5c65]">No hay recursos disponibles por el momento.</p>
      </section>
    )
  }

  return (
    <section className="mx-auto w-[97vw] max-w-5xl py-12 md:w-[95vw] md:py-16">
      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <RecursoCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
