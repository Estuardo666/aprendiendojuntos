'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
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
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 400, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2.25rem] bg-brand-celeste p-3 transition-all duration-500 ease-out hover:bg-brand-azul hover:scale-[1.025]"
    >
      {/* Tooltip que sigue al cursor */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-20"
        style={{ x: springX, y: springY }}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-5 py-2.5 font-body text-base font-semibold text-white"
              style={{
                backgroundColor: 'rgba(154, 204, 234, 0.5)',
                backdropFilter: 'blur(10px)',
              }}
            >
              Ver más
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Imagen arriba */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.85rem]">
        {imagenSrc ? (
          <Image
            src={imagenSrc}
            alt={imagenAlt ?? titulo}
            fill
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
