import Image from 'next/image'
import type { LogoMarqueeProps } from './LogoMarquee.types'

export function LogoMarquee({ title, logos, direction = 'left' }: LogoMarqueeProps) {
  if (logos.length === 0) return null

  const shouldAnimate = logos.length > 3
  const items = shouldAnimate ? [...logos, ...logos] : logos

  return (
    <section className="overflow-hidden bg-brand-crema py-3 md:py-4" aria-label={title}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="text-center font-heading text-sm font-bold uppercase tracking-[0.18em] text-brand-azul/65 md:text-base">
          {title}
        </p>
      </div>

      <div className="relative mt-3 flex justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:mt-4">
        <div
          className={`flex w-max max-w-full items-center justify-center gap-6 whitespace-nowrap md:gap-12 ${shouldAnimate ? direction === 'right' ? 'logo-marquee-reverse' : 'logo-marquee' : ''}`}
        >
          {items.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="flex h-14 w-32 shrink-0 items-center justify-center px-2 md:h-16 md:w-44"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={176}
                height={64}
                className="h-full w-full object-contain grayscale transition duration-500 ease-out hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
