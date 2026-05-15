'use client'

import { useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { TestimonialPopup } from '@/components/molecules/TestimonialPopup'
import type { HomeTestimonialsSectionProps } from './HomeTestimonialsSection.types'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
}

export function HomeTestimonialsSection({
  pretitulo,
  titulo,
  testimonios,
}: HomeTestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedTestimonio, setSelectedTestimonio] = useState<(typeof testimonios)[number] | null>(null)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLSpanElement>(null)

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonios.length)
  }, [testimonios.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonios.length) % testimonios.length)
  }, [testimonios.length])

  if (testimonios.length === 0) return null

  const current = testimonios[currentIndex]

  return (
    <section className="bg-brand-crema px-4 pt-8 pb-10 sm:px-6 md:pt-10 md:pb-14 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 rounded-[2.5rem] bg-brand-blanco p-6 md:flex-row md:gap-16 md:p-10 lg:p-14 min-h-[400px]">
        {/* Columna izquierda: header + controles */}
        <div className="flex flex-col justify-between md:w-[42%]">
          <div>
            {pretitulo && (
              <span className="inline-flex rounded-full bg-[#9accea] px-3 py-2 font-body text-[0.77rem] font-medium leading-none text-brand-azul md:px-4 md:text-[0.95rem]">
                {pretitulo}
              </span>
            )}
            <h2 className="mt-4 font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-brand-azul">
              {titulo}
            </h2>
          </div>

          {/* Flechas de navegación */}
          <div className="mt-10 flex gap-3">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Anterior testimonio"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-celeste text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-brand-azul active:scale-95"
            >
              <Icon name="ChevronRightIcon" size="sm" className="rotate-180" color="blanco" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Siguiente testimonio"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-celeste text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-brand-azul active:scale-95"
            >
              <Icon name="ChevronRightIcon" size="sm" color="blanco" />
            </button>
          </div>
        </div>

        {/* Columna derecha: carrusel */}
        <div className="relative md:w-[58%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col"
            >
              {/* Comillas decorativas */}
              <motion.div variants={itemVariants} className="mb-2 text-[3.5rem] leading-none text-brand-celeste/60">
                <Icon name="QuoteIcon" size="lg" className="h-10 w-10 md:h-12 md:w-12" color="celeste" />
              </motion.div>

              {/* Título corto */}
              <motion.h3
                variants={itemVariants}
                className="font-heading text-[clamp(1.68rem,2.88vw,2.1rem)] font-bold leading-[1.15] tracking-[-0.02em] text-brand-celeste"
              >
                {current.tituloCorto}
              </motion.h3>

              {/* Descripción corta */}
              <motion.p
                variants={itemVariants}
                className="mt-4 max-w-[60%] font-body text-[1rem] leading-[1.6] text-brand-texto/80"
              >
                {current.descripcionCorta}
              </motion.p>

              {/* Autor + servicio + botón */}
              <motion.div
                variants={itemVariants}
                className="mt-24 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-16 overflow-hidden rounded-xl bg-brand-celeste/20">
                    {current.imageSrc ? (
                      <Image
                        src={current.imageSrc}
                        alt={current.imageAlt ?? current.author}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-heading text-sm font-bold text-brand-azul">
                        <span className="text-base">{current.author.slice(0, 1)}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-body text-base font-semibold text-brand-azul">
                      {current.author}
                      {current.role && (
                        <span className="font-normal text-brand-texto/60">, {current.role}</span>
                      )}
                    </p>
                    {current.servicioSlug && current.servicioNombre ? (
                      <Link
                        href={`/servicios/${current.servicioSlug}`}
                        className="font-body text-sm text-brand-celeste underline-offset-2 hover:text-brand-azul hover:underline"
                      >
                        {current.servicioNombre}
                      </Link>
                    ) : current.servicioNombre ? (
                      <p className="font-body text-sm text-brand-texto/50">{current.servicioNombre}</p>
                    ) : null}
                  </div>
                </div>

                <span ref={buttonRef}>
                  <Button
                    variant="primary"
                    size="md"
                    iconName="ArrowRightIcon"
                    iconAnimation="slide"
                    className="self-start rounded-full sm:self-auto"
                    onClick={() => {
                      const rect = buttonRef.current?.getBoundingClientRect()
                      if (rect) {
                        const centerX = rect.left + rect.width / 2
                        const centerY = rect.top + rect.height / 2
                        const viewportCX = window.innerWidth / 2
                        const viewportCY = window.innerHeight / 2
                        setOrigin({ x: centerX - viewportCX, y: centerY - viewportCY })
                      }
                      setSelectedTestimonio(current)
                    }}
                  >
                    Leer más
                  </Button>
                </span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <TestimonialPopup
        testimonio={selectedTestimonio ?? {
          id: '',
          author: '',
          role: '',
          texto: '',
          calificacion: 0,
        }}
        isOpen={!!selectedTestimonio}
        onClose={() => setSelectedTestimonio(null)}
        origin={origin}
      />
    </section>
  )
}
