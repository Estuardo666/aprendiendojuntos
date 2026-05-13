import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import type { HomeHeroProps } from './HomeHero.types'

export function HomeHero({
  pretitulo,
  titulo,
  subtitulo,
  videoSrc,
  ctaPrimarioLabel,
  ctaPrimarioHref,
  ctaSecundarioLabel,
  ctaSecundarioHref,
}: HomeHeroProps) {
  return (
    <section className="bg-brand-crema pb-12 pt-14 md:pb-16 md:pt-20">
      <div className="mx-auto w-[97vw] md:w-[95vw]">
        <div className="relative md:-mt-[3.25vh] h-[78vh] min-h-[520px] overflow-hidden rounded-[2rem] md:h-[82vh] md:rounded-[2.75rem]">
          {videoSrc ? (
            <video
              key={videoSrc}
              className="absolute inset-0 h-full w-full object-cover object-center"
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={titulo}
            >
              <source src={videoSrc} />
            </video>
          ) : (
            <div className="h-full w-full bg-brand-blanco" aria-hidden="true" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-crema via-brand-crema/20 via-[65%] to-transparent" />
        </div>

        <div className="mx-auto -mt-[2rem] max-w-5xl px-4 text-center md:-mt-[4rem] pb-8">
          <div className="relative z-10">
            {pretitulo && (
              <span className="inline-flex rounded-full bg-[#9accea] px-[0.9rem] py-2.5 font-body text-[0.9625rem] font-medium leading-none text-brand-azul md:px-[1.3rem] md:py-3 md:text-[1.1rem]">
                {pretitulo}
              </span>
            )}
            <Heading
              as="h1"
              variant="display"
              animate={true}
              className="mx-auto mt-5 max-w-[56rem] text-[clamp(2.7rem,6.2vw,5.8rem)] font-bold leading-[0.94] tracking-[-0.06em] text-[#117fc3]"
            >
              {titulo}
            </Heading>
            {subtitulo && (
              <Text
                variant="body"
                className="mx-auto mt-5 max-w-[48rem] text-center text-[clamp(1rem,1.417vw,1.208rem)] leading-[1.28] text-[#253a44]"
              >
                {subtitulo}
              </Text>
            )}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {ctaPrimarioLabel && ctaPrimarioHref && (
                <Button
                  variant="primary"
                  size="xl"
                  href={ctaPrimarioHref}
                  iconName="ArrowRightIcon"
                  iconAnimation="slide"
                  className="rounded-full"
                >
                  {ctaPrimarioLabel}
                </Button>
              )}
              {ctaSecundarioLabel && ctaSecundarioHref && (
                <Button
                  variant="secondary"
                  size="xl"
                  href={ctaSecundarioHref}
                  iconName="ArrowRightIcon"
                  iconAnimation="slide"
                  className="rounded-full"
                >
                  {ctaSecundarioLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
