'use client'

import { usePathname } from 'next/navigation'
import { Footer } from '@/components/organisms/Footer/Footer'
import { PopupImage } from '@/components/organisms/PopupImage/PopupImage'
import { LandingFooter } from '@/components/organisms/LandingFooter'
import type { FooterProps } from '@/components/organisms/Footer/Footer.types'
import type { PopupData } from '@/lib/api/popup'

interface ConditionalFooterProps {
  footerProps: FooterProps
  popupData: PopupData | null
}

export function ConditionalFooter({ footerProps, popupData }: ConditionalFooterProps) {
  const pathname = usePathname()
  const isLanding = pathname.startsWith('/landing/')

  if (isLanding) {
    return <LandingFooter />
  }

  return (
    <>
      <Footer {...footerProps} />
      <PopupImage data={popupData} />
    </>
  )
}
