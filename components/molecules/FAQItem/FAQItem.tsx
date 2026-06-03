'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { FAQItemProps } from './FAQItem.types'

const springTransition = {
  type: 'spring',
  stiffness: 320,
  damping: 36,
  mass: 1,
} as const

const panelTransition = {
  duration: 0.68,
  ease: [0.16, 1, 0.3, 1],
} as const

export function FAQItem({ pregunta, respuesta, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.article
      layout
      transition={springTransition}
      className="overflow-hidden rounded-[1.55rem] border border-[#8ec8eb] bg-white"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left md:px-7 md:py-4.5"
      >
        <h3 className="pr-3 font-body text-[clamp(1rem,1.215vw,1.188rem)] font-bold leading-[1.1] tracking-[-0.03em] text-brand-azul">
          {pregunta}
        </h3>

        <span
          aria-hidden="true"
          className={`relative inline-flex h-[1em] w-[1ch] shrink-0 items-center justify-center font-body text-[2rem] font-normal leading-none ${isOpen ? 'text-brand-azul' : 'text-brand-naranja'}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isOpen ? 'minus' : 'plus'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {isOpen ? '−' : '+'}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>

      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={panelTransition}
        className="overflow-hidden"
      >
        <div
          className="px-6 pb-5 pt-0 font-body text-[clamp(1rem,1.08vw,1.08rem)] leading-[1.32] text-brand-texto/90 md:px-7
            [&_h3]:font-heading [&_h3]:text-[1.1rem] [&_h3]:font-bold [&_h3]:text-brand-azul [&_h3]:mb-3
            [&_p]:mt-2 [&_p]:leading-[1.55]"
          dangerouslySetInnerHTML={{ __html: respuesta }}
        />
      </motion.div>
    </motion.article>
  )
}
