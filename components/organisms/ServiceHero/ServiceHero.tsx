import Image from 'next/image'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import type { ServiceHeroProps } from './ServiceHero.types'

/**
 * Hero de página de servicio.
 * Imagen de fondo full-width con overlay degradado azul izq→der.
 * Contenido anclado al borde inferior: bloque izquierdo con título y CTAs,
 * bloque derecho con botón extra flotante (solo desktop).
 */
export function ServiceHero({
  titulo,
  descripcion,
  categoria,
  imagenSrc,
  imagenAlt,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  botonExtraLabel,
  botonExtraHref,
}: ServiceHeroProps) {
  const ctaLabel = botonExtraLabel ?? ctaPrimaryLabel
  const ctaHref = botonExtraHref ?? ctaPrimaryHref

  return (
    <section className="pb-14 pt-14 md:pb-20 md:pt-20">
      <div className="mx-auto w-[97vw] md:w-[95vw]">
        <div className="relative md:-mt-[3.25vh] h-[65vh] min-h-[300px] overflow-hidden rounded-[2rem] md:rounded-[2.75rem] md:z-[-1]">
          <Image
            src={imagenSrc}
            alt={imagenAlt}
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-[#efede4] via-[#efede4]/78 to-transparent" />
        </div>

        <div className="grid gap-8 px-0 pt-8 text-center md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10 md:px-[7vw] md:pt-10 md:text-left md:-mt-[11em] md:z-[9999]">
          <div className="mx-auto max-w-[52rem] md:mx-0">
            <span className="inline-flex rounded-full bg-[#9accea] px-[0.6rem] py-2.5 font-body text-[0.9625rem] font-medium leading-none text-brand-azul capitalize md:px-[1.3rem] md:py-3 md:text-[1.1rem]">
              {categoria}
            </span>

            <Heading
              as="h1"
              variant="display"
              animate={true}
              className="mx-auto mt-5 max-w-4xl text-[clamp(2.7rem,6.2vw,5.8rem)] font-bold leading-[0.94] tracking-[-0.065em] text-[#117fc3] md:mx-0"
            >
              {titulo}
            </Heading>

            {descripcion && (
              <Text
                variant="body"
                className="mx-auto mt-5 max-w-[48rem] text-[clamp(0.833rem,1.417vw,1.208rem)] leading-[1.22] text-[#253a44] md:mx-0"
              >
                {descripcion}
              </Text>
            )}
          </div>

          {ctaLabel && ctaHref && (
            <div className="flex justify-center md:justify-end md:pb-2">
              <Button
                variant="primary"
                size="md"
                href={ctaHref}
                iconName="ArrowRightIcon"
                iconAnimation="slide"
                className="justify-center self-start rounded-full !min-h-[46px] !px-6 !py-3 font-body text-[0.98rem] font-semibold tracking-[-0.03em] shadow-[0_16px_40px_rgba(250,182,0,0.2)] md:min-w-[148px] md:text-[18px]"
              >
                {ctaLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
