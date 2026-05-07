import { ServicesStackingSlider } from '@/components/organisms/ServicesStackingSlider'
import type { ProgramaMasProgramasSectionProps } from './ProgramaMasProgramasSection.types'

export function ProgramaMasProgramasSection({
  heading = 'Más programas',
  slides,
}: ProgramaMasProgramasSectionProps) {
  if (slides.length === 0) return null

  return (
    <ServicesStackingSlider
      heading={heading}
      slides={slides}
      hrefBase="/programas"
    />
  )
}