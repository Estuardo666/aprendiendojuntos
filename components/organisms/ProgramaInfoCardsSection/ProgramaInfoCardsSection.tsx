import { Text } from '@/components/atoms/Text'
import { cn } from '@/lib/utils/cn'
import type { ProgramaInfoCardsSectionProps } from './ProgramaInfoCardsSection.types'

interface ProgramaInfoCardProps {
  iconSrc: string;
  titulo: string;
  valor?: string | null;
  items?: string[] | null;
  className?: string;
}

function normalizeItems(items?: string[] | null) {
  return (items ?? []).map((item) => item.trim()).filter(Boolean)
}

function ProgramaInfoCard({ iconSrc, titulo, valor, items, className }: ProgramaInfoCardProps) {
  const normalizedItems = normalizeItems(items)

  if (!valor && normalizedItems.length === 0) return null

  return (
    <article
      className={cn(
        'group flex h-full flex-col items-center text-center overflow-hidden rounded-[2rem] border border-brand-celeste bg-white px-5 pb-4 pt-4 transition-all duration-500 ease-out hover:scale-[1.025]',
        className,
      )}
    >
      <span className="inline-flex h-11 w-11 md:h-14 md:w-14 items-center justify-center">
        <span
          aria-hidden="true"
          className="h-11 w-11 md:h-14 md:w-14 bg-brand-celeste transition-[transform,background-color] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.1] group-hover:rotate-[10deg] group-hover:bg-[#f9b50b]"
          style={{
            maskImage: `url(${iconSrc})`,
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            maskSize: 'contain',
            WebkitMaskImage: `url(${iconSrc})`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'contain',
          }}
        />
      </span>

      <span className="mt-4 inline-block self-center rounded-full bg-[#9accea] px-4 py-[0.38rem] font-body font-medium text-[0.95rem] md:text-[1.05rem] leading-none text-brand-azul shadow-sm">
        {titulo}
      </span>

      {normalizedItems.length > 0 ? (
        <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-3">
          {normalizedItems.map((item) => (
            <li key={item} className="flex flex-col items-center gap-1 capitalize">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#49d47a] text-[0.72rem] leading-none text-white">
                ✓
              </span>
              <Text
                as="span"
                variant="body"
                color="default"
                className="text-[1.26rem] font-normal leading-[1.25] text-brand-azul"
              >
                {item}
              </Text>
            </li>
          ))}
        </ul>
      ) : (
        <Text
          variant="body"
          color="default"
          className="mt-4 whitespace-pre-line text-[1.26rem] font-normal leading-[1.28] text-brand-azul"
        >
          {valor}
        </Text>
      )}
    </article>
  )
}

export function ProgramaInfoCardsSection({
  modalidad,
  edadObjetivo,
  duracionSesion,
  frecuencia,
}: ProgramaInfoCardsSectionProps) {
  const cards = [
    {
      key: 'modalidad',
      iconSrc: '/modalidad.svg',
      titulo: 'Modalidad',
      items: modalidad,
    },
    {
      key: 'edad',
      iconSrc: '/edad.svg',
      titulo: 'Edad objetivo',
      valor: edadObjetivo,
    },
    {
      key: 'duracion',
      iconSrc: '/duracion.svg',
      titulo: 'Duración',
      valor: duracionSesion,
    },
    {
      key: 'frecuencia',
      iconSrc: '/frecuencia.svg',
      titulo: 'Frecuencia',
      valor: frecuencia,
    },
  ].filter((card) => Boolean(card.valor) || normalizeItems(card.items).length > 0)

  if (cards.length === 0) return null

  return (
    <section className="bg-brand-crema px-5 pb-12 pt-2 md:px-8 md:pb-12 md:pt-4">
      <div className="mx-auto w-full max-w-[1260px]">
        <div className="grid gap-6 grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <ProgramaInfoCard
              key={card.key}
              iconSrc={card.iconSrc}
              titulo={card.titulo}
              valor={card.valor}
              items={card.items}
            />
          ))}
        </div>
      </div>
    </section>
  )
}