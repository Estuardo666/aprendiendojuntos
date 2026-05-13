'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { KeywordsMarqueeProps } from './KeywordsMarquee.types'

// Duración del ciclo en segundos según velocidad configurada
const duraciones = { lenta: 30, normal: 15, rapida: 8 } as const

/**
 * Banda de keywords animadas antes del footer.
 * Fondo celeste, texto blanco en semibold + emojis.
 * Respeta prefers-reduced-motion: muestra keywords estáticas en flex wrap.
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

  // Versión animada: cuadruplicamos las keywords para bucle infinito sin gaps
  const items = [...keywords, ...keywords, ...keywords, ...keywords]

  return (
    <section className="bg-brand-crema py-6 md:py-8 overflow-hidden" aria-hidden="true">
      <motion.div
        className="flex whitespace-nowrap gap-0"
        animate={{ x: ['0%', '-25%'] }}
        transition={{
          duration: duraciones[velocidad],
          repeat: Infinity,
          ease: 'linear',
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
      </motion.div>
    </section>
  )
}
