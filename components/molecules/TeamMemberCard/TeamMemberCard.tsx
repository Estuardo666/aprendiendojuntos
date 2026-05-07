import { Avatar } from '@/components/atoms/Avatar';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { Divider } from '@/components/atoms/Divider';
import { Tag } from '@/components/atoms/Tag';
import { cn } from '@/lib/utils/cn';
import type { TeamMemberCardProps } from './TeamMemberCard.types';

/** Extrae iniciales de un nombre completo (máx. 2 caracteres) */
function iniciales(nombre: string): string {
  return nombre
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function TeamMemberCard({
  nombre,
  cargo,
  especialidades,
  descripcionBio,
  fotoSrc,
  fotoAlt,
  className,
}: TeamMemberCardProps) {
  return (
    <article
      className={cn(
        'bg-brand-blanco rounded-2xl p-6 text-center border border-gray-100',
        'hover:shadow-md transition-shadow duration-300',
        'flex flex-col items-center',
        className,
      )}
    >
      {/* Foto o iniciales */}
      <Avatar
        src={fotoSrc}
        alt={fotoAlt ?? nombre}
        initials={iniciales(nombre)}
        size="lg"
        className="mx-auto"
      />

      {/* Nombre del miembro */}
      <Heading as="h3" variant="h3" className="mt-4">
        {nombre}
      </Heading>

      {/* Cargo */}
      <Text variant="small" color="muted">
        {cargo}
      </Text>

      {/* Separador naranja */}
      <Divider color="naranja" className="my-3 w-full" />

      {/* Bio breve */}
      <Text variant="small" color="muted">
        {descripcionBio}
      </Text>

      {/* Especialidades como Tags */}
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {especialidades.map((especialidad) => (
          <Tag key={especialidad} label={especialidad} variant="default" />
        ))}
      </div>
    </article>
  );
}
