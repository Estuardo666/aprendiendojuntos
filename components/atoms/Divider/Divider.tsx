'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import type { DividerProps } from './Divider.types';

// Colores del trazo según token de marca
const strokeColors = {
  naranja: '#FAB600',
  azul: '#0056A4',
  celeste: '#0080C9',
  default: 'currentColor',
};

export function Divider({ color = 'default', strokeWidth = 2.5, className }: DividerProps) {
  return (
    /*
     * SVG de curva senoidal suave (no zigzag).
     * preserveAspectRatio="none" permite que se estire al 100% del ancho
     * sin distorsionar la altura fija de 24px.
     */
    <svg
      viewBox="0 0 500 24"
      width="100%"
      height="24"
      preserveAspectRatio="none"
      className={cn(color === 'default' ? 'opacity-20' : '', className)}
      aria-hidden="true"
    >
      {/* Animación de entrada: crece de izquierda a derecha con pathLength */}
      <motion.path
        d="M0 12 C40 4, 60 20, 100 12 S180 4, 220 12 S300 20, 340 12 S420 4, 500 12"
        fill="none"
        stroke={strokeColors[color]}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
      />
    </svg>
  );
}
