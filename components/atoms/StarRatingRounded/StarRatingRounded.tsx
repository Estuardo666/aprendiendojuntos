'use client'

import { motion } from 'framer-motion'
import type { StarRatingRoundedProps } from './StarRatingRounded.types'

function StarFilledRounded() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#FAB600"
      stroke="#FAB600"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function StarEmptyRounded() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FAB600"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 opacity-40"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const starVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 12,
      stiffness: 300,
    },
  },
}

export function StarRatingRounded({ value, max = 5, animated = false, staggerDelay = 0.1 }: StarRatingRoundedProps) {
  const clamped = Math.min(Math.max(Math.round(value), 0), max)

  const stars = Array.from({ length: max }, (_, i) =>
    i < clamped ? <StarFilledRounded key={i} /> : <StarEmptyRounded key={i} />,
  )

  if (animated) {
    return (
      <motion.div
        className="flex items-center gap-1"
        role="img"
        aria-label={`${clamped} de ${max} estrellas`}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {stars.map((star, i) => (
          <motion.div key={i} variants={starVariants}>
            {star}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${clamped} de ${max} estrellas`}
    >
      {stars}
    </div>
  )
}
