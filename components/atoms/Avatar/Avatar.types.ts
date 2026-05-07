export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  /** URL de imagen. Si está ausente, muestra iniciales. */
  src?: string;
  /** Texto alternativo para la imagen */
  alt: string;
  /** Texto de fallback cuando no hay imagen (ej. "MG") */
  initials: string;
  size?: AvatarSize;
  className?: string;
}
