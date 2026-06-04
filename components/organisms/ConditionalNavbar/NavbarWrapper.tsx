'use client'

import { usePathname } from 'next/navigation'
import { useSyncExternalStore } from 'react'
import { adminBarStore } from '@/lib/admin-bar-store'

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLanding = pathname.startsWith('/landing/')
  const isAdminBarVisible = useSyncExternalStore(
    adminBarStore.subscribe,
    adminBarStore.getSnapshot,
    adminBarStore.getServerSnapshot,
  )

  if (isLanding) return <>{children}</>

  return (
    <div className={isAdminBarVisible ? 'pt-[52px] md:pt-[52px]' : 'pt-14 md:pt-16'}>
      {children}
    </div>
  )
}
