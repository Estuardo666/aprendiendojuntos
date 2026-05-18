import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import type { ServiceFeaturedCardProps } from './ServiceFeaturedCard.types'

export function ServiceFeaturedCard({
  imagenSrc,
  imagenAlt,
  pretitulo,
  titulo,
  descripcion,
  href,
}: ServiceFeaturedCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-brand-azul p-3 lg:flex-row">
      {/* Imagen: 50% en desktop, arriba en mobile */}
      <div className="relative aspect-[4/2.7] w-full overflow-hidden rounded-[1.4rem] lg:aspect-auto lg:w-1/2">
        {imagenSrc ? (
          <Image
            src={imagenSrc}
            alt={imagenAlt ?? titulo}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-brand-celeste/20" />
        )}
      </div>

      {/* Contenido: 50% en desktop */}
      <div className="flex w-full flex-col justify-center p-3 lg:w-1/2 lg:p-5">
        <span className="self-start rounded-full bg-[#9accea] px-[0.6rem] py-2 font-body text-[0.77rem] font-medium leading-none text-brand-azul">
          {pretitulo}
        </span>

        <Heading
          as="h3"
          variant="h2"
          className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[0.94] text-white font-body"
        >
          {titulo}
        </Heading>

        <Text
          variant="body"
          color="blanco"
          className="mt-4 text-[0.95rem] leading-[1.4] text-white/85"
        >
          {descripcion}
        </Text>

        <div className="mt-6">
          <Link href={href}>
            <Button
              variant="primary"
              size="md"
              iconName="ArrowRightIcon"
              iconAnimation="slide"
              fillColor="bg-brand-celeste"
              hoverTextColor="text-white"
              className="rounded-full !min-h-[42px] !px-5 !py-2.5 font-body text-[0.9rem] font-semibold"
            >
              Ver más
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
