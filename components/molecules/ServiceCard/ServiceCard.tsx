import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/atoms/Badge';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils/cn';
import { icons } from '@/lib/icons';
import type { IconName } from '@/lib/icons';
import type { ServiceCardProps } from './ServiceCard.types';

// Verifica si el string es un nombre de icono válido del sistema de diseño
const isIconName = (value: string): value is IconName => value in icons;

export function ServiceCard({
  titulo,
  descripcionCorta,
  icono,
  categoria,
  slug,
  destacado = false,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        // Base de card
        'group bg-brand-blanco rounded-2xl p-6 border border-gray-100',
        'flex flex-col',
        // Hover: sombra + ligero desplazamiento hacia arriba
        'hover:shadow-md transition-all duration-300 hover:-translate-y-0.5',
        // Borde izquierdo si está destacado
        destacado && 'border-l-4 border-l-brand-naranja',
        className,
      )}
    >
      {/* Fila superior: ícono o emoji + badge a la derecha */}
      <div className="flex items-center">
        {isIconName(icono) ? (
          <Icon name={icono} size="md" color="celeste" />
        ) : (
          <span className="text-2xl leading-none" aria-hidden="true">{icono}</span>
        )}
        <span className="ml-auto">
          <Badge variant={categoria} />
        </span>
      </div>

      {/* Título */}
      <Heading as="h3" variant="h3" className="mt-4 mb-2">
        {titulo}
      </Heading>

      {/* Descripción corta */}
      <Text variant="small" color="muted" className="flex-1">
        {descripcionCorta}
      </Text>

      {/* CTA */}
      <Button variant="ghost" size="sm" href={`/servicios/${slug}`} className="mt-4 self-start">
        Ver más →
      </Button>
    </article>
  );
}
