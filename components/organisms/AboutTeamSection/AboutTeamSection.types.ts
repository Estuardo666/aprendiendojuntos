export interface AboutTeamMember {
  id: string
  nombre: string
  cargo: string
  fotoSrc?: string
  fotoAlt?: string
}

export interface AboutTeamSectionProps {
  pretitulo: string
  titulo: string
  miembros: AboutTeamMember[]
}
