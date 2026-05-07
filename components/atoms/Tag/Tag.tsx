import { cn } from '@/lib/utils/cn';
import type { TagProps } from './Tag.types';

// Estilos por variante: pill pequeño
const variantClasses = {
  default: 'bg-gray-100 text-gray-600',
  destacado: 'bg-[#9accea] text-brand-azul',
};

export function Tag({ label, variant = 'default', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-2.5 py-0.5 text-[11px] font-body font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {label}
    </span>
  );
}
