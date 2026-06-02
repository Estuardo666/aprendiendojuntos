export interface ArticuloGridItem {
  id: string
  titulo: string
  slug: string
  excerpt: string
  imagenSrc?: string
  imagenAlt?: string
  categoria?: string | null
  categoriaSlug?: string | null
  fecha: string
}

export interface ArticulosTemplateProps {
  hero: {
    pretitulo: string
    titulo: string
    descripcion?: string
    imagenSrc?: string
  }
  items: ArticuloGridItem[]
}
