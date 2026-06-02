import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticulo, getArticulos } from '@/lib/api/articulos'
import { stripHtml } from '@/lib/utils/stripHtml'
import { ArticuloDetalleTemplate } from '@/components/templates/ArticuloDetalleTemplate'
import { buildBreadcrumbSchema } from '@/lib/seo/breadcrumb-schema'
import { buildArticleSchema } from '@/lib/seo/article-schema'

function formatFileSize(bytes?: number | null): string | undefined {
  if (!bytes) return undefined
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export async function generateStaticParams() {
  const articulos = await getArticulos().catch(() => [])
  return articulos.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const articulo = await getArticulo(slug).catch(() => null)
  if (!articulo) return { title: 'Artículo no encontrado' }

  return {
    title: articulo.title,
    description: articulo.excerpt ? stripHtml(articulo.excerpt).slice(0, 160) : undefined,
    openGraph: {
      title: articulo.title,
      description: articulo.excerpt ? stripHtml(articulo.excerpt).slice(0, 160) : undefined,
      url: `https://aprendiendojuntos.ec/articulos/${slug}`,
      images: articulo.featuredImage?.node?.sourceUrl
        ? [{ url: articulo.featuredImage.node.sourceUrl }]
        : [],
    },
  }
}

export default async function ArticuloDetallePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const [articulo, masArticulos] = await Promise.all([
    getArticulo(slug).catch(() => null),
    getArticulos().catch(() => []),
  ])

  if (!articulo) notFound()

  const categoria = articulo.categories?.nodes?.[0]?.name ?? 'Artículo'

  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: 'Artículos', url: 'https://aprendiendojuntos.ec/articulos' },
    { name: articulo.title, url: `https://aprendiendojuntos.ec/articulos/${slug}` },
  ])

  const articleJsonLd = buildArticleSchema({
    title: articulo.title,
    slug,
    excerpt: articulo.excerpt ? stripHtml(articulo.excerpt).slice(0, 160) : '',
    date: articulo.date,
    imagenSrc: articulo.featuredImage?.node?.sourceUrl,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ArticuloDetalleTemplate
        slug={slug}
        hero={{
          titulo: articulo.title,
          subtitulo: articulo.articuloFields?.subtitulo ?? undefined,
          excerpt: articulo.excerpt ? stripHtml(articulo.excerpt) : undefined,
          fecha: articulo.date,
          categoria,
          imagenSrc: articulo.featuredImage?.node?.sourceUrl,
          imagenAlt: articulo.featuredImage?.node?.altText ?? articulo.title,
        }}
        content={articulo.content ?? ''}
        archivoUrl={articulo.articuloFields?.archivoDescarga?.node?.mediaItemUrl}
        archivoNombre={articulo.articuloFields?.archivoDescarga?.node?.filePath ?? 'Artículo'}
        archivoSize={formatFileSize(articulo.articuloFields?.archivoDescarga?.node?.fileSize)}
        masArticulos={{
          heading: 'Más artículos',
          slides: masArticulos
            .filter((a) => a.slug !== slug)
            .slice(0, 6)
            .map((a) => ({
              titulo: a.title,
              slug: a.slug,
              imagenSrc: a.featuredImage?.node?.sourceUrl,
              imagenAlt: a.featuredImage?.node?.altText ?? a.title,
              categoria: a.categories?.nodes?.[0]?.name ?? 'Artículo',
            })),
          hrefBase: '/articulos',
        }}
      />
    </>
  )
}
