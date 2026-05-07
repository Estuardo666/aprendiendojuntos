import Image from 'next/image'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { cn } from '@/lib/utils/cn'
import type { ServiceCTASectionProps } from './ServiceCTASection.types'

/**
 * Sección CTA principal del servicio.
 * Bloque azul centrado (max 1360px) con layout 50/50: texto + botón a la izquierda e imagen a la derecha.
 * Mobile: columna única, imagen debajo.
 */
export function ServiceCTASection({
  pretitulo,
  heading,
  descripcion,
  ctaLabel,
  ctaHref,
  imagenSrc,
  imagenAlt,
  wrapperClassName,
}: ServiceCTASectionProps) {
  return (
    <section className={cn('bg-brand-crema px-6 pb-14 pt-1 md:px-16 md:pb-16 md:pt-2', wrapperClassName)}>
      <div className="group mx-auto w-full max-w-[1260px] overflow-hidden rounded-[2.75rem] bg-brand-azul">
        <div className="grid h-[400px] items-stretch gap-0 lg:grid-cols-2">
          <div className="flex h-full flex-col justify-end px-5 py-5 md:px-9 md:py-7 lg:px-11 lg:py-9">
            {pretitulo && (
              <span className="pretitulo mb-5 self-start">{pretitulo}</span>
            )}

            <Heading
              as="h2"
              variant="h2"
              animate={true}
              className="max-w-[33rem] text-[clamp(2.45rem,4.8vw,3em)] leading-[0.92] text-white"
            >
              {heading}
            </Heading>

            {descripcion && (
              <Text
                variant="body"
                className="mt-5 max-w-[33rem] text-[clamp(0.666rem,1.134vw,0.966rem)] leading-[1.22] text-white"
              >
                {descripcion}
              </Text>
            )}

            <div className={descripcion ? 'mt-8' : 'mt-10'}>
              <Button
                variant="primary"
                size="md"
                href={ctaHref}
                iconName="ArrowRightIcon"
                iconAnimation="slide"
                fillColor="bg-brand-acua"
                hoverTextColor="text-white"
                className="rounded-full"
              >
                {ctaLabel}
              </Button>
            </div>
          </div>

          {imagenSrc && (
            <div className="relative min-h-[240px] overflow-hidden rounded-[2.75rem] md:min-h-[306px] lg:min-h-full">
              <Image
                src={imagenSrc}
                alt={imagenAlt ?? ''}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
