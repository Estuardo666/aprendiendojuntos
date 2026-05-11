export interface NavLink {
  label: string
  href: string
}

export interface ContactItem {
  type: 'telefono' | 'direccion' | 'whatsapp' | 'email'
  label: string
  value: string
  href?: string
}

export interface SocialLinkItem {
  platform: 'instagram' | 'facebook' | 'tiktok'
  href: string
}

export interface FooterProps {
  logoUrl?: string | null
  logoAlt?: string
  description?: string
  links: NavLink[]
  contactItems: ContactItem[]
  socialLinks: SocialLinkItem[]
}
