import Image from 'next/image'
import { AnimatedGrowLine } from '@/components/organisms/AnimatedGrowLine'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { AboutHeroSlider } from './AboutHeroSlider'
import type { AboutHeroProps } from './AboutHero.types'

export function AboutHero({
  pretitulo,
  titulo,
  descripcion,
  imagenDestacada,
  imagenesCarrusel = [],
}: AboutHeroProps) {
  const imagenDestacadaSrc = imagenDestacada?.sourceUrl
  const imagenDestacadaAlt = imagenDestacada?.altText || titulo

  return (
    <section className="pb-14 pt-14 md:pb-20 md:pt-20">
      <div className="mx-auto w-[90vw] max-w-[1728px]">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] md:items-center md:gap-10">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-[#9accea] px-4.5 py-2.5 font-body text-[0.9625rem] font-medium leading-none text-brand-azul md:px-[1.3rem] md:py-3 md:text-[1.1rem]">
              {pretitulo}
            </span>

            <Heading
              as="h1"
              variant="display"
              animate={true}
              className="mt-5 text-[clamp(2.7rem,6.2vw,5.8rem)] font-bold leading-[0.94] text-[#117fc3]"
            >
              {titulo}
            </Heading>
          </div>

          {descripcion && (
            <Text
              variant="body"
              className="max-w-[48rem] text-[clamp(0.833rem,1.417vw,1.208rem)] leading-[1.22] text-[#253a44] text-justify md:justify-self-end md:self-end"
            >
              {descripcion}
            </Text>
          )}
        </div>

        <div className="relative mt-10">
          <AnimatedGrowLine
            imageSrc="/lineagrownosotros.svg"
            imageWidth={2809}
            imageHeight={140}
            widthClassName="w-screen"
            yOffsetClassName="-translate-y-1/2"
            className="-z-20"
          />

          <div className="grid gap-4 md:grid-cols-[minmax(250px,33%)_1fr]">
            <div className="relative h-[50vh] min-h-[280px] overflow-hidden rounded-[2rem]">
              {imagenDestacadaSrc ? (
                <Image
                  src={imagenDestacadaSrc}
                  alt={imagenDestacadaAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-brand-acua/35" aria-hidden="true" />
              )}
            </div>

            <AboutHeroSlider
              imagenes={imagenesCarrusel}
              fallbackSrc={imagenDestacadaSrc}
              fallbackAlt={imagenDestacadaAlt}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
