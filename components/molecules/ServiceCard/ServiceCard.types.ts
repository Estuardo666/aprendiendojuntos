import type { BadgeProps } from '@/components/atoms/Badge';
import type { IconName } from '@/lib/icons';

export interface ServiceCardProps {
  titulo: string;
  descripcionCorta: string;
  /** Nombre del icono de lib/icons (ej. 'BrainIcon') o emoji string (ej. '🧠') */
  icono: IconName | string;
  /** Categoría que mapea directamente a variante de Badge */
  categoria: BadgeProps['variant'];
  slug: string;
  destacado?: boolean;
  className?: string;
}
