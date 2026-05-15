'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@/components/atoms/Icon'
import { StarRatingRounded } from '@/components/atoms/StarRatingRounded'
import { stripHtml } from '@/lib/utils/stripHtml'
import type { TestimonialPopupProps } from './TestimonialPopup.types'

function iniciales(nombre: string): string {
  return nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const popupVariants = {
  hidden: (origin: { x: number; y: number }) => ({
    opacity: 0,
    scale: 0,
    x: origin.x,
    y: origin.y,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 22,
      stiffness: 280,
    },
  },
  exit: (origin: { x: number; y: number }) => ({
    opacity: 0,
    scale: 0,
    x: origin.x,
    y: origin.y,
    transition: { duration: 0.25 },
  }),
}

const contentContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

const contentItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

export function TestimonialPopup({ testimonio, isOpen, onClose, origin }: TestimonialPopupProps) {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      return
    }
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const prevPaddingRight = window.getComputedStyle(document.body).paddingRight
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = prevPaddingRight
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay blur */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-brand-crema/20 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Popup container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              custom={origin}
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-[77rem] max-h-[90vh] overflow-y-auto rounded-[2rem] bg-brand-blanco shadow-2xl scrollbar-hide"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-brand-azul text-brand-blanco transition-colors duration-300 hover:bg-brand-celeste"
              >
                <Icon name="CloseIcon" size="md" color="blanco" />
              </button>

              <div className="flex flex-col md:flex-row max-h-[90vh]">
                {/* Izquierda: 60% - video o imagen fallback */}
                <div className="relative aspect-video w-full flex-shrink-0 overflow-hidden rounded-t-[2rem] bg-[#bcd8ee] md:w-[60%] md:rounded-none md:rounded-l-[2rem]">
                  {testimonio.videoUrl ? (
                    <video
                      src={testimonio.videoUrl}
                      controls
                      className="h-full w-full object-contain bg-[#bcd8ee]"
                      preload="metadata"
                    />
                  ) : testimonio.imagenDestacadaTestimonioSrc ? (
                    <Image
                      src={testimonio.imagenDestacadaTestimonioSrc}
                      alt={testimonio.imagenDestacadaTestimonioAlt ?? 'Imagen del testimonio'}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 60vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-heading text-3xl text-brand-azul/40">
                        {iniciales(testimonio.author)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Derecha: 40% - info del autor + estrellas + texto */}
                <motion.div
                  variants={contentContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex md:w-[40%] flex-col justify-center overflow-y-auto px-6 pb-8 pt-6 md:px-10 md:py-10"
                >
                  {/* Foto + nombre + rol + servicio */}
                  <motion.div variants={contentItemVariants} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-brand-celeste/20">
                      {testimonio.imageSrc ? (
                        <Image
                          src={testimonio.imageSrc}
                          alt={testimonio.imageAlt ?? testimonio.author}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-heading text-lg font-bold text-brand-azul">
                          {iniciales(testimonio.author)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-heading text-[1.35rem] font-bold text-brand-azul">
                        {testimonio.author}
                        {testimonio.role && (
                          <span className="font-body font-normal text-brand-texto/60">, {testimonio.role}</span>
                        )}
                      </p>
                      {testimonio.servicioSlug && testimonio.servicioNombre ? (
                        <Link
                          href={`/servicios/${testimonio.servicioSlug}`}
                          className="font-body text-sm text-brand-celeste underline-offset-2 hover:text-brand-azul hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {testimonio.servicioNombre}
                        </Link>
                      ) : testimonio.servicioNombre ? (
                        <p className="font-body text-sm text-brand-texto/50">{testimonio.servicioNombre}</p>
                      ) : null}
                    </div>
                  </motion.div>

                  {/* Estrellas redondeadas con animación pop-in */}
                  <motion.div variants={contentItemVariants} className="mt-4">
                    <StarRatingRounded value={testimonio.calificacion} animated staggerDelay={0.08} />
                  </motion.div>

                  {/* Texto del testimonio */}
                  <motion.div variants={contentItemVariants} className="mt-6">
                    <p className="font-body text-base leading-relaxed text-brand-texto/85">
                      &ldquo;{stripHtml(testimonio.texto)}&rdquo;
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
