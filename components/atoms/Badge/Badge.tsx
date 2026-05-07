import { cn } from '@/lib/utils/cn';
import type { BadgeProps, BadgeVariant } from './Badge.types';

const variantClasses: Record<BadgeVariant, string> = {
  neuropsicologia: 'bg-blue-100 text-blue-800',
  psicopedagogia: 'bg-yellow-100 text-yellow-800',
  lenguaje: 'bg-green-100 text-green-800',
  sensorial: 'bg-purple-100 text-purple-800',
  default: 'bg-gray-100 text-gray-700',
};

const variantLabels: Record<BadgeVariant, string> = {
  neuropsicologia: 'Neuropsicología',
  psicopedagogia: 'Psicopedagogía',
  lenguaje: 'Lenguaje',
  sensorial: 'Sensorial',
  default: 'General',
};

export function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-3 py-1 text-[11px] font-body font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {variantLabels[variant]}
    </span>
  );
}
