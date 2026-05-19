import { fetchGraphQL } from '@/lib/graphql'
import type { WPPaginaRecursosOptions } from '@/lib/types/recurso.types'

const REVALIDATE = 86400

export async function getRecursosPageOptions(): Promise<WPPaginaRecursosOptions | null> {
  try {
    const data = await fetchGraphQL<{
      opcionesAprendiendoJuntos?: {
        opcionesPaginaRecursos?: WPPaginaRecursosOptions | null
      } | null
    }>(
      `
        query GetOpcionesPaginaRecursos {
          opcionesAprendiendoJuntos {
            opcionesPaginaRecursos {
              bgHeroImagen {
                node {
                  sourceUrl
                  altText
                }
              }
              pretitulo
              titulo
              descripcion
            }
          }
        }
      `,
      undefined,
      REVALIDATE,
    )

    return data.opcionesAprendiendoJuntos?.opcionesPaginaRecursos ?? null
  } catch (err) {
    console.error('[getRecursosPageOptions] Error:', err)
    return null
  }
}
