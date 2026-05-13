export interface WPHomeImage {
  sourceUrl: string
  altText?: string | null
  mediaItemUrl?: string | null
}

export interface WPHomeMediaEdge {
  node?: WPHomeImage | null
}

export interface WPHomeKeyword {
  texto?: string | null
  emoji?: string | null
}

export interface WPHomeProcessStep {
  numero?: number | null
  titulo?: string | null
  descripcion?: string | null
  imagen?: WPHomeMediaEdge | null
}

export interface WPHomeDiferencialItem {
  titulo?: string | null
  descripcion?: string | null
  imagen?: WPHomeMediaEdge | null
}

export interface WPHomeFields {
  imagenDestacada?: WPHomeMediaEdge | null
  metaTitle?: string | null
  metaDescription?: string | null
  heroPretitulo?: string | null
  heroTitulo: string
  heroSubtitulo?: string | null
  heroVideo?: WPHomeMediaEdge | null
  heroCtaPrimarioLabel?: string | null
  heroCtaPrimarioHref?: string | null
  heroCtaSecundarioLabel?: string | null
  heroCtaSecundarioHref?: string | null
  keywords?: WPHomeKeyword[] | null
  sobreImagen?: WPHomeMediaEdge | null
  sobrePretitulo?: string | null
  sobreTitulo?: string | null
  sobreDescripcion?: string | null
  sobreBotonLabel?: string | null
  serviciosPretitulo?: string | null
  serviciosTitulo?: string | null
  serviciosParrafo?: string | null
  serviciosBotonLabel?: string | null
  serviciosBotonHref?: string | null
  programasPretitulo?: string | null
  programasTitulo?: string | null
  programasParrafo?: string | null
  programasBotonLabel?: string | null
  programasBotonHref?: string | null
  procesoPretitulo?: string | null
  procesoTitulo?: string | null
  procesoParrafo?: string | null
  procesoCtaLabel?: string | null
  procesoCtaHref?: string | null
  procesoPasos?: WPHomeProcessStep[] | null
  diferencialesPretitulo?: string | null
  diferencialesTitulo?: string | null
  diferencialesParrafo?: string | null
  diferencialesItems?: WPHomeDiferencialItem[] | null
  testimoniosPretitulo?: string | null
  testimoniosTitulo?: string | null
  testimoniosParrafo?: string | null
  testimoniosBotonLabel?: string | null
  testimoniosBotonHref?: string | null
  faqsPretitulo?: string | null
  faqsTitulo?: string | null
  faqsParrafo?: string | null
  faqsCtaLabel?: string | null
  faqsCtaHref?: string | null
  ctaPretitulo?: string | null
  ctaTitulo?: string | null
  ctaCuerpo?: string | null
  ctaBotonTexto?: string | null
  ctaBotonUrl?: string | null
  ctaImagen?: WPHomeMediaEdge | null
}

export interface WPHomeOptions {
  paginaHome?: {
    homeFields?: WPHomeFields | null
  } | null
}
