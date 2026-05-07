import { ServiceCTASection } from '@/components/organisms/ServiceCTASection'
import type { ProgramaCTABottomSectionProps } from './ProgramaCTABottomSection.types'

export function ProgramaCTABottomSection({
  pretitulo,
  heading,
  descripcion,
  ctaLabel,
  ctaHref = '#',
  imagenSrc,
  imagenAlt,
}: ProgramaCTABottomSectionProps) {
  if (!ctaLabel) return null

  return (
    <section className="bg-gradient-to-b from-brand-crema to-brand-celeste">
      <ServiceCTASection
        pretitulo={pretitulo}
        heading={heading}
        descripcion={descripcion}
        ctaLabel={ctaLabel}
        ctaHref={ctaHref}
        imagenSrc={imagenSrc}
        imagenAlt={imagenAlt}
        wrapperClassName="bg-transparent"
      />

      <div className="px-5 pb-4 pt-4 md:px-8 md:pb-4 md:pt-6">
        <div className="mx-auto w-full max-w-[1260px]">
          <div className="flex justify-center">
            <img
              src="/separador amarillo.svg"
              alt=""
              aria-hidden="true"
              className="w-full max-w-[300px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
