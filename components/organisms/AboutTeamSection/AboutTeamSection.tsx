'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heading } from '@/components/atoms/Heading'
import { Icon } from '@/components/atoms/Icon'
import type { AboutTeamMember, AboutTeamSectionProps } from './AboutTeamSection.types'

function TeamCard({ miembro, onClick }: { miembro: AboutTeamMember; onClick: () => void }) {
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

        <button
          type="button"
          onClick={onClick}
          aria-label={`Ver perfil de ${miembro.nombre}`}
          className="absolute bottom-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FDD904_0%,#F9B50B_100%)] text-brand-azul opacity-100 transition-all duration-300 ease-out hover:scale-110 md:opacity-0 md:group-hover:opacity-100 md:group-hover:scale-100 md:scale-75"
        >
          <Icon name="ArrowRightIcon" size="sm" color="azul" className="rotate-[-45deg]" />
        </button>
      </div>
    </article>
  )
}

export function AboutTeamSection({ pretitulo, titulo, miembros }: AboutTeamSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedMember, setSelectedMember] = useState<AboutTeamMember | null>(null)

  const scroll = (dir: 'prev' | 'next') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector('div')?.clientWidth ?? 320
    scrollRef.current.scrollBy({
      left: dir === 'next' ? cardWidth + 20 : -(cardWidth + 20),
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedMember])

  if (!miembros || miembros.length === 0) return null

  return (
    <>
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
                <TeamCard miembro={miembro} onClick={() => setSelectedMember(miembro)} />
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

      <AnimatePresence>
        {selectedMember && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-brand-crema/20 backdrop-blur-md"
              onClick={() => setSelectedMember(null)}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 24 }}
                transition={{ type: 'spring', damping: 25, stiffness: 320 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-brand-crema shadow-2xl scrollbar-hide"
              >
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  aria-label="Cerrar"
                  className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-brand-azul text-brand-blanco transition-colors duration-300 hover:bg-brand-celeste"
                >
                  <Icon name="CloseIcon" size="md" color="blanco" />
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className="relative aspect-[3/4] w-full flex-shrink-0 overflow-hidden rounded-t-[2rem] md:aspect-auto md:h-auto md:w-[42%] md:self-stretch md:rounded-none md:rounded-l-[2rem]">
                    {selectedMember.fotoSrc ? (
                      <Image
                        src={selectedMember.fotoSrc}
                        alt={selectedMember.fotoAlt ?? selectedMember.nombre}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 40vw, 100vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#bcd8ee]">
                        <span className="font-heading text-3xl text-brand-azul/40">
                          {selectedMember.nombre
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-center px-6 pb-8 pt-4 md:px-10 md:py-10">
                    <h2 className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-brand-azul">
                      {selectedMember.nombre}
                    </h2>

                    <span className="mt-3 inline-flex w-fit items-center rounded-full bg-[#bcd8ee] px-4 py-1.5 font-body text-sm font-semibold text-brand-azul">
                      {selectedMember.cargo}
                    </span>

                    {selectedMember.bio && (
                      <p className="mt-6 font-body text-base leading-snug text-[#4a5568]">
                        {selectedMember.bio}
                      </p>
                    )}

                    {selectedMember.especialidades && selectedMember.especialidades.length > 0 && (
                      <div className="mt-8">
                        <h3 className="font-heading text-xl font-bold text-brand-azul">
                          Especialidades
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {selectedMember.especialidades.map((esp, i) => (
                            <li key={i} className="flex items-start gap-2 font-body text-[#4a5568]">
                              <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-celeste" />
                              {esp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
