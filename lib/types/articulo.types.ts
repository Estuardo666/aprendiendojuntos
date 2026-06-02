export interface WPArticuloFields {
  subtitulo?: string | null
  archivoDescarga?: {
    node?: {
      mediaItemUrl: string
      filePath?: string | null
      mimeType?: string | null
      title?: string | null
      fileSize?: number | null
    } | null
  } | null
}

export interface WPArticulo {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content?: string | null
  date: string
  featuredImage?: {
    node?: {
      sourceUrl: string
      altText?: string | null
    } | null
  } | null
  articuloFields?: WPArticuloFields | null
  categories?: {
    nodes?: {
      name: string
      slug: string
    }[]
  } | null
}

export interface WPArticuloResumen {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  date: string
  featuredImage?: {
    node?: {
      sourceUrl: string
      altText?: string | null
    } | null
  } | null
  articuloFields?: {
    subtitulo?: string | null
  } | null
  categories?: {
    nodes?: {
      name: string
      slug: string
    }[]
  } | null
}
