'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Heading } from '@/components/atoms/Heading'
import { Icon } from '@/components/atoms/Icon'
import type { AboutTeamMember, AboutTeamSectionProps } from './AboutTeamSection.types'

function TeamCard({ miembro }: { miembro: AboutTeamMember }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-[#145ea5] transition-all duration-500 ease-out hover:scale-[1.025] hover:bg-brand-celeste">
      <div className="relative m-2 overflow-hidden rounded-[1.75rem] aspect-[4/4.3]">
        {miembro.fotoSrc ? (
          <Image
            src={miembro.fotoSrc}
            alt={miembro.fotoAlt ?? miembro.nombre}
            fill
            sizes="(min-width: 1280px) 22rem, (min-width: 768px) 44vw, 82vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-[#bcd8ee]" />
        )}
      </div>

      <div className="relative p-5 pb-6">
        <h3 className="font-body text-[1.5rem] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
          {miembro.nombre}
        </h3>

        <p className="text-process-card-paragraph mt-1 text-[#d9edf8]">
          {miembro.cargo}
        </p>

        <span className="pointer-events-none absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FDD904_0%,#F9B50B_100%)] text-brand-azul opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 scale-75">
          <Icon name="ArrowRightIcon" size="sm" color="azul" className="rotate-[-45deg]" />
        </span>
      </div>
    </article>
  )
}

export function AboutTeamSection({ pretitulo, titulo, miembros }: AboutTeamSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector('div')?.clientWidth ?? 320
    scrollRef.current.scrollBy({
      left: dir === 'next' ? cardWidth + 20 : -(cardWidth + 20),
      behavior: 'smooth',
    })
  }

  if (!miembros || miembros.length === 0) return null

  return (
    <section className="px-5 pb-24 pt-8 md:px-8 md:pb-28 md:pt-12">
      <div className="mx-auto w-full max-w-[1260px]">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="pretitulo">{pretitulo}</span>

          <Heading
            as="h2"
            variant="h2"
            animate={true}
            className="mx-auto mt-4 max-w-full text-[clamp(2.45rem,4.8vw,3em)] leading-[0.92] tracking-[-0.06em] text-brand-azul"
          >
            {titulo}
          </Heading>
        </div>

        <div
          ref={scrollRef}
          className="mt-10 flex justify-center gap-4 overflow-x-auto px-1 py-2 scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {miembros.map((miembro) => (
            <div key={miembro.id} className="snap-start flex-shrink-0 w-[82%] sm:w-[46%] lg:w-[22rem]">
              <TeamCard miembro={miembro} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => scroll('prev')}
            aria-label="Anterior"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-azul text-brand-sunrise transition-colors duration-300 hover:bg-[#0c68b4]"
          >
            <Icon name="ChevronRightIcon" size="sm" className="rotate-180" color="naranja" />
          </button>

          <button
            type="button"
            onClick={() => scroll('next')}
            aria-label="Siguiente"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-azul text-brand-sunrise transition-colors duration-300 hover:bg-[#0c68b4]"
          >
            <Icon name="ChevronRightIcon" size="sm" color="naranja" />
          </button>
        </div>
      </div>
    </section>
  )
}
