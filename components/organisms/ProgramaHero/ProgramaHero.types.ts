export interface ProgramaHeroImagen {
  sourceUrl: string
  altText?: string
}

export interface ProgramaHeroProps {
  pretitulo?: string
  /** Logo del programa (imagen custom field del CMS) */
  logoSrc?: string
  logoAlt?: string
  descripcion?: string
  /** Botón 1: amarillo degradado */
  cta1Label?: string
  cta1Href?: string
  /** Botón 2: azul degradado */
  cta2Label?: string
  cta2Href?: string
  /** Imágenes para el carrusel */
  imagenesCarrusel?: ProgramaHeroImagen[]
}
