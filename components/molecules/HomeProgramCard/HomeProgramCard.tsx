'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import type { HomeProgramCardProps } from './HomeProgramCard.types'

export function HomeProgramCard({
  imagenSrc,
  imagenAlt,
  pretitulo,
  titulo,
  descripcion,
  href,
}: HomeProgramCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2.25rem] bg-brand-celeste p-3 transition-all duration-500 ease-out hover:bg-brand-azul hover:scale-[1.025]"
    >
      {/* Tooltip simple sin Framer Motion */}
      {isHovered && (
        <span className="pointer-events-none absolute right-3 top-3 z-20 whitespace-nowrap rounded-full px-4 py-1.5 font-body text-sm font-semibold text-white bg-brand-azul/60 backdrop-blur-sm">
          Ver más
        </span>
      )}

      {/* Imagen arriba */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.85rem]">
        {imagenSrc ? (
          <Image
            src={imagenSrc}
            alt={imagenAlt ?? titulo}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 44vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-brand-azul/20" />
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
          className="mt-3 text-[1.75rem] font-bold leading-[1.05] text-white font-body"
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
      </div>
    </Link>
  )
}
