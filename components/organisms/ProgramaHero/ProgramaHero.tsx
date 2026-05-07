import Image from 'next/image'
import { Button } from '@/components/atoms/Button'
import { Text } from '@/components/atoms/Text'
import { AnimatedGrowLine } from '@/components/organisms/AnimatedGrowLine'
import { ProgramaHeroSlider } from './ProgramaHeroSlider'
import type { ProgramaHeroProps } from './ProgramaHero.types'

/**
 * Hero de la plantilla Programa.
 * Layout centrado: pretitulo + logo imagen + descripcion + 2 botones
 * Debajo: carrusel de imágenes con parallax (90vw, rounded)
 */
export function ProgramaHero({
  pretitulo,
  logoSrc,
  logoAlt = 'Logo del programa',
  descripcion,
  cta1Label,
  cta1Href = '#',
  cta2Label,
  cta2Href = '#',
  imagenesCarrusel = [],
}: ProgramaHeroProps) {
  return (
    <section className="bg-brand-crema pb-10 pt-14 md:pb-14 md:pt-20">
      <div className="mx-auto w-[90vw] max-w-[1260px]">

        {/* Bloque centrado: pretitulo → logo → descripcion → botones */}
        <div className="flex flex-col items-center text-center">
          {pretitulo && (
            <h1 className="pretitulo mb-6">{pretitulo}</h1>
          )}

          {logoSrc && (
            <div className="relative mb-6 h-[120px] w-full max-w-[420px]">
              <Image
                src={logoSrc}
                alt={logoAlt}
                fill
                className="object-contain mix-blend-darken"
                priority
              />
            </div>
          )}

          {descripcion && (
            <Text
              variant="body"
              className="max-w-[52rem] text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.5] text-brand-texto"
            >
              {descripcion}
            </Text>
          )}

          {(cta1Label || cta2Label) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {cta1Label && (
                <Button
                  variant="primary"
                  size="lg"
                  href={cta1Href}
                  iconName="ArrowRightIcon"
                  iconAnimation="slide"
                  fillColor="bg-brand-azul"
                  hoverTextColor="text-white"
                  className="rounded-full"
                >
                  {cta1Label}
                </Button>
              )}
              {cta2Label && (
                <Button
                  variant="secondary"
                  size="lg"
                  href={cta2Href}
                  iconName="ArrowRightIcon"
                  iconAnimation="slide"
                  fillColor="bg-brand-celeste"
                  hoverTextColor="text-white"
                  className="rounded-full"
                >
                  {cta2Label}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Carrusel parallax */}
        {imagenesCarrusel.length > 0 && (
          <div className="relative mt-10 overflow-visible">
            <AnimatedGrowLine />
            <div className="relative z-10">
              <ProgramaHeroSlider imagenes={imagenesCarrusel} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
