'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/atoms/Button'
import { HomeSectionHeader } from '@/components/organisms/HomeSectionHeader'
import { TestimonialPopup } from '@/components/molecules/TestimonialPopup'
import type { TestimonialLandingCard, TestimonialsLandingSectionProps } from './TestimonialsLandingSection.types'

function TestimonialCard({
  quote,
  author,
  role,
  rating = 5,
  imageSrc,
  imageAlt,
  onClick,
}: TestimonialLandingCard & { onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full min-h-[18rem] w-full flex-col justify-between rounded-[2rem] border border-brand-azul/10 bg-brand-blanco p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md text-left"
    >
      <div>
        <div className="mb-5 flex gap-1 text-brand-naranja" aria-label={`${rating} de 5 estrellas`}>
          {Array.from({ length: Math.max(1, Math.min(5, rating)) }).map((_, index) => (
            <span key={index} aria-hidden="true">★</span>
          ))}
        </div>
        <p className="font-body text-[1rem] leading-[1.55] text-brand-texto/85">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <div className="relative h-12 w-14 overflow-hidden rounded-xl bg-brand-celeste/20">
          {imageSrc ? (
            <Image src={imageSrc} alt={imageAlt ?? author} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-heading text-sm font-bold text-brand-azul">
              <span className="text-base">{author.slice(0, 1)}</span>
            </div>
          )}
        </div>
        <div>
          <p className="font-body text-base font-semibold text-brand-azul">{author}</p>
          <p className="font-body text-xs text-brand-texto/60">{role}</p>
        </div>
      </div>
    </button>
  )
}

export function TestimonialsLandingSection({
  pretitulo,
  titulo,
  parrafo,
  testimonios,
  botonLabel,
  botonHref,
}: TestimonialsLandingSectionProps) {
  const [selectedTestimonio, setSelectedTestimonio] = useState<TestimonialLandingCard | null>(null)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })

  if (testimonios.length === 0) return null

  return (
    <section className="bg-brand-crema px-4 pt-8 pb-16 sm:px-6 md:pt-10 md:pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <HomeSectionHeader pretitulo={pretitulo} titulo={titulo} parrafo={parrafo} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonios.slice(0, 3).map((testimonio, index) => (
            <div
              key={testimonio.id}
              className={index % 3 === 1 ? 'lg:translate-y-8' : undefined}
            >
              <TestimonialCard
                {...testimonio}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const centerX = rect.left + rect.width / 2
                  const centerY = rect.top + rect.height / 2
                  const viewportCX = window.innerWidth / 2
                  const viewportCY = window.innerHeight / 2
                  setOrigin({ x: centerX - viewportCX, y: centerY - viewportCY })
                  setSelectedTestimonio(testimonio)
                }}
              />
            </div>
          ))}
        </div>
        {botonLabel && botonHref && (
          <div className="mt-14 flex justify-center">
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
          </div>
        )}
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
