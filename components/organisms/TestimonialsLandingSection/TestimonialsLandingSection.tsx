import Image from 'next/image'
import { Button } from '@/components/atoms/Button'
import { HomeSectionHeader } from '@/components/organisms/HomeSectionHeader'
import type { TestimonialLandingCard, TestimonialsLandingSectionProps } from './TestimonialsLandingSection.types'

function TestimonialCard({ quote, author, role, rating = 5, imageSrc, imageAlt }: TestimonialLandingCard) {
  return (
    <article className="flex h-full min-h-[18rem] flex-col justify-between rounded-[2rem] border border-brand-azul/10 bg-brand-blanco p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div>
        <div className="mb-5 flex gap-1 text-brand-naranja" aria-label={`${rating} de 5 estrellas`}>
          {Array.from({ length: Math.max(1, Math.min(5, rating)) }).map((_, index) => (
            <span key={index} aria-hidden="true">★</span>
          ))}
        </div>
        <p className="font-body text-[1rem] leading-[1.55] text-brand-texto/85">
          "{quote}"
        </p>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <div className="relative h-12 w-14 overflow-hidden rounded-xl bg-brand-celeste/20">
          {imageSrc ? (
            <Image src={imageSrc} alt={imageAlt ?? author} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-heading text-sm font-bold text-brand-azul">
              <span className="text-base">{author.slice(0, 1)}</span>
            </div>
          )}
        </div>
        <div>
          <p className="font-body text-base font-semibold text-brand-azul">{author}</p>
          <p className="font-body text-xs text-brand-texto/60">{role}</p>
        </div>
      </div>
    </article>
  )
}

export function TestimonialsLandingSection({
  pretitulo,
  titulo,
  parrafo,
  testimonios,
  botonLabel,
  botonHref,
}: TestimonialsLandingSectionProps) {
  if (testimonios.length === 0) return null

  return (
    <section className="bg-brand-crema px-4 pt-8 pb-16 sm:px-6 md:pt-10 md:pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <HomeSectionHeader pretitulo={pretitulo} titulo={titulo} parrafo={parrafo} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonios.slice(0, 3).map((testimonio, index) => (
            <div key={testimonio.id} className={index % 3 === 1 ? 'lg:translate-y-8' : undefined}>
              <TestimonialCard {...testimonio} />
            </div>
          ))}
        </div>
        {botonLabel && botonHref && (
          <div className="mt-14 flex justify-center">
            <Button
              variant="primary"
              size="md"
              href={botonHref}
              iconName="ArrowRightIcon"
              iconAnimation="slide"
              className="rounded-full"
            >
              {botonLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
