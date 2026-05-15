'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/lib/utils/cn'

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
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)
  const [isLogoHovered, setIsLogoHovered] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const logoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleHeaderMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsHeaderHovered(true)
  }

  const handleHeaderMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHeaderHovered(false)
    }, 150)
  }

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
        layout
        initial={false}
        animate={{ y: isCompact ? -2 : 0 }}
        transition={shellTransition}
        className="pointer-events-auto relative z-10 w-[90vw] md:w-auto md:min-w-[20vw]"
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
      >
        <div
          className={cn(
            'rounded-[30px] border border-white/10 px-2 py-3 text-brand-azul backdrop-blur-xl md:px-3 md:py-3.5',
            'transition-[background-color] duration-200',
            isHeaderHovered ? 'bg-white delay-0' : 'bg-white/70 delay-500',
          )}
        >
          <div className="flex items-center justify-between gap-2">

            <div
              className="flex items-center gap-2"
              onMouseEnter={() => {
                if (logoTimeoutRef.current) {
                  clearTimeout(logoTimeoutRef.current)
                  logoTimeoutRef.current = null
                }
                setIsLogoHovered(true)
              }}
              onMouseLeave={() => {
                logoTimeoutRef.current = setTimeout(() => {
                  setIsLogoHovered(false)
                }, 300)
              }}
            >
              <AnimatePresence>
                {isLogoHovered && (
                  <motion.div
                    layout
                    initial={{ width: 0, opacity: 0, scale: 0.85 }}
                    animate={{ width: 'auto', opacity: 1, scale: 1 }}
                    exit={{ width: 0, opacity: 0, scale: 0.85 }}
                    transition={{ ...pillTransition, duration: 0.35 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    <Link
                      href="/"
                      className="inline-flex items-center rounded-full bg-brand-azul/8 px-2.5 py-1.5 font-body text-[0.75rem] font-medium text-brand-azul transition-colors duration-200 hover:bg-brand-azul/15"
                    >
                      Ir al sitio global
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
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
            </div>

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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 z-[1]"
        style={{ height: 'calc(100% + 35px)', transform: 'translateY(-20px)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, black 80%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 60%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 55%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 20%, transparent 55%)',
          }}
        />
      </div>
    </header>
  )
}
