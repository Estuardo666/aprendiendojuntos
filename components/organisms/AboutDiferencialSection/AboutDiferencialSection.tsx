'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heading } from '@/components/atoms/Heading'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import type { AboutDiferencialCard, AboutDiferencialSectionProps } from './AboutDiferencialSection.types'

const cardTransition = {
  duration: 0.78,
  ease: [0.16, 1, 0.3, 1],
} as const

const layoutSpring = {
  type: 'tween',
  duration: 0.78,
  ease: [0.16, 1, 0.3, 1],
} as const

const revealTransition = {
  duration: 0.68,
  ease: [0.16, 1, 0.3, 1],
} as const

const imageZoomTransition = {
  duration: 0.86,
  ease: [0.16, 1, 0.3, 1],
} as const

interface DiferencialCardProps {
  card: AboutDiferencialCard
  isActive: boolean
  onToggle: () => void
}

function DiferencialCard({ card, isActive, onToggle }: DiferencialCardProps) {
  return (
    <motion.article
      layout
      initial={false}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onToggle()
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      animate={{
        backgroundColor: isActive ? '#ffffff' : '#0557A4',
      }}
      transition={{
        backgroundColor: cardTransition,
        layout: layoutSpring,
      }}
      className="flex w-full overflow-hidden rounded-[2rem] border border-[#d7e6f4] bg-brand-azul cursor-pointer"
    >
      <div className="flex w-full flex-col overflow-hidden">
        <motion.div
          animate={{ backgroundColor: isActive ? '#ffffff' : '#0557A4' }}
          transition={cardTransition}
          style={{ backgroundColor: isActive ? '#ffffff' : '#0557A4' }}
          className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-brand-azul"
        >
          {card.imagenSrc ? (
            <motion.div
              animate={{ scale: isActive ? 1.045 : 1 }}
              transition={imageZoomTransition}
              className="absolute inset-0"
            >
              <Image
                src={card.imagenSrc}
                alt={card.imagenAlt ?? card.titulo}
                fill
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-[#bcd8ee]" />
          )}
        </motion.div>

        <motion.div
          layout
          animate={{ backgroundColor: isActive ? '#ffffff' : '#0557A4' }}
          transition={{
            layout: layoutSpring,
            backgroundColor: cardTransition,
          }}
          className="mt-auto px-5 pb-4 pt-1"
        >
          <div className="flex min-h-[3.85rem] items-end justify-between gap-3">
            <motion.h3
              layout="position"
              animate={{ color: isActive ? '#0080C9' : '#FFFFFF' }}
              transition={{ layout: layoutSpring, color: cardTransition }}
              className="font-body text-[1.3rem] font-semibold leading-[1.1] md:text-[1.38rem]"
            >
              {card.titulo}
            </motion.h3>

            <motion.span
              animate={{ color: isActive ? '#0080C9' : '#FDD904', y: isActive ? 10 : 0, scale: isActive ? 0.96 : 1 }}
              transition={cardTransition}
              className="shrink-0"
              aria-hidden="true"
            >
              <Icon name="ArrowRightIcon" size="md" className="rotate-45" />
            </motion.span>
          </div>

          <motion.div
            layout
            initial={false}
            animate={{
              height: isActive ? 'auto' : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{
              layout: layoutSpring,
              height: revealTransition,
              opacity: revealTransition,
            }}
            style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            className="overflow-hidden pt-3"
          >
            <p className="text-process-card-paragraph text-brand-texto/80">
              {card.descripcion}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  )
}

export function AboutDiferencialSection({
  pretitulo,
  titulo,
  parrafo,
  cards,
}: AboutDiferencialSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!cards || cards.length === 0) return null

  return (
    <section className="px-5 pb-4 pt-8 md:px-8 md:pb-4 md:pt-12">
      <div className="mx-auto w-[90vw]">
        <div className="grid items-start gap-4 xl:grid-cols-5">
          <div className="xl:col-span-1">
            <span className="pretitulo">{pretitulo}</span>

            <Heading
              as="h2"
              variant="h2"
              animate={true}
              className="mt-2 max-w-full text-[clamp(2.45rem,4.8vw,3em)] font-bold leading-[0.92] text-brand-azul"
            >
              {titulo}
            </Heading>

            {parrafo && (
              <Text
                variant="body"
                className="mt-4 max-w-full text-[clamp(1.02rem,1.35vw,1.18rem)] leading-[1.24] text-brand-texto"
              >
                {parrafo}
              </Text>
            )}
          </div>

          <div className="xl:col-span-4 min-h-[600px] grid items-start gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {cards.slice(0, 4).map((card, index) => (
              <DiferencialCard
                key={card.id}
                card={card}
                isActive={openIndex === index}
                onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
