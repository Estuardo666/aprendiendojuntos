'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const bubbleSequence = [
  { id: 'hola', text: 'Hola' },
  { id: 'chat', text: 'Chatea con nosotros' },
] as const

type BubbleId = (typeof bubbleSequence)[number]['id']

const introTransition = {
  duration: 0.56,
  ease: [0.22, 1, 0.36, 1],
} as const

const bubbleTransition = {
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1],
} as const

const hoverTransition = {
  type: 'spring',
  stiffness: 240,
  damping: 18,
  mass: 0.8,
} as const

export function FloatingDolphin() {
  const shouldReduceMotion = useReducedMotion()
  const [activeBubble, setActiveBubble] = useState<BubbleId | null>(null)

  useEffect(() => {
    if (shouldReduceMotion) {
      setActiveBubble(null)
      return
    }

    const introDelay = 2000
    const firstDuration = 3000
    const secondDuration = 5000
    const pauseDuration = 2000
    const cycleDuration = firstDuration + secondDuration + pauseDuration

    const startCycle = () => {
      setActiveBubble('hola')
      const t2 = window.setTimeout(() => setActiveBubble('chat'), firstDuration)
      const t3 = window.setTimeout(() => setActiveBubble(null), firstDuration + secondDuration)
      return [t2, t3]
    }

    const introTimer = window.setTimeout(() => {
      const cycleTimers = startCycle()
      const interval = window.setInterval(() => {
        cycleTimers.forEach(t => window.clearTimeout(t))
        startCycle()
      }, cycleDuration)

      return () => {
        window.clearInterval(interval)
        cycleTimers.forEach(t => window.clearTimeout(t))
      }
    }, introDelay)

    return () => {
      window.clearTimeout(introTimer)
    }
  }, [shouldReduceMotion])

  const bubbleText = bubbleSequence.find(item => item.id === activeBubble)?.text

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-[70]">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 28, y: 32, scale: 0.84, rotate: 8 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
        transition={{ ...introTransition, delay: 2 }}
        className="relative h-[124px] w-[108px] sm:h-[168px] sm:w-[146px]"
      >
        <AnimatePresence mode="wait">
          {bubbleText && (
            <motion.div
              key={activeBubble}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 16, y: 10, scale: 0.9 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 10, y: 8, scale: 0.94 }}
              transition={bubbleTransition}
              className="pointer-events-auto absolute bottom-[72%] right-[52%] z-20 w-max min-w-[5.5rem] max-w-[12.5rem] rounded-[26px] border-2 border-brand-azul bg-brand-crema px-4 py-2.5 transition-colors duration-200 hover:bg-brand-azul hover:border-brand-azul sm:bottom-[74%] sm:right-[56%] group cursor-pointer"
              aria-live="polite"
            >
              <motion.p
                key={`${activeBubble}-text`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-pretty font-heading text-[0.9rem] font-semibold leading-tight tracking-[-0.03em] text-brand-azul transition-colors duration-200 group-hover:text-white sm:text-[1rem]"
              >
                {bubbleText}
              </motion.p>

              <span className="absolute -bottom-[8px] right-6 block h-4 w-4 rotate-45 border-b-2 border-r-2 border-brand-azul bg-brand-crema transition-colors duration-200 group-hover:bg-brand-azul" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={
            shouldReduceMotion
              ? undefined
              : {
                  y: -6,
                  scale: 1.04,
                  rotate: -4,
                }
          }
          transition={hoverTransition}
          className="pointer-events-auto relative h-full w-full origin-bottom-right"
        >
          <img
            src="/delfinweb.png"
            alt="Delfín Aprendiendo Juntos"
            className="h-full w-full object-contain select-none"
            draggable="false"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}