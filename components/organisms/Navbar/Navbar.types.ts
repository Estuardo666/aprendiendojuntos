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
  ctaLabel?: string
  ctaHref?: string
  ctaLabel2?: string
  ctaHref2?: string
}
