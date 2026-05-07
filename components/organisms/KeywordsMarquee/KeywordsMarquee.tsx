'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { KeywordsMarqueeProps } from './KeywordsMarquee.types'

// Duración del ciclo en segundos según velocidad configurada
const duraciones = { lenta: 40, normal: 25, rapida: 15 } as const

/**
 * Banda de keywords animadas antes del footer.
 * Fondo gradiente amarillo (brand-sunrise), texto blanco, emojis 50% más grandes.
 * Respeta prefers-reduced-motion: muestra keywords estáticas en flex wrap.
 */
export function KeywordsMarquee({
  keywords,
  velocidad = 'normal',
}: KeywordsMarqueeProps) {
  const prefersReducedMotion = useReducedMotion()
  const seamlessKeywords = [...keywords, ...keywords, ...keywords]
  const formatKeyword = (texto: string) => {
    if (!texto) return ''
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
  }

  // Versión estática para usuarios con reduced-motion habilitado
  if (prefersReducedMotion) {
    return (
      <section className="py-6 overflow-hidden" style={{ backgroundImage: 'linear-gradient(135deg, #FDD904 0%, #F9B50B 100%)' }} aria-hidden="true">
        <div className="flex flex-wrap justify-center gap-4 px-6">
          {keywords.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 font-heading text-[1.95rem] font-bold tracking-[-0.03em] text-white"
            >
              <span className="inline-block text-[2rem] transition-transform duration-300 ease-out hover:scale-[1.2]">{kw.emoji}</span>
              <span>{formatKeyword(kw.texto)}</span>
            </span>
          ))}
        </div>
      </section>
    )
  }

  // Versión animada: duplicamos las keywords para bucle seamless
  return (
    <section className="py-6 overflow-hidden" style={{ backgroundImage: 'linear-gradient(135deg, #FDD904 0%, #F9B50B 100%)' }} aria-hidden="true">
      <motion.div
        className="flex w-max whitespace-nowrap gap-12 px-6"
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{
          duration: duraciones[velocidad],
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {seamlessKeywords.map((kw, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 font-heading text-[1.95rem] font-bold tracking-[-0.03em] text-white select-none"
          >
            <span className="inline-block text-[2rem] transition-transform duration-300 ease-out hover:scale-[1.2]">{kw.emoji}</span>
            <span>{formatKeyword(kw.texto)}</span>
            <span className="ml-4 text-white/30">·</span>
          </span>
        ))}
      </motion.div>
    </section>
  )
}
