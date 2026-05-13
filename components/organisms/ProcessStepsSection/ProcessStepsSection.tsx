'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import type { ProcessStep, ProcessStepsSectionProps } from './ProcessStepsSection.types'

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

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
  hiddenTransition: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
} as const

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const

interface ProcessCardProps {
  paso: ProcessStep
  isActive: boolean
  ctaLabel?: string
  ctaHref?: string
  interactionMode: 'hover' | 'toggle'
  onHoverStart?: () => void
  onHoverEnd?: () => void
  onToggle?: () => void
}

function ProcessCard({
  paso,
  isActive,
  ctaLabel,
  ctaHref,
  interactionMode,
  onHoverStart,
  onHoverEnd,
  onToggle,
}: ProcessCardProps) {
  const isHoverMode = interactionMode === 'hover'
  const showExpandedContent = isActive

  return (
    <motion.article
      layout
      initial={false}
      onHoverStart={isHoverMode ? onHoverStart : undefined}
      onHoverEnd={isHoverMode ? onHoverEnd : undefined}
      onFocusCapture={isHoverMode ? onHoverStart : undefined}
      onBlurCapture={isHoverMode ? onHoverEnd : undefined}
      onClick={interactionMode === 'toggle' ? onToggle : undefined}
      onKeyDown={interactionMode === 'toggle'
        ? (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onToggle?.()
            }
          }
        : undefined}
      role={interactionMode === 'toggle' ? 'button' : undefined}
      tabIndex={interactionMode === 'toggle' ? 0 : undefined}
      aria-expanded={interactionMode === 'toggle' ? isActive : undefined}
      animate={{
        backgroundColor: showExpandedContent ? '#ffffff' : '#0557A4',
        y: isActive ? -6 : 0,
      }}
      transition={{
        backgroundColor: cardTransition,
        layout: layoutSpring,
        y: cardTransition,
      }}
      className="flex w-full max-w-[20rem] overflow-hidden rounded-[2rem] border border-[#d7e6f4] bg-brand-azul cursor-pointer"
    >
      <div className="flex w-full flex-col overflow-hidden">
        <motion.div
          animate={{ backgroundColor: showExpandedContent ? '#ffffff' : '#0557A4' }}
          transition={cardTransition}
          style={{ backgroundColor: showExpandedContent ? '#ffffff' : '#0557A4' }}
          className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-brand-azul"
        >
          {paso.imagenSrc ? (
            <motion.div
              animate={{ scale: isActive ? 1.045 : 1 }}
              transition={imageZoomTransition}
              className="absolute inset-0"
            >
              <Image
                src={paso.imagenSrc}
                alt={paso.imagenAlt ?? paso.titulo}
                fill
                className="object-cover"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-celeste via-[#dff1ff] to-[#f6efe3]" />
          )}
        </motion.div>

        <motion.div
          layout
          animate={{ backgroundColor: showExpandedContent ? '#ffffff' : '#0557A4' }}
          transition={{
            layout: layoutSpring,
            backgroundColor: cardTransition,
          }}
          className="mt-auto px-5 pb-4 pt-1"
        >
          <div className="flex min-h-[3.85rem] items-end justify-between gap-3">
            <motion.h3
              layout="position"
              animate={{ color: showExpandedContent ? '#0080C9' : '#FFFFFF' }}
              transition={{ layout: layoutSpring, color: cardTransition }}
              className="max-w-[10.6rem] overflow-hidden font-body text-[1.3rem] font-semibold leading-[0.95] tracking-[-0.05em] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:text-[1.38rem]"
            >
              {paso.titulo}
            </motion.h3>

            <motion.span
              animate={{ opacity: showExpandedContent ? 0 : 1, y: showExpandedContent ? 10 : 0, scale: showExpandedContent ? 0.96 : 1 }}
              transition={cardTransition}
              className="shrink-0 font-body text-[3.2rem] font-bold leading-none tracking-[-0.08em] text-white/95"
            >
              {paso.numero}
            </motion.span>
          </div>

          <motion.div
            layout
            initial={false}
            animate={{
              height: showExpandedContent ? 'auto' : 0,
              opacity: showExpandedContent ? 1 : 0,
            }}
            transition={{
              layout: layoutSpring,
              height: revealTransition,
              opacity: revealTransition,
            }}
            style={{ pointerEvents: showExpandedContent ? 'auto' : 'none' }}
            className="overflow-hidden"
          >
            <motion.div
              variants={staggerContainer}
              initial={false}
              animate={showExpandedContent ? 'visible' : 'hidden'}
              className="pt-3"
            >
              <motion.p
                variants={staggerItem}
                className="text-process-card-paragraph text-brand-texto/80"
              >
                {paso.descripcion}
              </motion.p>

              <motion.div variants={staggerItem} className="mt-4 w-full">
                <Button
                  variant="primary"
                  size="md"
                  iconName="ArrowRightIcon"
                  iconAnimation="slide"
                  href={ctaHref ?? '#'}
                  className="w-full justify-center rounded-full !min-h-[46px] !px-6 !py-3 font-body text-[0.98rem] font-semibold tracking-[-0.03em]"
                >
                  {ctaLabel ?? 'Agendar cita'}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  )
}

