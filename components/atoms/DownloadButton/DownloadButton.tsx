'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Icon } from '@/components/atoms/Icon'
import { cn } from '@/lib/utils/cn'

interface DownloadButtonProps {
  href: string
  fileName: string
  fileSize?: string
  className?: string
}

function extractFileName(path: string): string {
  return path.split('/').pop() ?? path
}

const slideFillTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.95,
} as const

const slideElementTransition = {
  type: 'spring',
  stiffness: 340,
  damping: 26,
  mass: 0.9,
} as const

const slideFadeInTransition = {
  duration: 0.78,
  delay: 0.06,
  ease: [0.22, 1, 0.36, 1],
} as const

const slideFadeOutTransition = {
  duration: 0.32,
  ease: [0.4, 0, 0.2, 1],
} as const

export function DownloadButton({
  href,
  fileName,
  fileSize,
  className,
}: DownloadButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cleanName = extractFileName(fileName)

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={cn(
        'group inline-flex items-center justify-center gap-3',
        'rounded-full overflow-hidden relative isolate',
        'min-h-[64px] px-8 py-4',
        'bg-brand-naranja text-brand-azul',
        'font-body font-semibold tracking-[-0.02em]',
        'transition-[background-color,transform,box-shadow,opacity] duration-300 cursor-pointer',
        'hover:scale-[1.02]',
        className,
      )}
    >
      {/* Fondo animado en hover */}
      <motion.span
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={isHovered ? slideFadeInTransition : slideFadeOutTransition}
        className="absolute inset-0 z-0 rounded-full bg-brand-azul"
      />

      <motion.span
        initial={false}
        animate={
          isHovered
            ? { width: '108%', height: 152, bottom: -54 }
            : { width: 8, height: 8, bottom: -8 }
        }
        transition={slideFillTransition}
        className="absolute bottom-[-8px] left-1/2 z-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-azul"
      />

      {/* Contenido centrado */}
      <span className="relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={false}
          animate={{ x: isHovered ? -4 : 0 }}
          transition={slideElementTransition}
          className={cn(
            'text-[1.15rem] font-semibold leading-tight transition-colors duration-200',
            isHovered ? 'text-white' : 'text-brand-azul',
          )}
        >
          Descargar artículo
        </motion.span>
        <span
          className={cn(
            'text-[0.75rem] font-normal leading-tight mt-0.5 transition-colors duration-200',
            isHovered ? 'text-white/80' : 'text-brand-azul/60',
          )}
        >
          {cleanName}
          {fileSize && ` | ${fileSize}`}
        </span>
      </span>

      {/* Flecha sin círculo */}
      <motion.span
        initial={false}
        animate={
          isHovered
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: 18, scale: 0.92 }
        }
        transition={slideElementTransition}
        className={cn(
          'relative z-10 flex items-center justify-center',
          'transition-colors duration-200',
          isHovered ? 'text-white' : 'text-brand-azul',
        )}
        aria-hidden="true"
      >
        <Icon
          name="ArrowRightIcon"
          size="sm"
          className="h-5 w-5 [&_path]:stroke-[2.5] [&_svg]:block [&_svg]:h-5 [&_svg]:w-5"
        />
      </motion.span>
    </Link>
  )
}
