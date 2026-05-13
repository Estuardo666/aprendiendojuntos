import { Button } from '@/components/atoms/Button'
import { ProgramListSection } from '@/components/organisms/ProgramListSection'
import { HomeSectionHeader } from '@/components/organisms/HomeSectionHeader'
import type { HomeProgramsSectionProps } from './HomeProgramsSection.types'

export function HomeProgramsSection({
  pretitulo,
  titulo,
  parrafo,
  programas,
  botonLabel,
  botonHref,
}: HomeProgramsSectionProps) {
  if (programas.length === 0) return null

  return (
    <section className="bg-brand-crema py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HomeSectionHeader pretitulo={pretitulo} titulo={titulo} parrafo={parrafo} />
      </div>
      <div className="mt-10">
        <ProgramListSection programas={programas} />
      </div>
      {botonLabel && botonHref && (
        <div className="mt-8 flex justify-center px-6">
          <Button
            variant="primary"
            size="md"
            href={botonHref}
            iconName="ArrowRightIcon"
            iconAnimation="slide"
            className="rounded-full"
          >
            {botonLabel}
          </Button>
        </div>
      )}
    </section>
  )
}
