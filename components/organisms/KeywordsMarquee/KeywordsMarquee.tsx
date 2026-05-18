'use client'

import { useReducedMotion } from 'framer-motion'
import type { KeywordsMarqueeProps } from './KeywordsMarquee.types'

// Duración del ciclo en segundos según velocidad configurada
const duraciones = { lenta: 30, normal: 15, rapida: 8 } as const

/**
 * Banda de keywords animadas antes del footer.
 * Fondo celeste, texto blanco en semibold + emojis.
 * Respeta prefers-reduced-motion: muestra keywords estáticas en flex wrap.
 * Implementación CSS pura sin Framer Motion runtime para mejor performance.
 */
export function KeywordsMarquee({
  keywords,
  velocidad = 'normal',
}: KeywordsMarqueeProps) {
  const prefersReducedMotion = useReducedMotion()

  // Versión estática para usuarios con reduced-motion habilitado
  if (prefersReducedMotion) {
    return (
      <section className="bg-brand-crema py-6 md:py-8" aria-hidden="true">
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {keywords.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 font-heading font-semibold text-brand-azul text-[2.5rem] hover:text-brand-celeste transition-colors cursor-default"
            >
              <span>{kw.emoji}</span>
              <span>{kw.texto}</span>
            </span>
          ))}
        </div>
      </section>
    )
  }

  // Duplicamos para bucle infinito con CSS animation
  const items = [...keywords, ...keywords]
  const duration = duraciones[velocidad]

  return (
    <section className="bg-brand-crema py-6 md:py-8 overflow-hidden" aria-hidden="true">
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
        }}
      >
        {items.map((kw, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 mx-6 font-heading font-semibold text-brand-azul text-[2.5rem] tracking-tight select-none hover:text-brand-celeste transition-colors cursor-default"
          >
            <span>{kw.emoji}</span>
            <span>{kw.texto}</span>
            <span className="text-brand-azul/25 ml-4">·</span>
          </span>
        ))}
      </div>
    </section>
  )
}
