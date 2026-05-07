export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingVariant = 'display' | 'h1' | 'h2' | 'h3';
export type HeadingColor = 'azul' | 'naranja' | 'celeste' | 'blanco';

export interface HeadingProps {
  /** Etiqueta HTML semántica */
  as: HeadingTag;
  /** Estilo visual independiente de la etiqueta semántica */
  variant?: HeadingVariant;
  color?: HeadingColor;
  /** Activa animación de entrada blur + offset + rotate */
  animate?: boolean;
  /** Delay en milisegundos para stagger entre headings */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}
