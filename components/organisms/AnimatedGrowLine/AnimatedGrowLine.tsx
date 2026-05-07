'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import type { AnimatedGrowLineProps } from './AnimatedGrowLine.types'

export function AnimatedGrowLine({
  imageSrc = '/lineagrow.svg',
  imageWidth = 2109,
  imageHeight = 347,
  widthClassName = 'w-[102vw]',
  yOffsetClassName = '-translate-y-[32%]',
  delay = 0.5,
  duration = 1.85,
  className,
}: AnimatedGrowLineProps) {
  const lineRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(lineRef, { once: true, amount: 0.25 })

  return (
    <div
      ref={lineRef}
      className={cn(
        'pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 select-none',
        widthClassName,
        yOffsetClassName,
        className,
      )}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isInView ? '100%' : 0 }}
        transition={{
          delay,
          duration,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="overflow-hidden"
      >
        <Image
          src={imageSrc}
          alt=""
          aria-hidden="true"
          width={imageWidth}
          height={imageHeight}
          className={cn('h-auto max-w-none', widthClassName)}
        />
      </motion.div>
    </div>
  )
}