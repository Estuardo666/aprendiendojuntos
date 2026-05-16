'use client'

import { useRef } from 'react'
import { HomeProgramCard } from '@/components/molecules/HomeProgramCard'
import { Icon } from '@/components/atoms/Icon'
import type { HomeProgramsCarouselProps } from './HomeProgramsCarousel.types'

export function HomeProgramsCarousel({
  programas,
}: HomeProgramsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (programas.length === 0) return null

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return
    const card = scrollRef.current.querySelector('[data-slide]') as HTMLElement | null
    const cardWidth = card?.offsetWidth ?? 320
    const gap = 20
    scrollRef.current.scrollBy({
      left: dir === 'next' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    })
  }

  return (
    <section className="bg-brand-crema overflow-hidden px-4 py-6 md:px-6 md:py-8 lg:px-8">
      <div className="relative mx-auto w-full max-w-7xl">
        {/* Flechas desktop: extremos laterales, color celeste */}
        <button
          type="button"
          onClick={() => scroll('prev')}
          aria-label="Anterior"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 h-9 w-9 items-center justify-center rounded-full bg-brand-celeste text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-brand-naranja active:scale-95"
        >
          <Icon name="ChevronRightIcon" size="md" className="rotate-180" color="blanco" />
        </button>
        <button
          type="button"
          onClick={() => scroll('next')}
          aria-label="Siguiente"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 h-9 w-9 items-center justify-center rounded-full bg-brand-celeste text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-brand-naranja active:scale-95"
        >
          <Icon name="ChevronRightIcon" size="md" color="blanco" />
        </button>

        {/* Carrusel scroll snap */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 overflow-x-auto px-2 py-2 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {programas.map((programa, i) => (
            <div
              key={i}
              data-slide
              className="snap-start flex-shrink-0 w-[82%] sm:w-[44%] lg:w-[calc(33.333%-14px)]"
            >
              <HomeProgramCard {...programa} />
            </div>
          ))}
        </div>

        {/* Flechas mobile: centradas debajo */}
        <div className="mt-3 flex justify-center gap-3 md:hidden">
          <button
            type="button"
            onClick={() => scroll('prev')}
            aria-label="Anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-celeste text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-brand-naranja active:scale-95"
          >
            <Icon name="ChevronRightIcon" size="sm" className="rotate-180" color="blanco" />
          </button>
          <button
            type="button"
            onClick={() => scroll('next')}
            aria-label="Siguiente"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-celeste text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-brand-naranja active:scale-95"
          >
            <Icon name="ChevronRightIcon" size="sm" color="blanco" />
          </button>
        </div>
      </div>
    </section>
  )
}
