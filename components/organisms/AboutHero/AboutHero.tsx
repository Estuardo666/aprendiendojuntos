import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import type { AboutHeroProps } from './AboutHero.types'

export function AboutHero({
  pretitulo,
  titulo,
  descripcion,
  videoSrc,
}: AboutHeroProps) {
  return (
    <section className="pb-14 pt-14 md:pb-20 md:pt-20">
      <div className="mx-auto w-[90vw] max-w-[1728px]">
        <div className="relative -mt-[3.25vh] h-[65vh] min-h-[360px] overflow-hidden rounded-[2rem] md:rounded-[2.75rem]">
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
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : (
            <div className="h-full w-full bg-brand-blanco" aria-hidden="true" />
          )}

          <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-brand-crema via-brand-crema/78 to-transparent" />
        </div>

        <div className="mx-auto -mt-[6.24rem] max-w-4xl px-4 text-center md:-mt-[7.36rem]">
          <div className="relative z-10">
            <span className="inline-flex rounded-full bg-[#9accea] px-[0.6rem] py-2.5 font-body text-[0.9625rem] font-medium leading-none text-brand-azul md:px-[1.3rem] md:py-3 md:text-[1.1rem]">
              {pretitulo}
            </span>

            <Heading
              as="h1"
              variant="display"
              animate={true}
              className="mx-auto mt-5 text-[clamp(2.7rem,6.2vw,5.8rem)] font-bold leading-[0.94] text-[#117fc3]"
            >
              {titulo}
            </Heading>

            {descripcion && (
              <Text
                variant="body"
                className="mx-auto mt-5 max-w-[48rem] text-center text-[clamp(0.833rem,1.417vw,1.208rem)] leading-[1.22] text-[#253a44]"
              >
                {descripcion}
              </Text>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
