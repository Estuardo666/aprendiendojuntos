import { cn } from '@/lib/utils/cn';
import type { LogoProps } from './Logo.types';

// Tamaños del logotipo completo (ícono + texto)
const sizeClasses = {
  sm: 'gap-2',
  md: 'gap-2.5',
  lg: 'gap-3',
};

const iconSizeClasses = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-12 h-12',
};

const textSizeClasses = {
  sm: 'text-[13px]',
  md: 'text-[16px]',
  lg: 'text-[20px]',
};

export function Logo({ variant = 'color', size = 'md', className }: LogoProps) {
  const isBlanco = variant === 'blanco';

  // Colores para el SVG según variante
  const primaryColor = isBlanco ? '#FFFFFF' : '#0056A4';   // azul / blanco
  const accentColor = isBlanco ? '#FFFFFF' : '#FAB600';    // naranja / blanco
  const textColor = isBlanco ? 'text-white' : 'text-brand-azul';

  return (
    <div className={cn('inline-flex items-center', sizeClasses[size], className)}>
      {/*
       * Ícono SVG — Placeholder: forma abstracta de libro + paloma.
       * Reemplazar con el SVG final del logo cuando esté disponible.
       */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('flex-shrink-0', iconSizeClasses[size])}
        aria-hidden="true"
      >
        {/* Libro abierto */}
        <path
          d="M20 8 C14 8 8 10 8 14 L8 32 C8 32 14 30 20 30 C26 30 32 32 32 32 L32 14 C32 10 26 8 20 8 Z"
          fill={primaryColor}
          opacity="0.15"
        />
        <path
          d="M20 8 L20 30 M8 14 C14 12 18 13 20 14 C22 13 26 12 32 14"
          stroke={primaryColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Paloma estilizada (trazo superior) */}
        <path
          d="M24 6 C26 4 30 4 31 6 C29 6 27 7 26 9 C25 8 24 7 24 6 Z"
          fill={accentColor}
        />
        <path
          d="M26 10 C27 12 26 14 24 15"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Nombre de la marca */}
      <span
        className={cn(
          'font-heading font-black tracking-tight leading-none',
          textSizeClasses[size],
          textColor,
        )}
      >
        APRENDIENDO{' '}
        <span className={isBlanco ? 'text-white opacity-80' : 'text-brand-celeste'}>JUNTOS</span>
      </span>
    </div>
  );
}
