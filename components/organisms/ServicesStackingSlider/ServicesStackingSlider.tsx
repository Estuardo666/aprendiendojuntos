'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Heading } from '@/components/atoms/Heading'
import { Icon } from '@/components/atoms/Icon'
import type { StackingSlide, ServicesStackingSliderProps } from './ServicesStackingSlider.types'

// ─── Subcomponente: card individual del slider ────────────────────────────────

interface SlideCardProps {
  slide: StackingSlide
  hrefBase: string
}

function SlideCard({ slide, hrefBase }: SlideCardProps) {
  const { titulo, slug, imagenSrc, imagenAlt, categoria } = slide
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
      href={`${hrefBase}/${slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-brand-crema transition-all duration-500 ease-out hover:scale-[1.025] hover:bg-white"
    >
      {/* Tooltip que sigue al cursor — outer div posiciona, inner div centra */}
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
              className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 font-body text-sm font-semibold text-brand-azul"
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

      {/* Imagen con bordes redondeados dentro del margen */}
      <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-[1.4rem]">
        {imagenSrc ? (
          <Image
            src={imagenSrc}
            alt={imagenAlt ?? titulo}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-celeste/20" />
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-2.5 p-4 pt-2">
        {/* Pill amarillo: 10% más pequeña (0.77rem), capitalizada */}
        <span
          className="self-start inline-flex rounded-full px-[0.9rem] py-[0.45rem] font-body text-[0.77rem] font-medium capitalize leading-none text-brand-azul"
          style={{ backgroundImage: 'linear-gradient(135deg, #9accea 0%, #9accea 100%)' }}
        >
          {categoria}
        </span>

        {/* Título 25% más grande: 1.2 → 1.5rem */}
        <h3 className="font-body text-[1.5rem] font-bold leading-[1.1] tracking-[-0.03em] text-brand-azul">
          {titulo}
        </h3>
      </div>
    </Link>
  )
}

// ─── Organismo principal ──────────────────────────────────────────────────────

/**
 * Slider horizontal de servicios relacionados.
 * Fondo celeste branding. Scroll nativo con snap.
 * Mobile: 1 card. Tablet: 2. Desktop: 4.
 */
export function ServicesStackingSlider({
  heading,
  slides,
  hrefBase = '/servicios',
}: ServicesStackingSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector('div')?.offsetWidth ?? 280
    scrollRef.current.scrollBy({
      left: dir === 'next' ? cardWidth + 20 : -(cardWidth + 20),
      behavior: 'smooth',
    })
  }

  return (
    <section className="bg-brand-celeste overflow-hidden px-6 py-14 md:px-16 md:py-16">
      <div className="mx-auto w-full max-w-[1260px]">

        <Heading
          as="h2"
          variant="h2"
          animate={true}
          className="mb-10 text-center text-[clamp(2.45rem,4.8vw,3em)] leading-[0.92] tracking-[-0.06em] text-white"
        >
          {heading}
        </Heading>

        {/* Contenedor con scroll horizontal — items-stretch iguala altura de todas las cards */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 overflow-x-auto px-2 py-2 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="snap-start flex-shrink-0 w-[82%] sm:w-[44%] lg:w-[calc(25%-15px)]"
            >
              <SlideCard slide={slide} hrefBase={hrefBase} />
            </div>
          ))}
        </div>

        {/* Flechas de navegación */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => scroll('prev')}
            aria-label="Anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <Icon name="ChevronRightIcon" size="sm" className="rotate-180" color="blanco" />
          </button>
          <button
            type="button"
            onClick={() => scroll('next')}
            aria-label="Siguiente"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <Icon name="ChevronRightIcon" size="sm" color="blanco" />
          </button>
        </div>

      </div>
    </section>
  )
}
