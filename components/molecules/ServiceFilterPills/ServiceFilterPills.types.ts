export interface ServiceFilter {
  slug: string
  label: string
}

export interface ServiceFilterPillsProps {
  filters: ServiceFilter[]
  activeFilter: string | null
  onSelect: (slug: string | null) => void
  allLabel?: string
}
