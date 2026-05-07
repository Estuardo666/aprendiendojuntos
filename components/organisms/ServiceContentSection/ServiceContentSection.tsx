"use client"

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import type { ServiceContentSectionProps } from './ServiceContentSection.types'

/**
 * Sección de contenido del servicio.
 * Desktop: grid 40/60 — izquierda: pretitulo + heading + imagen; derecha: HTML WP + tags.
 * Mobile: columna única en orden natural.
 */
export function ServiceContentSection({
  pretitulo,
  heading,
  descripcionLarga,
  imagenSrc,
  imagenAlt,
  ctaLabel,
  ctaHref,
}: ServiceContentSectionProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const imageInView = useInView(imageRef, { once: true, amount: 0.35 })

  return (
    <section className="bg-brand-crema px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto w-full max-w-[1260px]">
        <div className="lg:grid lg:grid-cols-[40%_60%] lg:gap-[3.75rem] lg:items-start">

          {/* Columna izquierda: pretitulo, heading, imagen */}
          <div>
            {pretitulo && (
              <span className="pretitulo">{pretitulo}</span>
            )}
            <Heading
              as="h2"
              variant="h2"
              animate={true}
              className="mt-4 max-w-[30rem] text-[clamp(2.45rem,4.8vw,3em)] leading-[0.92] text-brand-azul"
            >
              {heading}
            </Heading>

            {imagenSrc && (
              <motion.div
                ref={imageRef}
                initial={{ clipPath: 'inset(16% 0% 0% 0%)' }}
                animate={{ clipPath: imageInView ? 'inset(0% 0% 0% 0%)' : 'inset(16% 0% 0% 0%)' }}
                transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
                className="relative mt-8 aspect-[4/5] w-[88%] overflow-hidden rounded-[2.25rem]"
              >
                <motion.div
                  initial={{ scale: 1.12 }}
                  animate={{ scale: imageInView ? 1 : 1.12 }}
                  transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={imagenSrc}
                    alt={imagenAlt ?? ''}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Columna derecha: HTML de WordPress con estilos tipográficos */}
          <div className="mt-10 lg:mt-0 lg:pt-14">
            <div
              className="
                prose prose-lg max-w-none text-justify
                prose-headings:font-heading prose-headings:text-brand-texto
                prose-headings:font-semibold prose-headings:tracking-[-0.04em]
                prose-headings:mt-10 prose-headings:mb-4 prose-headings:leading-[1.08]
                prose-h2:text-[1.9rem]
                prose-p:mb-5 prose-p:font-body prose-p:text-[1.19rem]
                prose-p:font-medium prose-p:leading-[1.5] prose-p:text-brand-texto
                prose-ul:list-none prose-ul:pl-0 prose-ul:space-y-1 prose-ul:text-left
                prose-li:relative prose-li:pl-[1.05rem] prose-li:font-body
                prose-li:text-left prose-li:text-[1.1rem] prose-li:leading-[1.28]
                prose-li:text-brand-texto prose-li:font-medium
                [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.02rem]
                [&_li]:before:content-['•'] [&_li]:before:text-brand-azul
                [&_li]:before:text-[1.12rem] [&_li]:before:leading-none
                prose-ol:pl-4 prose-ol:space-y-3
                prose-strong:font-semibold prose-strong:text-[#0557a4]
              "
              dangerouslySetInnerHTML={{ __html: descripcionLarga }}
            />

            {ctaLabel && ctaHref && (
              <div className="mt-8">
                <Button
                  variant="primary"
                  size="md"
                  iconName="ArrowRightIcon"
                  iconAnimation="slide"
                  href={ctaHref}
                  gradientStart="#FDD904"
                  gradientEnd="#F9B50B"
                  fillColor="bg-brand-azul"
                  hoverTextColor="text-white"
                  className="min-w-[170px] justify-center rounded-full px-4 text-[15.4px]"
                >
                  {ctaLabel}
                </Button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
