import { fetchGraphQL } from '@/lib/graphql'
import type { WPPaginaRecursosOptions } from '@/lib/types/recurso.types'

const REVALIDATE = 0

export async function getRecursosPageOptions(): Promise<WPPaginaRecursosOptions | null> {
  try {
    const data = await fetchGraphQL<{
      opcionesAprendiendoJuntos?: {
        opcionesPaginaRecursos?: {
          recursosBgHeroImagen?: { node?: { sourceUrl: string; altText?: string | null } | null } | null
          recursosPretitulo?: string | null
          recursosTitulo?: string | null
          recursosDescripcion?: string | null
        } | null
      } | null
    }>(
      `
        query GetOpcionesPaginaRecursos {
          opcionesAprendiendoJuntos {
            opcionesPaginaRecursos {
              recursosBgHeroImagen {
                node {
                  sourceUrl
                  altText
                }
              }
              recursosPretitulo
              recursosTitulo
              recursosDescripcion
            }
          }
        }
      `,
      undefined,
      REVALIDATE,
    )

    const raw = data.opcionesAprendiendoJuntos?.opcionesPaginaRecursos
    if (!raw) return null
    return {
      bgHeroImagen: raw.recursosBgHeroImagen?.node
        ? { node: { sourceUrl: raw.recursosBgHeroImagen.node.sourceUrl, altText: raw.recursosBgHeroImagen.node.altText ?? '' } }
        : undefined,
      pretitulo: raw.recursosPretitulo ?? null,
      titulo: raw.recursosTitulo ?? null,
      descripcion: raw.recursosDescripcion ?? null,
    }
  } catch (err) {
    console.error('[getRecursosPageOptions] Error:', err)
    return null
  }
}
