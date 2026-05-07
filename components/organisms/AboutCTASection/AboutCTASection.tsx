import { ServiceCTASection } from '@/components/organisms/ServiceCTASection'
import type { AboutCTASectionProps } from './AboutCTASection.types'

export function AboutCTASection({
  pretitulo,
  titulo,
  cuerpo,
  botonTexto,
  botonHref,
  imagenSrc,
  imagenAlt,
}: AboutCTASectionProps) {
  return (
    <ServiceCTASection
      pretitulo={pretitulo}
      heading={titulo}
      descripcion={cuerpo ?? ''}
      ctaLabel={botonTexto}
      ctaHref={botonHref}
      imagenSrc={imagenSrc}
      imagenAlt={imagenAlt}
    />
  )
}
