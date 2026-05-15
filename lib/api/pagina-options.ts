import { fetchGraphQL } from '@/lib/graphql'
import type { WPPaginaHeroOptions } from '@/lib/types/pagina-options.types'

const REVALIDATE = 86400

export async function getServiciosPageOptions(): Promise<WPPaginaHeroOptions | null> {
  try {
    const data = await fetchGraphQL<{
      opcionesAprendiendoJuntos?: {
        opcionesPaginaServicios?: WPPaginaHeroOptions | null
      } | null
    }>(
      `
        query GetOpcionesPaginaServicios {
          opcionesAprendiendoJuntos {
            opcionesPaginaServicios {
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

    return data.opcionesAprendiendoJuntos?.opcionesPaginaServicios ?? null
  } catch (err) {
    console.error('[getServiciosPageOptions] Error:', err)
    return null
  }
}

export async function getProgramasPageOptions(): Promise<WPPaginaHeroOptions | null> {
  try {
    const data = await fetchGraphQL<{
      opcionesAprendiendoJuntos?: {
        opcionesPaginaProgramas?: WPPaginaHeroOptions | null
      } | null
    }>(
      `
        query GetOpcionesPaginaProgramas {
          opcionesAprendiendoJuntos {
            opcionesPaginaProgramas {
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

    return data.opcionesAprendiendoJuntos?.opcionesPaginaProgramas ?? null
  } catch (err) {
    console.error('[getProgramasPageOptions] Error:', err)
    return null
  }
}
