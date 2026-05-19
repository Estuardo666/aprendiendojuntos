import { fetchGraphQL } from '@/lib/graphql'
import type { WPRecurso } from '@/lib/types/recurso.types'

const REVALIDATE = 3600

export async function getRecursos(): Promise<WPRecurso[]> {
  try {
    const data = await fetchGraphQL<{
      recursos?: {
        nodes?: WPRecurso[]
      } | null
    }>(
      `
        query GetRecursos {
          recursos(first: 100) {
            nodes {
              id
              title
              recursoFields {
                subtitulo
                descripcion
                archivo {
                  node {
                    mediaItemUrl
                    filePath
                    mimeType
                  }
                }
              }
            }
          }
        }
      `,
      undefined,
      REVALIDATE,
    )

    return data.recursos?.nodes ?? []
  } catch (err) {
    console.error('[getRecursos] Error:', err)
    return []
  }
}
