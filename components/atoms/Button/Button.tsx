'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@/components/atoms/Icon';
import { cn } from '@/lib/utils/cn';
import type { ButtonProps } from './Button.types';

// Paleta de variantes del botón
const variantClasses = {
  primary: 'bg-brand-sunrise text-brand-azul',
  secondary: 'bg-brand-azul text-white',
  celeste: 'bg-brand-celeste text-white',
  ghost: 'bg-transparent border-2 border-brand-azul text-brand-azul',
  whatsapp: 'bg-[#25D366] text-white',
  dark: 'bg-[#0a2240] text-white',
};

// Tamaños: xs, sm, md, lg, xl
const sizeClasses = {
  xs: 'text-[10px] px-2.5 py-[0.4rem]',
  sm: 'min-h-[46px] text-[12px] px-4.5 py-[0.4rem] md:min-h-0 md:px-4 md:py-2',
  md: 'min-h-[52px] text-[14px] px-5 py-[0.4rem] md:min-h-0 md:px-5 md:py-[11px]',
  lg: 'min-h-[56px] text-[16px] px-7 py-[0.4rem] md:min-h-0 md:px-7 md:py-[14px]',
  xl: 'min-h-[58px] text-[19.5px] px-4 py-[0.4rem] md:min-h-0 md:px-4 md:py-[11px]',
};

const slideSizeClasses = {
  xs: 'min-h-[44px] py-[0.75rem]',
  sm: 'min-h-[54px] py-[0.85rem] md:min-h-0 md:py-2',
  md: 'min-h-[60px] py-[1rem] md:min-h-0 md:py-[11px]',
  lg: 'min-h-[64px] py-[1.05rem] md:min-h-0 md:py-[14px]',
  xl: 'min-h-[66px] py-[1.1rem] md:min-h-0 md:py-[11px]',
};

const slideFillClasses = {
  primary: 'bg-brand-azul',
  secondary: 'bg-brand-naranja',
  celeste: 'bg-brand-azul',
  ghost: 'bg-brand-azul',
  whatsapp: 'bg-[#128C7E]',
  dark: 'bg-brand-naranja',
};

const slideTextClasses = {
  primary: 'text-brand-azul',
  secondary: 'text-white',
  celeste: 'text-white',
  ghost: 'text-brand-azul',
  whatsapp: 'text-white',
  dark: 'text-white',
};

const slideHoverTextClasses = {
  primary: 'text-white',
  secondary: 'text-brand-azul',
  celeste: 'text-brand-azul',
  ghost: 'text-white',
  whatsapp: 'text-white',
  dark: 'text-brand-azul',
};

const slideFillTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.95,
} as const;

const slideElementTransition = {
  type: 'spring',
  stiffness: 340,
  damping: 26,
  mass: 0.9,
} as const;

const slideFadeInTransition = {
  duration: 0.78,
  delay: 0.06,
  ease: [0.22, 1, 0.36, 1],
} as const;

const slideFadeOutTransition = {
  duration: 0.32,
  ease: [0.4, 0, 0.2, 1],
} as const;

