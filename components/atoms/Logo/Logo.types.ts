export type LogoVariant = 'color' | 'blanco';
export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoProps {
  /** 'color' usa los tokens de marca; 'blanco' para fondos oscuros */
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
}
