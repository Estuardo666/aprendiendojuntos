export interface WPFaqFields {
  pregunta: string;
  respuesta: string;
  orden: number | null;
}

export interface WPFaq {
  id: string;
  faqFields: WPFaqFields;
}
