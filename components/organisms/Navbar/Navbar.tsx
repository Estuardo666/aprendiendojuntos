'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
import { mobileMenuStore } from '@/lib/mobile-menu-store'
import { cn } from '@/lib/utils/cn'
import type { NavLink, NavbarProps, NavbarSubmenuItem } from './Navbar.types'

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

const panelTransition = {
  duration: 0.22,
  ease: [0.22, 1, 0.36, 1],
} as const

const mobileMenuTransition = {
  type: 'spring',
  stiffness: 380,
  damping: 28,
  mass: 0.75,
} as const

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    y: -18,
    scale: 0.96,
    filter: 'blur(10px)',
    clipPath: 'inset(0% 0% 100% 0% round 30px)',
    transition: {
      ...mobileMenuTransition,
      when: 'afterChildren',
      staggerChildren: 0.025,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    clipPath: 'inset(0% 0% 0% 0% round 30px)',
    transition: {
      ...mobileMenuTransition,
      when: 'beforeChildren',
      staggerChildren: 0.035,
      delayChildren: 0.02,
    },
  },
} as const

const mobileMenuItemVariants = {
  closed: {
    opacity: 0,
    y: -10,
    scale: 0.985,
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const

function isRouteActive(pathname: string, href: string) {
  if (href.startsWith('#')) {
    return false
  }

  if (href === '/') {
    return pathname === '/'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

function hasActiveSubmenu(pathname: string, link: NavLink) {
  return link.submenu?.some(item => isRouteActive(pathname, item.href)) ?? false
}

function DesktopSubmenuItem({ item, pathname }: { item: NavbarSubmenuItem; pathname: string }) {
  const isActive = isRouteActive(pathname, item.href)

  return (
    <motion.li>
      <Link
        href={item.href}
        className={cn(
          'block rounded-[22px] px-4 py-3 transition-colors duration-200',
          isActive
            ? 'bg-brand-azul text-white'
            : 'text-brand-azul hover:bg-[rgba(253,217,4,0.33)] hover:text-brand-azul',
        )}
      >
        <span className="block font-body text-[0.98rem] font-medium leading-none">{item.label}</span>
      </Link>
    </motion.li>
  )
}

export function Navbar({ links, logoUrl, logoAlt, logoWidth, logoHeight, ctaLabel, ctaHref, ctaLabel2, ctaHref2 }: NavbarProps) {
  const pathname = usePathname()
  const [isCompact, setIsCompact] = useState(false)
  const [hoveredDesktopLink, setHoveredDesktopLink] = useState<string | null>(null)
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null)
  const [isHeaderHovered, setIsHeaderHovered] = useState(false)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ulRef = useRef<HTMLUListElement>(null)
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map())
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; height: number; opacity: number } | null>(null)

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
    const handleScroll = () => {
      setIsCompact(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setHoveredDesktopLink(null)
    setOpenDesktopMenu(null)
    setIsMobileMenuOpen(false)
    setOpenMobileMenu(null)
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsHeaderHovered(false)
    setPillStyle(null)
  }, [pathname])

  useEffect(() => {
    mobileMenuStore.setOpen(isMobileMenuOpen)
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!hoveredDesktopLink) {
      setPillStyle(prev => (prev ? { ...prev, opacity: 0 } : null))
      return
    }
    const li = itemRefs.current.get(hoveredDesktopLink)
    const ul = ulRef.current
    if (!li || !ul) return
    const ulRect = ul.getBoundingClientRect()
    const liRect = li.getBoundingClientRect()
    setPillStyle({
      left: liRect.left - ulRect.left + ul.scrollLeft,
      width: liRect.width,
      height: liRect.height,
      opacity: 1,
    })
  }, [hoveredDesktopLink])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5 md:px-0">
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.button
            key="mobile-overlay"
            type="button"
            aria-label="Cerrar menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              setIsMobileMenuOpen(false)
              setOpenMobileMenu(null)
            }}
            className="pointer-events-auto fixed inset-0 z-[60] bg-brand-azul/30 backdrop-blur-[8px] md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={false}
        animate={{ y: isCompact ? -2 : 0 }}
        transition={shellTransition}
        className="pointer-events-auto relative z-10 w-[97vw] md:w-[95vw]"
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
      >
        <div
          className={cn(
            'rounded-[30px] border border-white/10 px-2 py-3 text-brand-azul backdrop-blur-xl md:px-3 md:py-3.5',
            'transition-[background-color] duration-200',
            isHeaderHovered || openDesktopMenu !== null || isMobileMenuOpen
              ? 'bg-white delay-0'
              : 'bg-white/70 delay-500',
          )}
        >
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <Link href="/" aria-label="Inicio" className="shrink-0">
              <Image
                src={logoUrl ?? '/logoamarillo.svg'}
                alt={logoAlt ?? 'Aprendiendo Juntos'}
                width={logoWidth ?? 262}
                height={logoHeight ?? 83}
                className="h-9 w-auto md:h-11"
                priority
              />
            </Link>

            <ul ref={ulRef} className="relative hidden flex-1 items-center justify-center gap-0.5 md:flex">
              {pillStyle && (
                <motion.div
                  className="pointer-events-none absolute top-0 rounded-full bg-brand-azul/10"
                  animate={{
                    left: pillStyle.left,
                    width: pillStyle.width,
                    height: pillStyle.height,
                    opacity: pillStyle.opacity,
                  }}
                  transition={pillTransition}
                  style={{ top: '50%', translateY: '-50%' }}
                />
              )}
              {links.map(link => {
                const hasSubmenu = Boolean(link.submenu?.length)
                const isActive = isRouteActive(pathname, link.href) || hasActiveSubmenu(pathname, link)
                const isHovered = hoveredDesktopLink === link.href || openDesktopMenu === link.href

                return (
                  <li
                    key={link.href}
                    ref={el => { if (el) itemRefs.current.set(link.href, el) }}
                    className="relative"
                    onMouseEnter={() => {
                      setHoveredDesktopLink(link.href)
                      setOpenDesktopMenu(hasSubmenu ? link.href : null)
                    }}
                    onMouseLeave={() => {
                      setHoveredDesktopLink(current => (current === link.href ? null : current))
                      setOpenDesktopMenu(current => (current === link.href ? null : current))
                    }}
                    onBlurCapture={event => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setHoveredDesktopLink(current => (current === link.href ? null : current))
                        setOpenDesktopMenu(current => (current === link.href ? null : current))
                      }
                    }}
                  >
                    <Link
                      href={link.href}
                      onFocus={() => {
                        setHoveredDesktopLink(link.href)
                        setOpenDesktopMenu(hasSubmenu ? link.href : null)
                      }}
                      className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-2.5 py-2 transition-all duration-200"
                    >
                      <span
                        className={cn(
                          'relative z-10 font-body text-[1.02rem] font-medium tracking-[-0.03em] transition-colors duration-200',
                          isActive ? 'text-brand-azul' : 'text-brand-azul',
                        )}
                      >
                        {link.label}
                      </span>

                      {hasSubmenu && (
                        <motion.span
                          animate={{ rotate: openDesktopMenu === link.href ? 180 : 0 }}
                          transition={panelTransition}
                          className={cn('relative z-10 transition-colors duration-200', 'text-brand-azul')}
                          aria-hidden="true"
                        >
                          <Icon name="ChevronUpIcon" size="sm" />
                        </motion.span>
                      )}
                    </Link>

                    {hasSubmenu && openDesktopMenu === link.href && (
                      <div className="absolute left-0 top-full z-[49] h-3 w-full" aria-hidden="true" />
                    )}

                    <AnimatePresence>
                      {hasSubmenu && openDesktopMenu === link.href && link.submenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.95 }}
                          animate={{ opacity: 1, y: 8, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.98 }}
                          transition={{
                            duration: 0.25,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          className="absolute left-0 top-full z-50 mt-2.5 w-[min(22rem,72vw)] rounded-[24px] border border-brand-azul/10 bg-white p-2 shadow-lg shadow-brand-azul/5"
                        >
                          <ul className="space-y-1.5">
                            {link.submenu.map(item => (
                              <DesktopSubmenuItem key={item.href} item={item} pathname={pathname} />
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>

            <div className="hidden md:flex items-center gap-1">
              {ctaLabel && ctaHref && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={pillTransition}>
                  <Button
                    variant="primary"
                    size="sm"
                    href={ctaHref}
                    iconName="ArrowRightIcon"
                    iconAnimation="slide"
                    className="rounded-full px-2.5 py-2 font-body text-[0.85rem] font-semibold tracking-[-0.03em]"
                  >
                    {ctaLabel}
                  </Button>
                </motion.div>
              )}
              {ctaLabel2 && ctaHref2 && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={pillTransition}>
                  <Button
                    variant="secondary"
                    size="sm"
                    href={ctaHref2}
                    iconName="ArrowRightIcon"
                    iconAnimation="slide"
                    className="rounded-full px-2.5 py-2 font-body text-[0.85rem] font-semibold tracking-[-0.03em]"
                  >
                    {ctaLabel2}
                  </Button>
                </motion.div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(current => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-azul/30 text-brand-azul md:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMobileMenuOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -14, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 14, scale: 0.9 }}
                  transition={panelTransition}
                  className="inline-flex"
                >
                  <Icon name={isMobileMenuOpen ? 'CloseIcon' : 'MenuIcon'} size="md" />
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="mt-3 overflow-hidden rounded-[30px] border border-brand-azul/10 bg-white px-3 py-3 backdrop-blur-2xl md:hidden"
            >
              <ul className="space-y-1">
                {links.map(link => {
                  const hasSubmenu = Boolean(link.submenu?.length)
                  const isExpanded = openMobileMenu === link.href
                  const isActive = isRouteActive(pathname, link.href) || hasActiveSubmenu(pathname, link)

                  return (
                    <motion.li
                      key={link.href}
                      variants={mobileMenuItemVariants}
                      className={cn(
                        'rounded-[24px] px-2 py-1.5 transition-colors duration-200',
                        isExpanded || isActive
                          ? 'bg-brand-celeste/8'
                          : 'bg-brand-azul/[0.035]',
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Link
                          href={link.href}
                          className={cn(
                            'flex-1 rounded-full px-3 py-2.5 font-heading text-[1.1rem] font-bold tracking-[-0.03em] transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-celeste/45',
                            isActive
                              ? 'bg-brand-celeste text-white'
                              : 'text-brand-azul hover:bg-brand-azul/6 hover:text-brand-azul',
                          )}
                        >
                          {link.label}
                        </Link>

                        {hasSubmenu && (
                          <button
                            type="button"
                            onClick={() => setOpenMobileMenu(current => (current === link.href ? null : link.href))}
                            className={cn(
                              'inline-flex h-11 w-11 items-center justify-center rounded-full transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-celeste/45',
                              isExpanded
                                ? 'bg-brand-celeste text-white'
                                : 'text-brand-azul hover:bg-brand-azul/6 hover:text-brand-azul',
                            )}
                            aria-expanded={isExpanded}
                            aria-label={`Mostrar submenú de ${link.label}`}
                          >
                            <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={panelTransition}>
                              <Icon name="ChevronUpIcon" size="sm" />
                            </motion.span>
                          </button>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {hasSubmenu && isExpanded && link.submenu && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={panelTransition}
                            className="overflow-hidden"
                          >
                            <ul className="mt-1 space-y-0.5 rounded-[20px] bg-brand-azul/[0.035] px-2 pb-1.5 pt-1.5">
                              {link.submenu.map(item => {
                                const isSubmenuActive = isRouteActive(pathname, item.href)

                                return (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      className={cn(
                                        'block rounded-[20px] px-3 py-2 font-body text-[1rem] font-medium transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-celeste/45',
                                        isSubmenuActive
                                          ? 'bg-brand-azul text-white'
                                          : 'text-brand-azul hover:bg-[rgba(253,217,4,0.33)] hover:text-brand-azul',
                                      )}
                                    >
                                      <span className="block leading-none">
                                        {item.label}
                                      </span>
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  )
                })}
              </ul>

              {ctaLabel && ctaHref && (
                <motion.div
                  variants={mobileMenuItemVariants}
                  className="mt-3 space-y-2"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    href={ctaHref}
                    iconName="ArrowRightIcon"
                    iconAnimation="slide"
                    className="w-full justify-center rounded-full px-6 py-3 font-body text-[0.98rem] font-semibold tracking-[-0.03em]"
                  >
                    {ctaLabel}
                  </Button>
                  {ctaLabel2 && ctaHref2 && (
                    <Button
                      variant="secondary"
                      size="sm"
                      href={ctaHref2}
                      iconName="ArrowRightIcon"
                      iconAnimation="slide"
                      className="w-full justify-center rounded-full px-6 py-3 font-body text-[0.98rem] font-semibold tracking-[-0.03em]"
                    >
                      {ctaLabel2}
                    </Button>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
