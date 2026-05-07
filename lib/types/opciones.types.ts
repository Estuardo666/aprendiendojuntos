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
}
