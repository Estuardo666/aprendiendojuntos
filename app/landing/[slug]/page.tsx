import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getLandingPage, getLandingPageSlugs } from '@/lib/api/landing-pages'
import { LandingPageForm } from '@/components/organisms/LandingPageForm'
import { FAQServiceSection } from '@/components/organisms/FAQServiceSection'
import { LandingBeneficios } from '@/components/organisms/LandingBeneficios/LandingBeneficios'
import { LandingNavbar } from '@/components/organisms/LandingNavbar/LandingNavbar'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'

interface LandingPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getLandingPageSlugs().catch(() => [] as string[])
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { slug } = await params
  const lp = await getLandingPage(slug).catch(() => null)
  if (!lp) return {}
  return {
    title: `${lp.titulo} | Centro Aprendiendo Juntos`,
    description: lp.descripcionCorta ?? undefined,
  }
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { slug } = await params
  const lp = await getLandingPage(slug).catch(() => null)

  if (!lp) notFound()

  return (
    <>
      <LandingNavbar ctaLabel={lp.formCtaTexto} />

      <main className="min-h-screen bg-brand-crema pt-14 md:pt-16">

      {/* ── HERO ── misma estructura que AboutHero */}
      <section className="pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="mx-auto w-[90vw] max-w-[1728px]">

          {/* Imagen redondeada */}
          <div className="relative -mt-[3.25vh] h-[65vh] min-h-[360px] overflow-hidden rounded-[2rem] md:rounded-[2.75rem]">
            {lp.imagenHeroSrc ? (
              <Image
                src={lp.imagenHeroSrc}
                alt={lp.imagenHeroAlt ?? lp.titulo}
                fill
                priority
                className="object-cover object-center"
              />
            ) : (
              <div className="h-full w-full bg-brand-acua" aria-hidden="true" />
            )}
            <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-brand-crema via-brand-crema/78 to-transparent" />
          </div>

          {/* Pretitulo pill + título + descripción — superpuestos con -mt igual que AboutHero */}
          <div className="mx-auto -mt-[6.24rem] max-w-4xl px-4 text-center md:-mt-[7.36rem]">
            <div className="relative z-10">
              {lp.pretitulo && (
                <span className="inline-flex rounded-full bg-[#9accea] px-[0.6rem] py-2.5 font-body text-[0.9625rem] font-medium leading-none text-brand-azul md:px-[1.3rem] md:py-3 md:text-[1.1rem]">
                  {lp.pretitulo}
                </span>
              )}

              <Heading
                as="h1"
                variant="display"
                animate={true}
                className="mx-auto mt-5 text-[clamp(2.7rem,6.2vw,5.8rem)] font-bold leading-[0.94] text-[#117fc3]"
              >
                {lp.titulo}
              </Heading>

              {lp.descripcionCorta && (
                <Text
                  variant="body"
                  className="mx-auto mt-5 max-w-[48rem] text-center text-[clamp(0.833rem,1.417vw,1.208rem)] leading-[1.22] text-[#253a44]"
                >
                  {lp.descripcionCorta}
                </Text>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ── CONTENIDO + FORMULARIO ── 2 columnas */}
      <section className="mx-auto grid max-w-[1200px] gap-10 px-6 pb-24 pt-4 md:grid-cols-[1fr_400px] md:items-start md:gap-16 md:px-8 lg:grid-cols-[1fr_420px]">

        {/* Columna izquierda: info + beneficios */}
        <div className="flex flex-col gap-8">
          {lp.infoEvento ? (
            <div
              className="prose prose-base max-w-none text-brand-texto
                [&_h3]:font-heading [&_h3]:text-[1.21rem] [&_h3]:font-bold [&_h3]:text-brand-azul [&_h3]:mb-4
                [&_ul]:mt-3 [&_ul]:space-y-2
                [&_li]:text-[1.07rem] [&_li]:leading-[1.55]
                [&_p]:mt-4 [&_p]:text-[1.07rem] [&_p]:leading-[1.7] [&_p]:text-justify"
              dangerouslySetInnerHTML={{ __html: lp.infoEvento }}
            />
          ) : (
            <div className="flex items-center justify-center rounded-2xl bg-white/60 p-10 text-center text-brand-texto/40">
              <p className="font-body text-body">Información del evento próximamente.</p>
            </div>
          )}

          {lp.beneficios && lp.beneficios.length > 0 && (
            <LandingBeneficios beneficios={lp.beneficios} />
          )}
        </div>

        {/* Columna derecha: formulario + urgencia */}
        <div id="formulario" className="md:sticky md:top-24 flex flex-col gap-4">

          <LandingPageForm
            landingSlug={lp.slug}
            landingTitulo={lp.title}
            formTitulo={lp.formTitulo}
            formCtaTexto={lp.formCtaTexto}
          />

          {/* Urgencia debajo del formulario */}
          {lp.urgencia && (
            <p className="text-center font-body text-[0.88rem] font-semibold text-brand-azul">
              ⚡ {lp.urgencia}
            </p>
          )}
        </div>
      </section>

      {/* ── FAQs ── */}
      {lp.faqs && lp.faqs.length > 0 && (
        <FAQServiceSection
          pretitulo="Resolvemos tus dudas"
          heading="Preguntas frecuentes"
          faqs={lp.faqs}
          ctaLabel="Contáctanos"
          ctaHref="/contacto"
        />
      )}

    </main>
    </>
  )
}
