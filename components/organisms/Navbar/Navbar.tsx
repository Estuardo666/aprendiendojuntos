'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Icon } from '@/components/atoms/Icon'
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
    <motion.li whileHover={{ scale: 1.05 }} transition={pillTransition}>
      <Link
        href={item.href}
        className={cn(
          'block rounded-[22px] px-4 py-3 transition-colors duration-200',
          isActive ? 'text-brand-celeste' : 'text-brand-azul hover:text-brand-celeste',
        )}
      >
        <span className="block font-body text-[0.98rem] font-medium leading-none">{item.label}</span>
      </Link>
    </motion.li>
  )
}

export function Navbar({ links, ctaLabel, ctaHref, ctaLabel2, ctaHref2 }: NavbarProps) {
  const pathname = usePathname()
  const [isCompact, setIsCompact] = useState(false)
  const [hoveredDesktopLink, setHoveredDesktopLink] = useState<string | null>(null)
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null)

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
  }, [pathname])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5 md:px-0">
      <motion.nav
        initial={false}
        animate={{ scale: isCompact ? 0.9 : 1, y: isCompact ? -2 : 0 }}
        transition={shellTransition}
        className="pointer-events-auto relative w-auto md:w-[80vw] origin-top"
      >
        <div className="rounded-[30px] border border-white/10 bg-white/70 px-2 py-3 text-brand-azul backdrop-blur-xl md:px-3 md:py-3.5">
          <div className="flex items-center justify-between gap-2 md:gap-4">
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

            <ul className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
              {links.map(link => {
                const hasSubmenu = Boolean(link.submenu?.length)
                const isActive = isRouteActive(pathname, link.href) || hasActiveSubmenu(pathname, link)
                const isHovered = hoveredDesktopLink === link.href || openDesktopMenu === link.href

                return (
                  <li
                    key={link.href}
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
                      <AnimatePresence>
                        {isHovered && (
                          <motion.span
                            layoutId="desktop-hover-pill"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={pillTransition}
                            className="absolute inset-0 rounded-full bg-brand-azul/10"
                          />
                        )}
                      </AnimatePresence>

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
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={panelTransition}
              className="mt-3 rounded-[30px] border border-white/10 bg-brand-azul px-4 py-4 md:hidden"
            >
              <ul className="space-y-2">
                {links.map(link => {
                  const hasSubmenu = Boolean(link.submenu?.length)
                  const isExpanded = openMobileMenu === link.href
                  const isActive = isRouteActive(pathname, link.href) || hasActiveSubmenu(pathname, link)

                  return (
                    <li key={link.href} className="rounded-[24px] bg-white/5 px-2 py-1.5">
                      <div className="flex items-center gap-2">
                        <Link
                          href={link.href}
                          className={cn(
                            'flex-1 rounded-full px-4 py-3 font-body text-[0.98rem] font-medium tracking-[-0.03em] transition-colors duration-200',
                            isActive ? 'text-brand-sunrise' : 'text-white',
                          )}
                        >
                          {link.label}
                        </Link>

                        {hasSubmenu && (
                          <button
                            type="button"
                            onClick={() => setOpenMobileMenu(current => (current === link.href ? null : link.href))}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white"
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
                            <ul className="space-y-1 px-2 pb-2 pt-1">
                              {link.submenu.map(item => {
                                const isSubmenuActive = isRouteActive(pathname, item.href)

                                return (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      className={cn(
                                        'block rounded-[20px] px-4 py-3 transition-colors duration-200',
                                        isSubmenuActive
                                          ? 'text-brand-sunrise'
                                          : 'text-white/88 hover:text-brand-sunrise',
                                      )}
                                    >
                                      <span className="block font-body text-[0.95rem] font-medium leading-none">
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
                    </li>
                  )
                })}
              </ul>

              {ctaLabel && ctaHref && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={panelTransition}
                  className="mt-4 space-y-2"
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
    </header>
  )
}
