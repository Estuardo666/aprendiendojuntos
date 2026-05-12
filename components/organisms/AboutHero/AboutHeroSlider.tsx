'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import type { WPImagenItem } from '@/lib/types/nosotros.types'

interface AboutHeroSliderProps {
  imagenes: WPImagenItem[]
  fallbackSrc?: string
  fallbackAlt?: string
  intervalMs?: number
}

export function AboutHeroSlider({
  imagenes,
  fallbackSrc,
  fallbackAlt = 'Imagen de apoyo',
  intervalMs = 4600,
}: AboutHeroSliderProps) {
  const slides = useMemo(() => {
    const cmsSlides = imagenes
      .map((item) => item.imagen)
      .filter((img): img is NonNullable<typeof img> => Boolean(img?.sourceUrl))

    if (cmsSlides.length > 0) return cmsSlides

    if (fallbackSrc) {
      return [{ sourceUrl: fallbackSrc, altText: fallbackAlt }]
    }

    return []
  }, [fallbackAlt, fallbackSrc, imagenes])

  const [activeIndex, setActiveIndex] = useState(0)

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length)
  }

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
  }

  useEffect(() => {
    if (slides.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [intervalMs, slides.length])

  if (slides.length === 0) {
    return (
      <div className="h-[50vh] min-h-[280px] rounded-[2rem] bg-brand-azul/10" aria-hidden="true" />
    )
  }

  return (
    <div className="relative h-[50vh] min-h-[280px] overflow-hidden rounded-[2rem]">
      {/* Slides apilados con fade */}
      {slides.map((slide, index) => (
        <div
          key={`${slide.sourceUrl}-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
            index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.sourceUrl}
            alt={slide.altText || `Slide ${index + 1}`}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className={`object-cover object-center transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] ${
              index === activeIndex ? 'scale-[1.06] translate-x-0' : 'scale-[1.02] -translate-x-2'
            }`}
            priority={index === 0}
          />
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#efede4]/92 text-2xl font-bold text-brand-azul shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-transform duration-300 hover:scale-105"
            aria-label="Imagen anterior"
          >
            &#8249;
          </button>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#efede4]/92 text-2xl font-bold text-brand-azul shadow-[0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-transform duration-300 hover:scale-105"
            aria-label="Imagen siguiente"
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  )
}
