import { cn } from '@/lib/utils/cn';
import type { TextProps } from './Text.types';

// Escala tipográfica del cuerpo de texto
const variantClasses = {
  lead: 'text-[1.15rem] leading-[1.65] font-body',
  body: 'text-[1rem] leading-[1.7] font-body',
  small: 'text-[0.875rem] leading-[1.5] font-body',
  caption: 'text-[0.75rem] leading-[1.4] font-body',
};

// Colores de texto del cuerpo basados en el tono editorial global
const colorClasses = {
  default: 'text-brand-texto',
  muted: 'text-brand-texto/55',
  blanco: 'text-brand-blanco',
};

export function Text({
  variant = 'body',
  color = 'default',
  as: Tag = 'p',
  id,
  role,
  className,
  children,
}: TextProps) {
  return (
    <Tag id={id} role={role} className={cn(variantClasses[variant], colorClasses[color], className)}>
      {children}
    </Tag>
  );
}