/**
 * Sección de proceso de trabajo.
 * Desktop: cards bottom-aligned que crecen en altura con hover.
 * Mobile/tablet: cards expandidas en grid para mantener legibilidad sin hover.
 */
export function ProcessStepsSection({ pretitulo, heading, ctaLabel, ctaHref, pasos }: ProcessStepsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const hoverCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (hoverCloseTimeoutRef.current) {
        clearTimeout(hoverCloseTimeoutRef.current)
      }
    }
  }, [])

  const handleHoverStart = (index: number) => {
    if (hoverCloseTimeoutRef.current) {
      clearTimeout(hoverCloseTimeoutRef.current)
      hoverCloseTimeoutRef.current = null
    }
    setHoveredIndex(index)
  }

  const handleHoverEnd = () => {
    if (hoverCloseTimeoutRef.current) {
      clearTimeout(hoverCloseTimeoutRef.current)
    }

    hoverCloseTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null)
      hoverCloseTimeoutRef.current = null
    }, 1000)
  }

  return (
    <section className="bg-brand-crema pb-0 pt-14 md:pt-16">
      <div className="mx-auto w-[95vw] max-w-[1540px]">
        <div className="text-center">
          {pretitulo && (
            <span className="pretitulo">{pretitulo}</span>
          )}
          <Heading
            as="h2"
            variant="h2"
            animate={true}
            className="mx-auto mt-4 max-w-[36rem] text-[clamp(2.45rem,4.8vw,3em)] leading-[0.92] tracking-[-0.06em] text-brand-azul"
          >
            {heading}
          </Heading>
        </div>

        <div className="mt-11 hidden min-h-[37rem] flex-wrap items-start justify-center gap-5 xl:flex">
          {pasos.map((paso, index) => (
            <ProcessCard
              key={`${paso.numero}-${paso.titulo}`}
              paso={paso}
              isActive={hoveredIndex === index}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              interactionMode="hover"
              onHoverStart={() => handleHoverStart(index)}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </div>

        <div className="mt-11 hidden min-h-[84rem] flex-wrap items-start justify-center gap-5 md:flex xl:hidden">
          {pasos.map((paso, index) => (
            <ProcessCard
              key={`${paso.numero}-${paso.titulo}-tablet`}
              paso={paso}
              isActive={expandedIndex === index}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              interactionMode="toggle"
              onToggle={() => setExpandedIndex((current) => current === index ? null : index)}
            />
          ))}
        </div>

        <div className="mt-10 grid min-h-[104rem] justify-items-center gap-4 md:hidden">
          {pasos.map((paso, index) => (
            <ProcessCard
              key={`${paso.numero}-${paso.titulo}-mobile`}
              paso={paso}
              isActive={expandedIndex === index}
              ctaLabel={ctaLabel}
              ctaHref={ctaHref}
              interactionMode="toggle"
              onToggle={() => setExpandedIndex((current) => current === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
