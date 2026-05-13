import { Button } from '@/components/atoms/Button'
import { HomeHero } from '@/components/organisms/HomeHero'
import { KeywordsMarquee } from '@/components/organisms/KeywordsMarquee'
import { HomeAboutSection } from '@/components/organisms/HomeAboutSection'
import { HomeServicesCarousel } from '@/components/organisms/HomeServicesCarousel'
import { HomeProgramsCarousel } from '@/components/organisms/HomeProgramsCarousel'
import { ProcessStepsSection } from '@/components/organisms/ProcessStepsSection'
import { HomeTestimonialsSection } from '@/components/organisms/HomeTestimonialsSection'
import { HomeFAQSection } from '@/components/organisms/HomeFAQSection'
import { AboutCTASection } from '@/components/organisms/AboutCTASection'
import { HomeSectionHeader } from '@/components/organisms/HomeSectionHeader'
import type { HomeTemplateProps } from './HomeTemplate.types'

export function HomeTemplate({
  hero,
  keywords,
  sobre,
  servicios,
  programas,
  proceso,
  testimonios,
  faqs,
  cta,
}: HomeTemplateProps) {
  return (
    <main className="bg-brand-crema">
      <HomeHero {...hero} />

      {keywords.length > 0 && (
        <KeywordsMarquee keywords={keywords} velocidad="normal" />
      )}

      {servicios.items.length > 0 && (
        <section className="bg-brand-crema py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <HomeSectionHeader
              pretitulo={servicios.pretitulo}
              titulo={servicios.titulo}
              parrafo={servicios.parrafo}
              align="left"
              className="max-w-[36rem]"
            />
          </div>
          <div className="mt-4">
            <HomeServicesCarousel
              servicios={servicios.items}
              botonLabel={servicios.botonLabel}
              botonHref={servicios.botonHref}
            />
          </div>
        </section>
      )}

      {sobre.titulo && (
        <HomeAboutSection {...sobre} />
      )}

      {programas.items.length > 0 && (
        <section className="bg-brand-crema py-10 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <HomeSectionHeader
              pretitulo={programas.pretitulo}
              titulo={programas.titulo}
              parrafo={programas.parrafo}
            />
          </div>
          <div className="mt-4">
            <HomeProgramsCarousel programas={programas.items} />
          </div>
          {programas.botonLabel && programas.botonHref && (
            <div className="mt-8 flex justify-center px-6">
              <Button
                variant="primary"
                size="md"
                href={programas.botonHref}
                iconName="ArrowRightIcon"
                iconAnimation="slide"
                className="rounded-full"
              >
                {programas.botonLabel}
              </Button>
            </div>
          )}
        </section>
      )}

      {proceso.pasos.length > 0 && (
        <ProcessStepsSection
          pretitulo={proceso.pretitulo ?? undefined}
          heading={proceso.titulo}
          pasos={proceso.pasos}
          ctaLabel={proceso.ctaLabel ?? undefined}
          ctaHref={proceso.ctaHref ?? undefined}
        />
      )}

      <HomeTestimonialsSection
        pretitulo={testimonios.pretitulo}
        titulo={testimonios.titulo}
        parrafo={testimonios.parrafo}
        testimonios={testimonios.items}
        botonLabel={testimonios.botonLabel}
        botonHref={testimonios.botonHref}
      />

      {faqs.items.length > 0 && (
        <HomeFAQSection
          pretitulo={faqs.pretitulo ?? undefined}
          heading={faqs.titulo}
          faqs={faqs.items}
          ctaLabel={faqs.ctaLabel ?? undefined}
          ctaHref={faqs.ctaHref ?? undefined}
        />
      )}

      <AboutCTASection
        pretitulo={cta.pretitulo ?? undefined}
        titulo={cta.titulo}
        cuerpo={cta.cuerpo ?? undefined}
        botonTexto={cta.botonTexto}
        botonHref={cta.botonHref}
        imagenSrc={cta.imagenSrc}
        imagenAlt={cta.imagenAlt ?? undefined}
      />
    </main>
  )
}
