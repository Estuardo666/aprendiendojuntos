import { ServiceCard } from '@/components/molecules/ServiceCard';
import { cn } from '@/lib/utils/cn';
import type { ServicesGridProps } from './ServicesGrid.types';

const columnClasses: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export function ServicesGrid({
  titulo,
  subtitulo,
  servicios,
  columnas = 3,
  className,
}: ServicesGridProps) {
  return (
    <section className={cn('py-16 md:py-24 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-h2 font-heading text-brand-azul text-center mb-4">{titulo}</h2>
        {subtitulo && (
          <p className="text-lead font-body text-gray-600 text-center mb-12">{subtitulo}</p>
        )}
        <ul className={cn('grid gap-6', columnClasses[columnas])}>
          {servicios.map((servicio) => (
            <li key={servicio.slug}>
              <ServiceCard {...servicio} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
