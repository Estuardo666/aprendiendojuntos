import type { ServiceCardProps } from '@/components/molecules/ServiceCard';

export interface ServicesGridProps {
  titulo: string;
  subtitulo?: string;
  servicios: ServiceCardProps[];
  columnas?: 2 | 3 | 4;
  className?: string;
}
