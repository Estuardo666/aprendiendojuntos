'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@/components/atoms/Button'

const shellTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 28,
  mass: 0.9,
} as const

const pillTransition = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
  mass: 0.8,
} as const

interface LandingNavbarProps {
  ctaLabel?: string
}

export function LandingNavbar({ ctaLabel = 'Reservar mi lugar' }: LandingNavbarProps) {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsCompact(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleCTAClick() {
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5 md:px-0">
      <motion.nav
        initial={false}
        animate={{ scale: isCompact ? 0.9 : 1, y: isCompact ? -2 : 0 }}
        transition={shellTransition}
        className="pointer-events-auto relative z-10 w-[95vw] md:w-[80vw] origin-top"
      >
        <div className="rounded-[30px] border border-white/10 bg-white/70 px-2 py-3 text-brand-azul backdrop-blur-xl md:px-3 md:py-3.5">
          <div className="flex items-center justify-between gap-2">

            <Link href="/" aria-label="Inicio" className="shrink-0">
              <Image
                src="/logoamarillo.svg"
                alt="Aprendiendo Juntos"
                width={262}
                height={83}
                className="h-9 w-auto md:h-11"
                priority
              />
            </Link>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={pillTransition}
            >
              <Button
                variant="primary"
                size="sm"
                onClick={handleCTAClick}
                iconName="ArrowRightIcon"
                iconAnimation="slide"
                fillColor="bg-brand-azul"
                hoverTextColor="text-white"
                className="rounded-full px-4 py-2 font-body text-[0.85rem] font-semibold tracking-[-0.03em]"
              >
                {ctaLabel}
              </Button>
            </motion.div>

          </div>
        </div>
      </motion.nav>
    </header>
  )
}
