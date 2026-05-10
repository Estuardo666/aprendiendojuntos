'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { KeywordsMarqueeProps } from './KeywordsMarquee.types'

// Duración del ciclo en segundos según velocidad configurada
const duraciones = { lenta: 40, normal: 25, rapida: 15 } as const

/**
 * Banda de keywords animadas antes del footer.
 * Fondo naranja, texto azul oscuro en mayúsculas + emojis.
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
      <section className="bg-brand-naranja py-5" aria-hidden="true">
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {keywords.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 font-heading font-black text-brand-azul text-base uppercase"
            >
              <span>{kw.emoji}</span>
              <span>{kw.texto}</span>
            </span>
          ))}
        </div>
      </section>
    )
  }

  // Versión animada: duplicamos las keywords para bucle seamless
  return (
    <section className="bg-brand-naranja py-5 overflow-hidden" aria-hidden="true">
      <motion.div
        className="flex whitespace-nowrap gap-0"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: duraciones[velocidad],
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...keywords, ...keywords].map((kw, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 mx-6 font-heading font-black text-brand-azul text-base uppercase tracking-tight select-none"
          >
            <span className="text-lg">{kw.emoji}</span>
            <span>{kw.texto}</span>
            <span className="text-brand-azul/25 ml-4">·</span>
          </span>
        ))}
      </motion.div>
    </section>
  )
}
