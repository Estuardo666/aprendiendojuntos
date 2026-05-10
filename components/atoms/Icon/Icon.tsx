import { icons } from '@/lib/icons';
import { cn } from '@/lib/utils/cn';
import type { IconProps } from './Icon.types';

// Clases de tamaño: 16px | 24px | 36px
const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-9 h-9',
};

// Clases de color usando tokens de marca
const colorClasses = {
  azul: 'text-brand-azul',
  naranja: 'text-brand-naranja',
  celeste: 'text-brand-celeste',
  amarilloInicio: 'text-brand-amarilloInicio',
  blanco: 'text-brand-blanco',
  inherit: '',
};

export function Icon({ name, size = 'md', color = 'inherit', className }: IconProps) {
  const IconComponent = icons[name];

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center [&_svg]:h-full [&_svg]:w-full [&_svg]:stroke-current',
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
      aria-hidden="true"
    >
      <IconComponent />
    </span>
  );
}
