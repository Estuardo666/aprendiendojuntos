import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { cn } from '@/lib/utils/cn';
import type { ValueItemProps } from './ValueItem.types';

export function ValueItem({
  icono,
  titulo,
  descripcion,
  orientation = 'vertical',
  className,
}: ValueItemProps) {
  // Layout vertical: centrado, ícono celeste sobre fondo celeste/10
  if (orientation === 'vertical') {
    return (
      <div className={cn('text-center', className)}>
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-celeste/10 mb-4">
          <Icon name={icono} size="md" color="celeste" />
        </span>
        <Heading as="h4" variant="h3" className="mb-2">
          {titulo}
        </Heading>
        <Text variant="small" color="muted">
          {descripcion}
        </Text>
      </div>
    );
  }

  // Layout horizontal: ícono naranja a la izquierda, texto a la derecha
  return (
    <div className={cn('flex gap-4 items-start', className)}>
      <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-naranja/10 flex-shrink-0">
        <Icon name={icono} size="md" color="naranja" />
      </span>
      <div>
        <Heading as="h4" variant="h3" className="mb-1">
          {titulo}
        </Heading>
        <Text variant="small" color="muted">
          {descripcion}
        </Text>
      </div>
    </div>
  );
}
