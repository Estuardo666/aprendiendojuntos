export interface WPProgramaFields {
  descripcion: string;
  iconoEmoji: string;
  edadObjetivo: string | null;
  descripcionHeroTexto?: string | null;
  modalidad?: string[] | null;
  duracionSesion?: string | null;
  frecuencia?: string | null;
  fraseDestacada?: string | null;
  beneficios: Array<{ beneficio: string }> | null;
  ctaPretitulo?: string | null;
  ctaTitulo?: string | null;
  descripcionCta?: string | null;
  ctaBotonTexto?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  cta2Label?: string | null;
  cta2Href?: string | null;
  logoPrograma?: {
    node: {
      sourceUrl: string;
      altText?: string | null;
    };
  } | null;
  imagenDestacada?: {
    node: {
      sourceUrl: string;
      altText?: string | null;
    };
  } | null;
  galeria?: Array<{
    imagen: {
      node: {
        sourceUrl: string;
        altText?: string | null;
      };
    };
  }> | null;
  tags?: {
    nodes: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  } | null;
}

export interface WPPrograma {
  id: string;
  title: string;
  slug: string;
  programaFields: WPProgramaFields;
}
