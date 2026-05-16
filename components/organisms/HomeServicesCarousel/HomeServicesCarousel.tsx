'use client'

import { useRef } from 'react'
import { ServiceFeaturedCard } from '@/components/molecules/ServiceFeaturedCard'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import type { HomeServicesCarouselProps } from './HomeServicesCarousel.types'

export function HomeServicesCarousel({
  servicios,
  botonLabel,
  botonHref,
}: HomeServicesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

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
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-9 w-9 items-center justify-center rounded-full bg-brand-celeste text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-brand-naranja active:scale-95"
        >
          <Icon name="ChevronRightIcon" size="md" className="rotate-180" color="blanco" />
        </button>
        <button
          type="button"
          onClick={() => scroll('next')}
          aria-label="Siguiente"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-9 w-9 items-center justify-center rounded-full bg-brand-celeste text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-brand-naranja active:scale-95"
        >
          <Icon name="ChevronRightIcon" size="md" color="blanco" />
        </button>

        {/* Carrusel scroll snap */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-5 overflow-x-auto px-2 py-2 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {servicios.map((servicio, i) => (
            <div
              key={i}
              data-slide
              className="snap-start flex-shrink-0 w-[85%] sm:w-[calc(50%-10px)]"
            >
              <ServiceFeaturedCard {...servicio} />
            </div>
          ))}

          {/* Card celeste final con CTA */}
          <div className="snap-start flex-shrink-0 w-[85%] sm:w-[calc(50%-10px)]">
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-6 rounded-[1.75rem] bg-brand-celeste p-8 text-center">
              <p className="font-body text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
                Descubre todas nuestras soluciones
              </p>
              {botonLabel && botonHref && (
                <Button
                  variant="primary"
                  size="md"
                  href={botonHref}
                  iconName="ArrowRightIcon"
                  iconAnimation="slide"
                  className="rounded-full"
                >
                  {botonLabel}
                </Button>
              )}
            </div>
          </div>
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
