import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import type { AvatarProps } from './Avatar.types';

// Tamaños en clases Tailwind y en px para el componente Image
const sizeClasses = {
  sm: 'w-8 h-8 text-[10px]',
  md: 'w-12 h-12 text-xs',
  lg: 'w-16 h-16 text-sm',
};

const sizePx = {
  sm: 32,
  md: 48,
  lg: 64,
};

export function Avatar({ src, alt, initials, size = 'md', className }: AvatarProps) {
  const containerClasses = cn(
    'rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center',
    'bg-brand-azul',
    sizeClasses[size],
    className,
  );

  // Con imagen: usar next/image optimizado
  if (src) {
    return (
      <div className={containerClasses}>
        <Image
          src={src}
          alt={alt}
          width={sizePx[size]}
          height={sizePx[size]}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  // Sin imagen: mostrar iniciales como fallback
  return (
    <div className={containerClasses} role="img" aria-label={alt}>
      <span className="font-heading font-bold text-white uppercase select-none">
        {initials}
      </span>
    </div>
  );
}
