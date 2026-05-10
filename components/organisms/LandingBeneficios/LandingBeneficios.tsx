'use client'

import { motion } from 'framer-motion'

interface Beneficio {
  icono: string
  texto: string
}

interface LandingBeneficiosProps {
  beneficios: Beneficio[]
}

export function LandingBeneficios({ beneficios }: LandingBeneficiosProps) {
  if (!beneficios.length) return null

  return (
    <ul className="flex flex-wrap gap-2.5">
      {beneficios.map((b, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3, scale: 1.03 }}
          className="flex cursor-default items-center gap-2 rounded-full bg-white/30 px-4 py-2.5"
        >
          <span className="text-[0.8rem] leading-none">{b.icono}</span>
          <span className="font-body text-[0.85rem] font-medium leading-none text-brand-azul">{b.texto}</span>
        </motion.li>
      ))}
    </ul>
  )
}
