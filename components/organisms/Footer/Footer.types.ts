export interface NavLink {
  label: string
  href: string
}

export interface ContactItem {
  type: 'telefono' | 'direccion' | 'whatsapp'
  label: string
  value: string
  href?: string
}

export interface SocialLinkItem {
  platform: 'instagram' | 'facebook'
  href: string
}

export interface FooterProps {
  links: NavLink[]
  contactItems: ContactItem[]
  socialLinks: SocialLinkItem[]
}
