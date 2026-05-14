'use client'

import { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { FAQItem } from '@/components/molecules/FAQItem'
import type { HomeFAQSectionProps } from './HomeFAQSection.types'

export function HomeFAQSection({
  pretitulo,
  heading,
  faqs,
  ctaLabel,
  ctaHref,
}: HomeFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(faqs.length > 0 ? 0 : null)

  return (
    <section className="bg-brand-crema px-6 pt-10 pb-16 md:px-16 md:pt-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1260px]">
        <div className="text-center">
          {pretitulo && (
            <span className="pretitulo">{pretitulo}</span>
          )}
          <Heading
            as="h2"
            variant="h2"
            animate={true}
            className="mx-auto mt-4 max-w-[36rem] text-[clamp(2.45rem,4.8vw,3em)] leading-[0.92] tracking-[-0.06em] text-brand-azul"
          >
            {heading}
          </Heading>
        </div>

        <div className="mx-auto mt-10 max-w-[608px] space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={`${faq.pregunta}-${i}`}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((current) => current === i ? null : i)}
            />
          ))}
        </div>

        {ctaLabel && (
          <div className="mt-10 text-center md:mt-12">
            <Button
              variant="primary"
              size="md"
              href={ctaHref ?? '/contacto'}
              iconName="ArrowRightIcon"
              iconAnimation="slide"
              fillColor="bg-brand-acua"
              hoverTextColor="text-white"
              className="rounded-full"
            >
              {ctaLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
