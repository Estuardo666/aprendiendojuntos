export interface AboutDiferencialCard {
  id: string
  titulo: string
  descripcion: string
  imagenSrc?: string
  imagenAlt?: string
}

export interface AboutDiferencialSectionProps {
  pretitulo: string
  titulo: string
  parrafo?: string
  cards: AboutDiferencialCard[]
}
