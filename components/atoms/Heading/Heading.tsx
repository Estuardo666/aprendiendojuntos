'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import type { HeadingProps } from './Heading.types';

// Estilos tipográficos según variante visual
const variantClasses = {
  display: 'text-[3.5rem] font-black leading-[1.1] tracking-[-0.05em]',
  h1: 'text-[2.5rem] font-black leading-[1.15] tracking-[-0.02em]',
  h2: 'text-[9rem] font-bold leading-[1.25] tracking-[-0.04em]',
  h3: 'text-[1.5rem] font-semibold leading-[1.35] tracking-[-0.01em]',
};

// Colores de texto usando tokens de marca
const colorClasses = {
  azul: 'text-brand-azul',
  naranja: 'text-brand-naranja',
  celeste: 'text-brand-celeste',
  blanco: 'text-brand-blanco',
};

// Variantes de animación: "Line reveal — blur + rotate + offset"
const animationVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: 12,
    scale: 0.96,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
};

export function Heading({
  as: Tag,
  variant = 'h2',
  color = 'azul',
  animate = false,
  delay = 0,
  className,
  children,
}: HeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const classes = cn('font-heading', variantClasses[variant], colorClasses[color], className);

  // Sin animación: renderizar etiqueta directamente
  if (!animate) {
    return <Tag className={classes}>{children}</Tag>;
  }

  // Con animación: envolver en motion.div para el efecto de entrada
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={animationVariants}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1], // easeOutQuint
        delay: delay / 1000,
      }}
    >
      <Tag className={classes}>{children}</Tag>
    </motion.div>
  );
}
