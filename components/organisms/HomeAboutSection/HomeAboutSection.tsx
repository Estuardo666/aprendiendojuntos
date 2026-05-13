import Image from 'next/image'
import { Heading } from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import type { HomeAboutSectionProps } from './HomeAboutSection.types'

export function HomeAboutSection({
  imagenSrc,
  imagenAlt,
  pretitulo,
  titulo,
  descripcion,
  botonLabel,
  botonHref,
}: HomeAboutSectionProps) {
  return (
    <section className="bg-brand-crema px-4 py-10 md:px-6 md:py-14 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 md:flex-row md:gap-14 lg:gap-20">
        {/* Imagen izquierda */}
        <div className="relative w-full flex-shrink-0 overflow-hidden rounded-[2.5rem] md:w-[45%]">
          {imagenSrc ? (
            <Image
              src={imagenSrc}
              alt={imagenAlt ?? titulo}
              width={600}
              height={700}
              className="h-auto w-full object-cover"
              priority
            />
          ) : (
            <div className="aspect-[4/5] w-full rounded-[2.5rem] bg-brand-celeste/20" />
          )}
        </div>

        {/* Contenido derecha */}
        <div className="flex w-full flex-col md:w-[55%]">
          {pretitulo && (
            <span className="self-start inline-flex rounded-full bg-[#9accea] px-2.5 py-2 font-body text-[0.95rem] font-medium leading-none text-brand-azul md:px-4">
              {pretitulo}
            </span>
          )}

          <Heading
            as="h2"
            variant="h2"
            animate={true}
            className="mt-4 text-[clamp(2.2rem,4.2vw,2.8rem)] leading-[0.95] tracking-[-0.05em] text-brand-azul"
          >
            {titulo}
          </Heading>

          {descripcion && (
            <div
              className="mt-6 font-body text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.45] text-brand-texto/90"
              dangerouslySetInnerHTML={{ __html: descripcion }}
            />
          )}

          {botonLabel && botonHref && (
            <div className="mt-8">
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
        </div>
      </div>
    </section>
  )
}
