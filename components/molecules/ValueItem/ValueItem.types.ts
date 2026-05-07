import type { IconName } from '@/lib/icons';

export type ValueItemOrientation = 'vertical' | 'horizontal';

export interface ValueItemProps {
  icono: IconName;
  titulo: string;
  descripcion: string;
  /** Layout de presentación. Default: 'vertical' */
  orientation?: ValueItemOrientation;
  className?: string;
}
