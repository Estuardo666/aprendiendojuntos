import type { Metadata } from 'next'
import { ArticulosTemplate } from '@/components/templates/ArticulosTemplate'
import { getArticulos } from '@/lib/api/articulos'
import { getArticulosPageOptions } from '@/lib/api/pagina-options'

export const metadata: Metadata = {
  title: 'Artículos Académicos',
  description:
    'Investigaciones, guías y reflexiones de nuestro equipo profesional sobre neuropsicología, psicopedagogía, lenguaje y desarrollo infantil.',
  openGraph: {
    title: 'Artículos Académicos',
    description:
      'Investigaciones, guías y reflexiones de nuestro equipo profesional sobre neuropsicología, psicopedagogía, lenguaje y desarrollo infantil.',
  },
}

export default async function ArticulosPage() {
  const [options, articulosRaw] = await Promise.all([
    getArticulosPageOptions().catch(() => null),
    getArticulos().catch(() => []),
  ])

  return (
    <ArticulosTemplate
      hero={{
        pretitulo: options?.pretitulo ?? 'Conocimiento que acompaña',
        titulo: options?.titulo ?? 'Artículos académicos\ncerca de ti',
        descripcion:
          options?.descripcion ??
          'Investigaciones, guías y reflexiones de nuestro equipo profesional sobre neuropsicología, psicopedagogía, lenguaje y desarrollo infantil.',
        imagenSrc: options?.bgHeroImagen?.node?.sourceUrl ?? '/bg-test.jpg',
      }}
      items={articulosRaw.map((a) => ({
        id: a.id,
        titulo: a.title,
        slug: a.slug,
        excerpt: a.excerpt ?? '',
        imagenSrc: a.featuredImage?.node?.sourceUrl,
        imagenAlt: a.featuredImage?.node?.altText ?? a.title,
        categoria: a.categories?.nodes?.[0]?.name ?? null,
        categoriaSlug: a.categories?.nodes?.[0]?.slug ?? null,
        fecha: a.date,
      }))}
    />
  )
}
