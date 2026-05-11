import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import type { ProgramListCardProps } from './ProgramListCard.types'

export function ProgramListCard({
  imagenSrc,
  imagenAlt,
  pretitulo,
  titulo,
  descripcion,
  href,
}: ProgramListCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-brand-azul p-3">
      {/* Imagen arriba */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.4rem]">
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

      {/* Contenido abajo */}
      <div className="flex flex-1 flex-col p-3">
        <span className="self-start rounded-full bg-[#9accea] px-[0.6rem] py-2 font-body text-[0.77rem] font-medium leading-none text-brand-azul">
          {pretitulo}
        </span>

        <Heading
          as="h3"
          variant="h3"
          className="mt-3 text-[1.55rem] font-bold leading-[1.05] text-white font-body"
        >
          {titulo}
        </Heading>

        <Text
          variant="small"
          color="blanco"
          className="mt-3 flex-1 text-white/80"
        >
          {descripcion}
        </Text>

        <div className="mt-5">
          <Link href={href}>
            <Button
              variant="primary"
              size="sm"
              iconName="ArrowRightIcon"
              iconAnimation="slide"
              fillColor="bg-brand-celeste"
              hoverTextColor="text-white"
              className="rounded-full !min-h-[38px] !px-4 !py-2 font-body text-[0.85rem] font-semibold"
            >
              Ver más
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
