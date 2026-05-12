'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { ProgramaHeroImagen } from './ProgramaHero.types'

interface ProgramaHeroSliderProps {
  imagenes: ProgramaHeroImagen[]
  intervalMs?: number
}

export function ProgramaHeroSlider({
  imagenes,
  intervalMs = 4600,
}: ProgramaHeroSliderProps) {
  const slides = imagenes.filter((img) => Boolean(img?.sourceUrl))
  const [activeIndex, setActiveIndex] = useState(0)

  const goNext = () => setActiveIndex((c) => (c + 1) % slides.length)
  const goPrev = () => setActiveIndex((c) => (c - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = window.setInterval(() => {
      setActiveIndex((c) => (c + 1) % slides.length)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [intervalMs, slides.length])

  if (slides.length === 0) {
    return <div className="h-[50vh] min-h-[320px] rounded-[2rem] bg-brand-azul/10" aria-hidden="true" />
  }

  return (
    <div className="relative h-[50vh] min-h-[320px] overflow-hidden rounded-[2rem]">
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
            sizes="90vw"
            className={`object-cover object-center transition-transform duration-[1400ms] [transition-timing-function:cubic-bezier(0.2,0.7,0.2,1)] ${
              index === activeIndex
                ? 'scale-[1.06] translate-x-0'
                : 'scale-[1.02] -translate-x-2'
            }`}
            priority={index === 0}
          />
        </div>
      ))}

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/40"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition hover:bg-white/40"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}
