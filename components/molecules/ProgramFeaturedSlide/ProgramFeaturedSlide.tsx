import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import type { ProgramFeaturedSlideProps } from './ProgramFeaturedSlide.types'

export function ProgramFeaturedSlide({
  imagenSrc,
  imagenAlt,
  pretitulo,
  titulo,
  descripcion,
  href,
}: ProgramFeaturedSlideProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-brand-azul p-3 lg:flex-row">
      {/* Imagen: 66% */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.4rem] lg:aspect-auto lg:w-2/3 lg:min-h-[480px]">
        {imagenSrc ? (
          <Image
            src={imagenSrc}
            alt={imagenAlt ?? titulo}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-brand-celeste/20" />
        )}
      </div>

      {/* Contenido: 33% */}
      <div className="flex w-full flex-col justify-center p-3 lg:w-1/3 lg:p-5">
        <span className="self-start rounded-full bg-[#9accea] px-[0.6rem] py-2 font-body text-[0.77rem] font-medium leading-none text-brand-azul">
          {pretitulo}
        </span>

        <Heading
          as="h3"
          variant="h2"
          className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[0.94] text-white font-body"
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
