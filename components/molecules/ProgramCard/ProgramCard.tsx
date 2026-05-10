import { Icon } from '@/components/atoms/Icon';
import { Tag } from '@/components/atoms/Tag';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils/cn';
import type { ProgramCardProps } from './ProgramCard.types';

export function ProgramCard({
  titulo,
  descripcion,
  edadObjetivo,
  beneficios,
  slug,
  icono,
  className,
}: ProgramCardProps) {
  return (
    <article
      className={cn(
        // Fondo crema; en hover pasa a blanco con sombra
        'bg-brand-crema rounded-2xl p-6 border border-brand-crema',
        'hover:bg-brand-blanco hover:shadow-md transition-all duration-300',
        'flex flex-col',
        className,
      )}
    >
      {/* Ícono opcional en naranja */}
      {icono && <Icon name={icono} size="lg" color="naranja" />}

      {/* Tag de edad objetivo */}
      <Tag label={edadObjetivo} variant="destacado" className="mb-3 mt-3 self-start" />

      {/* Título del programa */}
      <Heading as="h3" variant="h3">
        {titulo}
      </Heading>

      {/* Descripción */}
      <Text variant="small" color="muted" className="mt-2">
        {descripcion}
      </Text>

      {/* Lista de beneficios: máximo 4 */}
      <ul className="mt-4 space-y-1">
        {beneficios.slice(0, 4).map((beneficio) => (
          <li key={beneficio} className="flex items-center gap-2 text-sm font-body text-brand-azul">
            <Icon name="CheckIcon" size="sm" color="amarilloInicio" />
            {beneficio}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant="secondary"
        size="sm"
        href={`/programas/${slug}`}
        className="mt-5 self-start"
      >
        Conocer programa
      </Button>
    </article>
  );
}
