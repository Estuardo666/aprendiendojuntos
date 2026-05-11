export interface WPImagenHeaderNode {
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    width?: number;
    height?: number;
  } | null;
}

export interface WPEncabezadoFields {
  logoHeader?: {
    node?: WPImagenHeaderNode | null;
  } | null;
  boton1Texto: string | null;
  boton1Url: string | null;
  boton2Texto: string | null;
  boton2Url: string | null;
}

export interface WPOpcionesGlobales {
  heroTitulo: string;
  heroSubtitulo: string | null;
  ctaTexto: string;
  ctaWhatsappNumero: string;
  contactoTelefono: string;
  contactoDireccion?: string | null;
  contactoMapsUrl: string | null;
  redesInstagram: string | null;
  redesFacebook: string | null;
  mensajeBienvenida: string | null;
}

export interface WPOpciones {
  opcionesAprendiendoJuntos: {
    opcionesGlobales: WPOpcionesGlobales;
  };
  paginaEncabezado?: {
    encabezadoFields?: WPEncabezadoFields | null;
  } | null;
}
