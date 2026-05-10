'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/organisms/Navbar'
import type { NavLink } from '@/components/organisms/Navbar'

interface ConditionalNavbarProps {
  links: NavLink[]
  ctaLabel?: string
  ctaHref?: string
  ctaLabel2?: string
  ctaHref2?: string
}

export function ConditionalNavbar({ links, ctaLabel, ctaHref, ctaLabel2, ctaHref2 }: ConditionalNavbarProps) {
  const pathname = usePathname()
  const isLanding = pathname.startsWith('/landing/')

  if (isLanding) return null

  return (
    <Navbar
      links={links}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
      ctaLabel2={ctaLabel2}
      ctaHref2={ctaHref2}
    />
  )
}
