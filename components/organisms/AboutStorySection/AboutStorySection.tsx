'use client'

import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import type { AboutStorySectionProps } from './AboutStorySection.types'

function cleanRichText(input: string) {
  return input
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .trim()
}

function ParallaxStackImage({
  src,
  alt,
  index,
  progress,
}: {
  src: string
  alt: string
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const depth = [28, 16, -10, -20][index] ?? 0
  const drift = [-10, 8, -7, 10][index] ?? 0
  const y = useTransform(progress, [0, 1], [depth, -depth])
  const x = useTransform(progress, [0, 1], [drift, -drift])
  const frameClasses = [
    'h-[196px] w-[96%] self-start md:h-[188px]',
    'h-[168px] w-[88%] self-end md:h-[162px]',
    'h-[208px] w-[93%] self-start md:h-[198px]',
    'h-[176px] w-[85%] self-end md:h-[170px]',
  ][index] ?? 'h-[184px] w-[92%] self-start md:h-[176px]'

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)', y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
      transition={{ duration: 0.95, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.25 }}
      style={{ y, x }}
      className={`relative overflow-hidden rounded-[1.85rem] ${frameClasses}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 38vw, (min-width: 768px) 46vw, 100vw"
        className="object-cover object-center"
      />
    </motion.div>
  )
}

export function AboutStorySection({
  pretitulo,
  titulo,
  parrafo,
  accordionItems,
  imagenes,
}: AboutStorySectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(accordionItems.length > 0 ? 0 : null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const visibleImages = useMemo(() => {
    const withSource = imagenes.filter((img) => Boolean(img?.sourceUrl))
    return withSource.slice(0, 4)
  }, [imagenes])

  const cleanParagraph = useMemo(() => cleanRichText(parrafo), [parrafo])

  return (
    <section ref={sectionRef} className="px-5 pb-20 pt-10 md:px-8 md:pb-24 md:pt-14">
      <div className="mx-auto w-full max-w-[1260px]">
        <div className="grid gap-9 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-10 lg:gap-14">
          <div className="text-center md:text-left">
            <span className="pretitulo">{pretitulo}</span>

            <Heading
              as="h2"
              variant="h2"
              animate={true}
              className="mx-auto mt-2 max-w-full text-[clamp(2.45rem,4.8vw,3em)] font-bold leading-[0.92] tracking-[-0.06em] text-brand-azul md:mx-0"
            >
              {titulo}
            </Heading>

            <Text
              variant="body"
              className="mt-4 max-w-full whitespace-pre-line text-[clamp(1.02rem,1.35vw,1.18rem)] leading-[1.24] text-brand-texto text-center md:text-justify"
            >
              {cleanParagraph}
            </Text>

            <div className="mt-6 space-y-3">
              {accordionItems.map((item, index) => {
                const isOpen = openIndex === index

                return (
                  <motion.article
                    key={item.titulo}
                    layout
                    animate={{ backgroundColor: isOpen ? '#fde299' : '#99ccea' }}
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 34,
                      mass: 1,
                      backgroundColor: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
                    }}
                    className="overflow-hidden rounded-[1.45rem]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex((current) => (current === index ? null : index))}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-3 text-left md:px-6"
                    >
                      <h3 className="font-body text-[clamp(1.18rem,1.46vw,1.3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-brand-azul">
                        {item.titulo}
                      </h3>

                      <span
                        aria-hidden="true"
                        className="relative inline-flex h-[1em] w-[1ch] shrink-0 items-center justify-center font-body text-[1.65rem] font-normal leading-none text-brand-azul"
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={isOpen ? 'minus' : 'plus'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            {isOpen ? '−' : '+'}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                    </button>

                    <motion.div
                      initial={false}
                      animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <Text
                        variant="body"
                        className="px-5 pb-5 pt-0 text-[clamp(0.95rem,1.21vw,1.08rem)] leading-[1.22] text-brand-texto text-center md:px-6 md:text-left"
                      >
                        {cleanRichText(item.contenido)}
                      </Text>
                    </motion.div>
                  </motion.article>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 md:pt-2">
            {visibleImages.map((image, index) => (
              <ParallaxStackImage
                key={`${image.sourceUrl}-${index}`}
                src={image.sourceUrl}
                alt={image.altText || `Imagen ${index + 1}`}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
