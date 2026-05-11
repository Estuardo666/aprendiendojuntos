export interface NavbarSubmenuItem {
  label: string
  href: string
  description?: string
}

export interface NavLink {
  label: string
  href: string
  submenu?: NavbarSubmenuItem[]
}

export interface NavbarProps {
  links: NavLink[]
  logoUrl?: string | null
  logoAlt?: string
  logoWidth?: number
  logoHeight?: number
  ctaLabel?: string
  ctaHref?: string
  ctaLabel2?: string
  ctaHref2?: string
}
