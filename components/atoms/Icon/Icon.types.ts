import type { IconName } from '@/lib/icons';

export type IconSize = 'sm' | 'md' | 'lg';
export type IconColor = 'azul' | 'naranja' | 'celeste' | 'amarilloInicio' | 'blanco' | 'inherit';

export interface IconProps {
  /** Nombre del icono, debe ser clave de lib/icons.ts */
  name: IconName;
  /** sm = 16px | md = 24px | lg = 36px */
  size?: IconSize;
  color?: IconColor;
  className?: string;
}
