import { fetchGraphQL } from '@/lib/graphql'
import type { WPArticulo, WPArticuloResumen } from '@/lib/types/articulo.types'

const REVALIDATE = 3600

const ARTICULO_RESUMEN_FIELDS = `
  id
  title
  slug
  excerpt
  date
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  articuloFields {
    subtitulo
  }
  categories {
    nodes {
      name
      slug
    }
  }
`

const ARTICULO_COMPLETO_FIELDS = `
  id
  title
  slug
  excerpt
  content
  date
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  articuloFields {
    subtitulo
    archivoDescarga {
      node {
        mediaItemUrl
        filePath
        mimeType
        title
        fileSize
      }
    }
  }
  categories {
    nodes {
      name
      slug
    }
  }
`

export async function getArticulos(first = 50): Promise<WPArticuloResumen[]> {
  try {
    const data = await fetchGraphQL<{
      articulos?: { nodes?: WPArticuloResumen[] }
    }>(
      `
        query GetArticulos($first: Int) {
          articulos(first: $first) {
            nodes {
              ${ARTICULO_RESUMEN_FIELDS}
            }
          }
        }
      `,
      { first },
      REVALIDATE,
    )

    return data.articulos?.nodes ?? []
  } catch (err) {
    console.error('[getArticulos] Error:', err)
    return []
  }
}

export async function getArticulo(slug: string): Promise<WPArticulo | null> {
  try {
    const data = await fetchGraphQL<{
      articulo?: WPArticulo | null
    }>(
      `
        query GetArticulo($slug: ID!) {
          articulo(id: $slug, idType: SLUG) {
            ${ARTICULO_COMPLETO_FIELDS}
          }
        }
      `,
      { slug },
      REVALIDATE,
    )

    return data.articulo ?? null
  } catch (err) {
    console.error('[getArticulo] Error:', err)
    return null
  }
}

export async function getCategoriasArticulos(): Promise<{ name: string; slug: string }[]> {
  try {
    const data = await fetchGraphQL<{
      categories?: { nodes?: { name: string; slug: string }[] }
    }>(
      `
        query GetCategoriasArticulos {
          categories(where: { hideEmpty: true }) {
            nodes {
              name
              slug
            }
          }
        }
      `,
      undefined,
      REVALIDATE,
    )

    return data.categories?.nodes ?? []
  } catch (err) {
    console.error('[getCategoriasArticulos] Error:', err)
    return []
  }
}