export function Button({
  children,
  variant,
  size = 'md',
  iconName,
  iconAnimation = 'none',
  href,
  onClick,
  disabled = false,
  className,
  gradientStart,
  gradientEnd,
  hoverTextColor,
  fillColor,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isSlideButton = Boolean(iconName && iconAnimation === 'slide');
  const interactionHandlers = isSlideButton
    ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onFocus: () => setIsHovered(true),
        onBlur: () => setIsHovered(false),
      }
    : {};

  // Si se pasan colores custom, usarlos; si no, usar los defaults
  const effectiveVariant = variant;
  const effectiveFillColor = fillColor || slideFillClasses[variant];
  const effectiveHoverTextColor = hoverTextColor || slideHoverTextClasses[variant];
  const effectiveSlideTextColor = slideTextClasses[variant];

  // Construir clases de variante, con soporte para gradiente custom
  let variantStyle: React.CSSProperties | undefined;
  if (gradientStart && gradientEnd && variant === 'primary' && isSlideButton) {
    variantStyle = {
      backgroundImage: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
    };
  }

  const baseClasses = cn(
    // Estructura base: grupo para activar group-hover en hijos
    'group inline-flex items-center justify-center gap-3',
    'rounded-lg overflow-hidden relative isolate',
    'leading-none',
    'transition-[background-color,transform,box-shadow,opacity] duration-300 cursor-pointer',
    isSlideButton ? 'font-body font-medium tracking-[-0.02em]' : 'font-heading font-bold',
    // Solo aplicar clases de variant si no hay gradiente custom
    !variantStyle && variantClasses[effectiveVariant],
    sizeClasses[size],
    isSlideButton && slideSizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  );

  // Variante base: texto duplicado para el efecto vertical del botón regular.
  const defaultContent = (
    <span className="inline-flex items-center gap-3">
      <span className="flex flex-col overflow-hidden" style={{ height: '1.2em' }}>
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full">
          {children}
        </span>
        {/* Segunda copia del texto para el efecto de entrada */}
        <span
          className="block transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full"
          aria-hidden="true"
        >
          {children}
        </span>
      </span>

      {iconName && iconAnimation === 'slide' && (
        <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-brand-azul text-brand-naranja md:h-10 md:w-10">
          <Icon
            name={iconName}
            size="sm"
            className="absolute translate-x-0 translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[180%] group-hover:-translate-y-[180%]"
          />
          <Icon
            name={iconName}
            size="sm"
            className="absolute -translate-x-[180%] translate-y-[180%] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </span>
      )}

      {iconName && iconAnimation !== 'slide' && (
        <Icon name={iconName} size="sm" className="shrink-0" />
      )}
    </span>
  );

  const slideContent = (
    <>
      <motion.span
        initial={false}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={isHovered ? slideFadeInTransition : slideFadeOutTransition}
        className={cn('absolute inset-0 z-0 rounded-inherit', effectiveFillColor)}
      />

      <motion.span
        initial={false}
        animate={isHovered ? { width: '108%', height: 152, bottom: -54 } : { width: 8, height: 8, bottom: -8 }}
        transition={slideFillTransition}
        className={cn(
          'absolute bottom-[-8px] left-1/2 z-0 h-2 w-2 -translate-x-1/2 rounded-full',
          effectiveFillColor,
        )}
      />

      <span className="relative z-10 flex items-center justify-center overflow-hidden">
        <span className="pointer-events-none invisible inline-flex items-center px-1" aria-hidden="true">
          <span className="whitespace-nowrap">{children}</span>
          {iconName && <span className="ml-5 h-[23px] w-7 shrink-0" />}
        </span>

        <motion.span
          initial={false}
          animate={{ x: isHovered && iconName ? -18 : 0 }}
          transition={slideElementTransition}
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap px-1 transition-colors duration-200',
            isHovered ? effectiveHoverTextColor : effectiveSlideTextColor,
          )}
        >
          {children}
        </motion.span>

        {iconName && (
          <motion.span
            initial={false}
            animate={isHovered ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 18, scale: 0.92 }}
            transition={slideElementTransition}
            className={cn(
              'pointer-events-none absolute inset-y-0 right-4 my-auto flex h-[23px] w-7 items-center justify-center leading-none transition-colors duration-200 md:right-4.5',
              isHovered ? effectiveHoverTextColor : effectiveSlideTextColor,
            )}
            aria-hidden="true"
          >
            <Icon
              name={iconName}
              size="sm"
              className="flex h-[23px] w-7 shrink-0 items-center justify-center leading-none [&_path]:[stroke-width:2.85] [&_svg]:block [&_svg]:h-[23px] [&_svg]:w-7"
            />
          </motion.span>
        )}
      </span>
    </>
  );

  const innerContent = isSlideButton ? slideContent : defaultContent;

  if (href) {
    return (
      <Link href={href} className={baseClasses} style={variantStyle} {...interactionHandlers}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      style={variantStyle}
      {...interactionHandlers}
    >
      {innerContent}
    </button>
  );
}
