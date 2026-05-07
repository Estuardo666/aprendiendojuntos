import type { IconName } from '@/lib/icons';

export interface ProgramCardProps {
  titulo: string;
  descripcion: string;
  /** Rango de edad objetivo del programa, ej. "6-12 años" */
  edadObjetivo: string;
  /** Lista de beneficios del programa. Se muestran máx. 4. */
  beneficios: string[];
  slug: string;
  icono?: IconName;
  className?: string;
}
