'use client'

import { usePathname } from 'next/navigation'

export function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLanding = pathname.startsWith('/landing/')

  if (isLanding) return <>{children}</>

  return <div className="pt-14 md:pt-16">{children}</div>
}
