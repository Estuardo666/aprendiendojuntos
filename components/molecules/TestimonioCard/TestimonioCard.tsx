'use client'

import Image from 'next/image'
import { Button } from '@/components/atoms/Button'
import type { TestimonioCardProps } from './TestimonioCard.types'

function iniciales(nombre: string): string {
  return nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function TestimonioCard({
  quote,
  author,
  role,
  imageSrc,
  imageAlt,
  servicioNombre,
  onClick,
}: TestimonioCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-full flex-col items-start rounded-[2rem] border border-brand-azul/10 bg-brand-blanco p-6 text-left shadow-sm transition-all duration-500 ease-out hover:scale-[1.025] hover:shadow-md"
    >
      {/* Comillas + texto */}
      <div className="flex-1">
        <p className="font-body text-[1rem] font-semibold leading-[1.55] text-brand-texto/85">
          <span className="font-heading text-[1.75rem] leading-none text-brand-celeste" aria-hidden="true">&ldquo;</span>
          {quote}
          <span className="font-heading text-[1.75rem] leading-none text-brand-celeste" aria-hidden="true">&rdquo;</span>
        </p>
      </div>

      {/* Autor */}
      <div className="mt-8 flex items-center gap-3">
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-brand-celeste/20">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? author}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="56px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-heading text-base font-bold text-brand-azul">
              {iniciales(author)}
            </div>
          )}
        </div>
        <div>
          <p className="font-body text-base font-bold text-brand-azul">
            {author}
            {role && (
              <span className="font-normal text-brand-celeste">, {role}</span>
            )}
          </p>
          {servicioNombre && (
            <p className="font-body text-sm text-brand-texto/60">{servicioNombre}</p>
          )}
        </div>
      </div>

      {/* Leer más */}
      <div className="mt-6">
        <Button
          variant="primary"
          size="md"
          iconName="ArrowRightIcon"
          iconAnimation="slide"
          className="rounded-full"
        >
          Leer más
        </Button>
      </div>
    </button>
  )
}
