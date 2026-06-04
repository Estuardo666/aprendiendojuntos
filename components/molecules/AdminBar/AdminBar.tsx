'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { adminBarStore } from '@/lib/admin-bar-store'

const WP_URL = process.env.NEXT_PUBLIC_WP_URL ?? ''
const STORAGE_KEY = 'aj_admin_token'

interface AdminBarUser {
  name: string
  roles: string[]
}

interface AdminBarData {
  authenticated: boolean
  user?: AdminBarUser
  adminUrl?: string
}

interface AdminBarItem {
  label: string
  href: string
}

export function AdminBar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState<AdminBarUser | null>(null)
  const [editUrl, setEditUrl] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState<string | null>(null)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [loginError, setLoginError] = useState(false)
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tokenInputRef = useRef<HTMLInputElement>(null)

  const checkAuth = useCallback(async () => {
    try {
      // Try cookie-based auth first (production)
      const res = await fetch('/api/admin-bar/auth', {
        cache: 'no-store',
      })

      if (res.ok) {
        const data: AdminBarData = await res.json()
        if (data.authenticated && data.user) {
          setUser(data.user)
          setIsVisible(true)
          adminBarStore.setVisible(true)
          return
        }
      }
    } catch {
      // Cookie auth failed, try token fallback
    }

    // Fallback: try token from localStorage (development)
    const token = localStorage.getItem(STORAGE_KEY)
    if (token) {
      try {
        const res = await fetch('/api/admin-bar/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
          cache: 'no-store',
        })

        if (res.ok) {
          const data: AdminBarData = await res.json()
          if (data.authenticated && data.user) {
            setUser(data.user)
            setIsVisible(true)
            adminBarStore.setVisible(true)
            return
          }
        }
      } catch {
        // Token auth failed
      }
    }
  }, [])

  const handleLogin = async () => {
    const token = tokenInputRef.current?.value?.trim()
    if (!token) return

    setLoginError(false)

    try {
      const res = await fetch('/api/admin-bar/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
        cache: 'no-store',
      })

      if (!res.ok) {
        setLoginError(true)
        return
      }

      const data: AdminBarData = await res.json()
      if (data.authenticated && data.user) {
        localStorage.setItem(STORAGE_KEY, token)
        setUser(data.user)
        setIsVisible(true)
        setShowLogin(false)
        adminBarStore.setVisible(true)
      } else {
        setLoginError(true)
      }
    } catch {
      setLoginError(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsVisible(false)
    setUser(null)
    adminBarStore.setVisible(false)
  }

  const fetchEditLink = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin-bar?path=${encodeURIComponent(pathname)}`, {
        cache: 'no-store',
      })

      if (!res.ok) return

      const data = await res.json()
      if (data.editUrl) {
        setEditUrl(data.editUrl)
        setEditLabel(data.editLabel ?? 'Editar')
      } else {
        setEditUrl(null)
        setEditLabel(null)
      }
    } catch {
      setEditUrl(null)
      setEditLabel(null)
    }
  }, [pathname])

  useEffect(() => {
    checkAuth().finally(() => setIsReady(true))
  }, [checkAuth])

  useEffect(() => {
    if (isVisible) {
      fetchEditLink()
    }
  }, [isVisible, pathname, fetchEditLink])

  useEffect(() => {
    setOpenMenu(null)
  }, [pathname])

  const handleMenuEnter = (label: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current)
      menuTimeoutRef.current = null
    }
    setOpenMenu(label)
  }

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null)
    }, 150)
  }

  if (!isReady) return null

  // Show login button if not authenticated
  if (!isVisible && !showLogin) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => {
          setShowLogin(true)
          setTimeout(() => tokenInputRef.current?.focus(), 100)
        }}
        className="fixed bottom-4 right-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full bg-brand-azul text-white shadow-lg transition-colors hover:bg-brand-azul/80"
        title="Admin"
      >
        <DashboardIcon />
      </motion.button>
    )
  }

  // Show login form (development fallback)
  if (showLogin && !isVisible) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-[100] w-72 rounded-xl border border-brand-azul/20 bg-white p-4 shadow-xl font-body"
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-azul">Admin</span>
          <button
            type="button"
            onClick={() => setShowLogin(false)}
            className="text-brand-texto/40 hover:text-brand-texto"
          >
            <CloseIcon />
          </button>
        </div>
        <p className="mb-2 text-xs text-brand-texto/60">
          Ingresa el token de acceso
        </p>
        <input
          ref={tokenInputRef}
          type="password"
          placeholder="Token de acceso"
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          className="mb-2 w-full rounded-lg border border-brand-azul/20 px-3 py-2 text-sm text-brand-texto placeholder:text-brand-texto/40 focus:border-brand-celeste focus:outline-none"
        />
        {loginError && (
          <p className="mb-2 text-xs text-red-500">Token inválido</p>
        )}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full rounded-lg bg-brand-azul px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-azul/90"
        >
          Acceder
        </button>
      </motion.div>
    )
  }

  const addItems: AdminBarItem[] = [
    { label: 'Medio', href: `${WP_URL}/wp-admin/media-new.php` },
    { label: 'Servicio', href: `${WP_URL}/wp-admin/post-new.php?post_type=aj_servicio` },
    { label: 'Programa', href: `${WP_URL}/wp-admin/post-new.php?post_type=aj_programa` },
    { label: 'Testimonio', href: `${WP_URL}/wp-admin/post-new.php?post_type=aj_testimonio` },
    { label: 'Pregunta Frecuente', href: `${WP_URL}/wp-admin/post-new.php?post_type=aj_faq` },
    { label: 'Miembro del Equipo', href: `${WP_URL}/wp-admin/post-new.php?post_type=aj_miembro_equipo` },
    { label: 'Landing Page', href: `${WP_URL}/wp-admin/post-new.php?post_type=aj_landing_page` },
    { label: 'Recurso', href: `${WP_URL}/wp-admin/post-new.php?post_type=aj_recurso` },
    { label: 'Artículo', href: `${WP_URL}/wp-admin/post-new.php?post_type=aj_articulo` },
  ]

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-x-0 top-0 z-[100] font-body"
    >
      <div className="flex h-9 items-center bg-brand-azul px-3 text-xs text-white shadow-lg md:px-4 md:text-sm">
        {/* Logo / Dashboard Link */}
        <Link
          href={`${WP_URL}/wp-admin/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 font-heading font-bold text-brand-naranja transition-colors hover:bg-white/10"
        >
          <DashboardIcon />
          <span className="hidden sm:inline">Escritorio</span>
        </Link>

        {/* Separator */}
        <div className="mx-2 h-4 w-px bg-white/20" />

        {/* Add New Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => handleMenuEnter('add')}
          onMouseLeave={handleMenuLeave}
        >
          <button
            type="button"
            className="flex items-center gap-1 rounded-md px-2 py-1 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
          >
            <PlusIcon />
            <span>Añadir</span>
            <ChevronDownIcon />
          </button>

          <AnimatePresence>
            {openMenu === 'add' && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-full z-50 mt-1 min-w-[200px] overflow-hidden rounded-lg border border-brand-azul/20 bg-white py-1 shadow-xl"
              >
                {addItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2 text-sm text-brand-texto transition-colors hover:bg-brand-azul/5 hover:text-brand-azul"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Edit Current Page */}
        {editUrl && (
          <>
            <div className="mx-2 h-4 w-px bg-white/20" />
            <Link
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md px-2 py-1 text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            >
              <EditIcon />
              <span className="hidden sm:inline">{editLabel}</span>
              <span className="sm:hidden">Editar</span>
            </Link>
          </>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* User Info + Logout */}
        {user && (
          <div className="flex items-center gap-2">
            <span className="hidden text-white/70 md:inline">{user.name}</span>
            <div className="h-5 w-5 rounded-full bg-brand-naranja/80" />
            <button
              type="button"
              onClick={handleLogout}
              className="ml-1 rounded-md px-1.5 py-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              title="Cerrar sesión admin bar"
            >
              <LogoutIcon />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function DashboardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}
