// Imagen WP reutilizable
export interface WPImagen {
  sourceUrl: string;
  mediaItemUrl?: string;
  altText: string;
}

// Valor institucional
export interface WPValor {
  titulo: string;
  descripcion: string;
  iconoEmoji?: string;
}

// Punto diferencial
export interface WPDiferencial {
  titulo: string;
  descripcion: string;
}

// Imagen en repeater
export interface WPImagenItem {
  imagen: WPImagen;
}

// Campos ACF de la página Nosotros
export interface WPPaginaNosotrosFields {
  // Imagen destacada general
  imagenDestacada?: WPImagen;

  // Hero section
  heroVideo?: string;
  heroPretitulo?: string;
  heroTitulo: string;
  heroSubtitulo?: string;
  heroImagenes?: WPImagenItem[];

  // Historia section
  historiaPretitulo?: string;
  historiaTitulo: string;
  historiaCuerpo: string;
  historiaImagenes?: WPImagenItem[];

  // Propósito, Misión y Visión
  propositoCuerpo: string;
  misionCuerpo: string;
  visionCuerpo: string;

  // Valores section
  valoresPretitulo?: string;
  valoresTitulo: string;
  valoresIntro?: string;
  valores: WPValor[];

  // Diferencial section
  diferencialPretitulo?: string;
  diferencialTitulo: string;
  diferencialItems: WPDiferencial[];

  // CTA section
  ctaPretitulo?: string;
  ctaTitulo: string;
  ctaCuerpo?: string;
  ctaBotonTexto: string;
  ctaBotonUrl?: string;
  ctaImagen?: WPImagen;
}

// Tipo principal para la respuesta GraphQL
export interface WPPaginaNosotros {
  paginaNosotros: {
    nosotrosFields: WPPaginaNosotrosFields;
  };
}
