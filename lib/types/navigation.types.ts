export interface NavSubitem {
  id: string
  label: string
  href: string
  sourceId: number
  visible: boolean
  order: number
}

export interface NavItem {
  id: string
  type: 'static' | 'dynamic' | 'custom'
  label: string
  href: string
  target?: '_blank' | '_self'
  order: number
  visible: boolean
  cpt?: string
  subitems: NavSubitem[]
}
