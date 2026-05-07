import Image from 'next/image'
import { Button } from '@/components/atoms/Button'
import { MagnetText } from './MagnetText'
import type { ProgramaDescripcionSectionProps } from './ProgramaDescripcionSection.types'

/** Divide un string por palabras: primera mitad y segunda mitad */
function splitByWords(text: string): [string, string] {
  const words = text.trim().split(/\s+/)
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}


export function ProgramaDescripcionSection({
  fraseDestacada,
  descripcion,
  beneficios,
  ctaBotonTexto,
  ctaHref = '#',
}: ProgramaDescripcionSectionProps) {
  const [mitadAzul, mitadCeleste] = fraseDestacada
    ? splitByWords(fraseDestacada)
    : ['', '']

  return (
    <section className="bg-brand-crema px-5 pb-8 pt-4 md:px-8 md:pb-8">
      <div className="mx-auto w-[90vw] max-w-[1260px]">

        {/* ── Top: frase destacada con magnet ─────────────────────────── */}
        {fraseDestacada && (
          <MagnetText className="mx-auto mb-12 w-full cursor-default select-none text-center md:w-[60%]" strength={0.22}>
            <h2 className="font-heading text-[clamp(2.45rem,4.8vw,3em)] font-bold leading-[0.92] tracking-[-0.04em]">
              <span className="text-brand-azul">{mitadAzul} </span>
              <span className="text-brand-celeste">{mitadCeleste}</span>
            </h2>
          </MagnetText>
        )}

        {/* ── Bottom: descripcion + beneficios ────────────────────────── */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)] md:items-start md:gap-12">

          {/* Columna izquierda: HTML rico de WordPress */}
          <div
            style={{ marginTop: '-2em' }}
            className="pr-0 md:pr-[7rem]
              prose prose-lg max-w-none text-justify
              prose-headings:font-heading prose-headings:text-brand-azul
              prose-headings:font-bold prose-headings:tracking-[-0.03em]
              prose-headings:mt-10 prose-headings:mb-4 prose-headings:leading-[1.08]
              prose-h2:text-[1.9rem]
              prose-h3:text-[1.55rem] 
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
            dangerouslySetInnerHTML={{ __html: descripcion }}
          />

          {/* Columna derecha: card beneficios */}
          <div className="group flex flex-col">
            {/* Icono bombilla separado, centrado */}
            <div className="mb-8 flex justify-center">
              <div className="relative h-[92px] w-[92px] transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.1] group-hover:rotate-[10deg]">
                <Image
                  src="/icon idea.png"
                  alt="Icono de beneficios"
                  fill
                  sizes="92px"
                  className="object-contain transition-opacity duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-0"
                />
                <Image
                  src="/icon idea.png"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="92px"
                  className="object-contain opacity-0 transition-opacity duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] [filter:brightness(0)_saturate(100%)_invert(78%)_sepia(92%)_saturate(1327%)_hue-rotate(357deg)_brightness(101%)_contrast(96%)] group-hover:opacity-100"
                />
              </div>
            </div>

            {/* Pill "Beneficios" sobremontada 50% sobre el card */}
            <div className="relative flex justify-center">
              <span className="absolute top-0 z-10 -translate-y-1/2 rounded-full bg-[#9accea] px-4 py-[0.38rem] font-body font-medium text-[1.05rem] leading-none text-brand-azul shadow-sm">
                Beneficios
              </span>

              {/* Card azul */}
              <div className="w-full rounded-[2.2rem] bg-brand-celeste px-9 pb-9 pt-12">
                {beneficios && beneficios.length > 0 && (
                  <ul className="space-y-3">
                    {beneficios.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-[2px] inline-flex h-[1.4rem] w-[1.4rem] shrink-0 items-center justify-center rounded-full bg-[#3ecf5e] text-white" aria-hidden="true">
                          <svg viewBox="0 0 12 12" fill="none" width="10" height="10" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="2,6 5,9 10,3" />
                          </svg>
                        </span>
                        <span
                          className="font-body font-normal leading-[1.35] text-white"
                          style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.15rem)' }}
                        >
                          {item.beneficio}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Botón CTA full width debajo del card */}
            {ctaBotonTexto && (
              <div className="mt-4">
                <Button
                  variant="primary"
                  size="lg"
                  href={ctaHref}
                  iconName="ArrowRightIcon"
                  iconAnimation="slide"
                  fillColor="bg-brand-azul"
                  hoverTextColor="text-white"
                  className="w-full justify-center rounded-full"
                >
                  {ctaBotonTexto}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
