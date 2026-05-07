import { StarRating } from '@/components/atoms/StarRating';
import { Avatar } from '@/components/atoms/Avatar';
import { Text } from '@/components/atoms/Text';
import { Divider } from '@/components/atoms/Divider';
import { cn } from '@/lib/utils/cn';
import type { TestimonialCardProps } from './TestimonialCard.types';

/** Extrae iniciales de un nombre completo (máx. 2 caracteres) */
function iniciales(nombre: string): string {
  return nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialCard({
  autor,
  cargo,
  texto,
  calificacion,
  avatarSrc,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        'bg-brand-blanco rounded-2xl p-6 border border-gray-100 shadow-sm',
        'flex flex-col',
        className,
      )}
    >
      {/* Estrellas de calificación */}
      <StarRating value={calificacion} />

      {/* Texto del testimonio en cursiva */}
      <Text variant="body" className="mt-3 italic flex-1">
        &ldquo;{texto}&rdquo;
      </Text>

      {/* Separador decorativo naranja */}
      <Divider color="naranja" className="my-4" />

      {/* Autor: avatar + nombre y cargo */}
      <div className="flex items-center gap-3">
        <Avatar
          src={avatarSrc}
          alt={autor}
          initials={iniciales(autor)}
          size="sm"
        />
        <div>
          <Text variant="small" color="default">
            {autor}
          </Text>
          <Text variant="caption" color="muted">
            {cargo}
          </Text>
        </div>
      </div>
    </article>
  );
}
