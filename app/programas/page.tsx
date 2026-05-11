import type { Metadata } from 'next'
import { ProgramasTemplate } from '@/components/templates/ProgramasTemplate'
import { getProgramas } from '@/lib/api/programas'
import { getPaginaNosotros } from '@/lib/api/nosotros'
import type { WPPrograma } from '@/lib/types/programa.types'

export const metadata: Metadata = {
  title: 'Nuestros Programas | Centro Aprendiendo Juntos',
  description:
    'Descubre nuestros programas especializados en neuropsicología, psicopedagogía y desarrollo integral para niños, adolescentes y familias.',
}

export default async function ProgramasPage() {
  const [programasRaw, nosotros] = await Promise.all([
    getProgramas(),
    getPaginaNosotros().catch(() => null),
  ])

  // Los 2 primeros programas son los destacados
  const featuredRaw = programasRaw.slice(0, 2)
  const restoRaw = programasRaw.slice(2)

  return (
    <ProgramasTemplate
      hero={{
        pretitulo: 'Programas Aprendiendo Juntos',
        titulo: 'Nuestros\nprogramas',
        descripcion:
          'Ofrecemos programas especializados diseñados para potenciar el desarrollo cognitivo, emocional y social de cada niño y adolescente.',
        imagenSrc: '/bg-test.jpg',
      }}
      featured={{
        slides: featuredRaw.map((p) => ({
          imagenSrc: p.programaFields.imagenDestacada?.node.sourceUrl,
          imagenAlt: p.programaFields.imagenDestacada?.node.altText ?? p.title,
          pretitulo: 'Programa Destacado',
          titulo: p.title,
          descripcion:
            p.programaFields.descripcionHeroTexto ??
            p.programaFields.descripcion ??
            '',
          href: `/programas/${p.slug}`,
        })),
      }}
      resto={{
        programas: restoRaw.map((p) => ({
          imagenSrc: p.programaFields.imagenDestacada?.node.sourceUrl,
          imagenAlt: p.programaFields.imagenDestacada?.node.altText ?? p.title,
          pretitulo: 'Programa',
          titulo: p.title,
          descripcion:
            p.programaFields.descripcionHeroTexto ??
            p.programaFields.descripcion ??
            '',
          href: `/programas/${p.slug}`,
        })),
      }}
      cta={{
        pretitulo: nosotros?.ctaPretitulo ?? '¿Listo para Transformar el Aprendizaje?',
        heading: nosotros?.ctaTitulo ?? 'Tu hijo merece ser comprendido. Nos encantaría conocerte y ser parte de su camino.',
        descripcion: nosotros?.ctaCuerpo ?? undefined,
        ctaLabel: nosotros?.ctaBotonTexto ?? 'Agenda una Consulta',
        ctaHref: nosotros?.ctaBotonUrl ?? '/contacto',
        imagenSrc: nosotros?.ctaImagen?.sourceUrl,
        imagenAlt: nosotros?.ctaImagen?.altText,
      }}
    />
  )
}
