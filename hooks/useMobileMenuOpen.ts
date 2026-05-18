'use client'

import { useSyncExternalStore } from 'react'
import { mobileMenuStore } from '@/lib/mobile-menu-store'

export function useMobileMenuOpen(): boolean {
  return useSyncExternalStore(
    mobileMenuStore.subscribe,
    mobileMenuStore.getSnapshot,
    mobileMenuStore.getServerSnapshot,
  )
}
