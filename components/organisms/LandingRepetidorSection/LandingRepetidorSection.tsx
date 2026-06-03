'use client'

import { useState } from 'react'
import { FAQItem } from '@/components/molecules/FAQItem'
import type { LandingRepetidorSectionProps } from './LandingRepetidorSection.types'

export function LandingRepetidorSection({ bloques }: LandingRepetidorSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(bloques.length > 0 ? 0 : null)

  return (
    <section className="bg-brand-blanco px-0 py-2">
      <div className="mx-auto w-full">
        <div className="space-y-3">
          {bloques.map((bloque, i) => {
            const respuesta = [
              bloque.tituloInterno ? `<h3>${bloque.tituloInterno}</h3>` : '',
              bloque.contenidoWysiwyg ?? '',
            ].join('')

            return (
              <FAQItem
                key={`${bloque.tituloRepetidor}-${i}`}
                pregunta={bloque.tituloRepetidor}
                respuesta={respuesta}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex((current) => current === i ? null : i)}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
