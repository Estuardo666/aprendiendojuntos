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
    <section className={cn('bg-brand-crema px-4 pb-14 pt-1 sm:px-6 lg:px-8 md:pb-16 md:pt-2', wrapperClassName)}>
      <div className="group mx-auto w-full max-w-7xl overflow-hidden rounded-[2.75rem] bg-brand-azul">
        <div className="grid h-auto min-h-[400px] items-stretch gap-0 lg:grid-cols-2">
          <div className="flex h-full flex-col items-center justify-end px-5 py-5 text-center md:px-9 md:py-7 lg:items-start lg:px-11 lg:py-9 lg:text-left">
            {pretitulo && (
              <span className="pretitulo mb-5 self-center lg:self-start">{pretitulo}</span>
            )}

            <Heading
              as="h2"
              variant="h2"
              animate={true}
              className="mx-auto max-w-[33rem] text-[clamp(2.45rem,4.8vw,3em)] leading-[0.92] text-white lg:mx-0"
            >
              {heading}
            </Heading>

            {descripcion && (
              <Text
                variant="body"
                className="mt-5 max-w-[33rem] text-[1rem] leading-[1.4] text-white md:text-[clamp(0.666rem,1.134vw,0.966rem)] md:leading-[1.22]"
              >
                {descripcion}
              </Text>
            )}

            <div className={descripcion ? 'mt-8 self-center lg:self-start' : 'mt-10 self-center lg:self-start'}>
              <Button
                variant="primary"
                size="md"
                href={ctaHref}
                iconName="ArrowRightIcon"
                iconAnimation="slide"
                fillColor="bg-brand-acua"
                hoverTextColor="text-white"
                className="rounded-full !min-h-[46px] !px-6 !py-3 font-body text-[0.98rem] font-semibold tracking-[-0.03em]"
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
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
