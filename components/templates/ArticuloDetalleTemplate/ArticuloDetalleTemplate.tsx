import Image from 'next/image'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { DownloadButton } from '@/components/atoms/DownloadButton'
import { ReadingProgressBar } from '@/components/atoms/ReadingProgressBar'
import { ArticleSharer } from '@/components/molecules/ArticleSharer'
import { ServicesStackingSlider } from '@/components/organisms/ServicesStackingSlider'
import type { ArticuloDetalleTemplateProps } from './ArticuloDetalleTemplate.types'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ArticuloDetalleTemplate({
  slug,
  hero,
  content,
  archivoUrl,
  archivoNombre,
  archivoSize,
  masArticulos,
}: ArticuloDetalleTemplateProps) {
  const shareUrl = `https://aprendiendojuntos.ec/articulos/${slug}`

  return (
    <>
      <ReadingProgressBar />
      <main className="bg-brand-crema">
        {/* Hero */}
        <section className="pb-10 pt-14 md:pb-16 md:pt-20">
          <div className="mx-auto w-[97vw] md:w-[95vw]">
            <div className="mx-auto max-w-4xl px-4 text-center md:px-0">
              <span className="inline-flex rounded-full bg-[#9accea] px-[0.6rem] py-2.5 font-body text-[0.9625rem] font-medium leading-none text-brand-azul capitalize md:px-[1.3rem] md:py-3 md:text-[1.1rem]">
                {hero.categoria}
              </span>

              <Heading
                as="h1"
                variant="display"
                animate={true}
                className="mx-auto mt-5 text-[clamp(2.7rem,6.2vw,5.8rem)] font-bold leading-[0.94] text-[#117fc3]"
              >
                {hero.titulo}
              </Heading>

              {hero.subtitulo && (
                <Text
                  variant="body"
                  className="mx-auto mt-4 max-w-[48rem] text-[clamp(0.9rem,1.5vw,1.25rem)] leading-[1.3] text-[#253a44]/80"
                >
                  {hero.subtitulo}
                </Text>
              )}

              {hero.excerpt && (
                <Text
                  variant="body"
                  className="mx-auto mt-4 max-w-[48rem] text-[clamp(0.833rem,1.417vw,1.208rem)] leading-[1.22] text-[#253a44]"
                >
                  {hero.excerpt}
                </Text>
              )}

              <p className="mt-4 font-body text-sm text-[#253a44]/60">
                {formatDate(hero.fecha)}
              </p>
            </div>

            {/* Imagen destacada sin overlay, bordes redondeados */}
            {hero.imagenSrc && (
              <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-[2rem] md:rounded-[2.75rem]">
                <Image
                  src={hero.imagenSrc}
                  alt={hero.imagenAlt ?? hero.titulo}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </section>

        {/* Contenido del artículo */}
        <section className="px-4 pb-10 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <article
              className="prose prose-lg prose-headings:font-body prose-headings:text-brand-azul prose-p:font-body prose-p:text-[#253a44] prose-a:text-brand-celeste prose-strong:text-[#253a44] max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </section>

        {/* Botón descargar */}
        {archivoUrl && (
          <section className="px-4 pb-8 md:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <DownloadButton
                href={archivoUrl}
                fileName={archivoNombre}
                fileSize={archivoSize}
              />
            </div>
          </section>
        )}

        {/* Compartir */}
        <section className="px-4 pb-14 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <ArticleSharer
              title={hero.titulo}
              description={hero.excerpt}
            />
          </div>
        </section>
      </main>

      {/* Más artículos con degradado crema→celeste */}
      <div className="bg-gradient-to-b from-brand-crema to-brand-celeste">
        {/* Separador */}
        <div className="flex justify-center px-4 pt-10 pb-6 md:px-6">
          <img
            src="/separador amarillo.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-auto max-w-[215px]"
          />
        </div>

        <ServicesStackingSlider {...masArticulos} className="bg-transparent" headingClassName="text-[#0056A4]" />
      </div>
    </>
  )
}
