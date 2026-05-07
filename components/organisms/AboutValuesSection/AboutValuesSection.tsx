import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import type { AboutValuesSectionProps } from './AboutValuesSection.types'

function resolveEmoji(iconoEmoji?: string) {
  if (iconoEmoji && iconoEmoji.trim().length > 0) return iconoEmoji.trim()
  return '★'
}

export function AboutValuesSection({
  pretitulo,
  titulo,
  descripcion,
  valores,
}: AboutValuesSectionProps) {
  if (!valores || valores.length === 0) return null

  return (
    <section className="px-5 pb-20 pt-6 md:px-8 md:pb-24 md:pt-10">
      <div className="mx-auto w-full max-w-[1260px]">
        <div className="mx-auto max-w-[760px] text-center">
          <span className="pretitulo">{pretitulo}</span>

          <Heading
            as="h2"
            variant="h2"
            animate={true}
            className="mx-auto mt-2 max-w-full text-[clamp(2.45rem,4.8vw,3em)] font-bold leading-[0.92] tracking-[-0.06em] text-brand-azul"
          >
            {titulo}
          </Heading>

          {descripcion && (
            <Text
              variant="body"
              className="mx-auto mt-4 max-w-[40rem] text-[clamp(1.02rem,1.35vw,1.18rem)] leading-[1.24] text-brand-texto"
            >
              {descripcion}
            </Text>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 w-[90vw]">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {valores.map((valor, index) => (
            <article
              key={`${valor.titulo}-${index}`}
              className="group relative flex min-h-[25rem] flex-col overflow-hidden rounded-[2rem] bg-[#145ea5] px-5 pb-10 pt-5 text-white transition-all duration-500 ease-out hover:scale-[1.025] hover:bg-[#1f86c8]"
            >
              <span className="inline-flex h-[3.72rem] w-[3.72rem] items-center justify-center rounded-full bg-[#efece2] font-body text-[1.6rem] leading-none text-brand-azul transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:bg-[#f7c307] group-hover:text-white">
                {resolveEmoji(valor.iconoEmoji)}
              </span>

              <div className="mt-auto">
                <h3 className="mt-[1.875rem] font-body text-[1.5rem] font-bold leading-[1.1] tracking-[-0.03em] text-[#f7c307] transition-colors duration-500 group-hover:text-[#ffe18a]">
                  {valor.titulo}
                </h3>

                <p className="text-process-card-paragraph mt-4 text-[#f5f8fb] transition-colors duration-500 group-hover:text-white">
                  {valor.descripcion}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
