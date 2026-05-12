'use client'

import { useState } from 'react'
import { ProgramFeaturedSlide } from '@/components/molecules/ProgramFeaturedSlide'
import { Icon } from '@/components/atoms/Icon'
import type { ProgramFeaturedSliderProps } from './ProgramFeaturedSlider.types'

export function ProgramFeaturedSlider({
  slides,
}: ProgramFeaturedSliderProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => {
    setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1))
  }

  const next = () => {
    setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))
  }

  if (slides.length === 0) return null

  return (
    <section className="px-4 pb-8 pt-4 md:px-6 md:pb-10 md:pt-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[1.75rem]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`col-start-1 row-start-1 transition-opacity duration-500 ease-out ${
                index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <ProgramFeaturedSlide {...slide} />
            </div>
          ))}
        </div>

        {/* Controles */}
        {slides.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-azul/20 text-brand-azul transition-colors hover:bg-brand-azul/5"
            >
              <Icon name="ChevronRightIcon" size="sm" className="rotate-180" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir a slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === current ? 'bg-brand-azul' : 'bg-brand-azul/25'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Siguiente"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-azul/20 text-brand-azul transition-colors hover:bg-brand-azul/5"
            >
              <Icon name="ChevronRightIcon" size="sm" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
