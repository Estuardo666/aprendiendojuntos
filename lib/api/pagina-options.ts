import { fetchGraphQL } from '@/lib/graphql'
import type { WPPaginaHeroOptions } from '@/lib/types/pagina-options.types'

const REVALIDATE = 86400

export async function getServiciosPageOptions(): Promise<WPPaginaHeroOptions | null> {
  try {
    const data = await fetchGraphQL<{
      opcionesAprendiendoJuntos?: {
        opcionesPaginaServicios?: {
          serviciosBgHeroImagen?: { node?: { sourceUrl: string; altText?: string | null } | null } | null
          serviciosPretitulo?: string | null
          serviciosTitulo?: string | null
          serviciosDescripcion?: string | null
        } | null
      } | null
    }>(
      `
        query GetOpcionesPaginaServicios {
          opcionesAprendiendoJuntos {
            opcionesPaginaServicios {
              serviciosBgHeroImagen {
                node {
                  sourceUrl
                  altText
                }
              }
              serviciosPretitulo
              serviciosTitulo
              serviciosDescripcion
            }
          }
        }
      `,
      undefined,
      REVALIDATE,
    )

    const raw = data.opcionesAprendiendoJuntos?.opcionesPaginaServicios
    if (!raw) return null
    return {
      bgHeroImagen: raw.serviciosBgHeroImagen?.node
        ? { node: { sourceUrl: raw.serviciosBgHeroImagen.node.sourceUrl, altText: raw.serviciosBgHeroImagen.node.altText ?? '' } }
        : undefined,
      pretitulo: raw.serviciosPretitulo ?? null,
      titulo: raw.serviciosTitulo ?? null,
      descripcion: raw.serviciosDescripcion ?? null,
    }
  } catch (err) {
    console.error('[getServiciosPageOptions] Error:', err)
    return null
  }
}

export async function getProgramasPageOptions(): Promise<WPPaginaHeroOptions | null> {
  try {
    const data = await fetchGraphQL<{
      opcionesAprendiendoJuntos?: {
        opcionesPaginaProgramas?: {
          programasBgHeroImagen?: { node?: { sourceUrl: string; altText?: string | null } | null } | null
          programasPretitulo?: string | null
          programasTitulo?: string | null
          programasDescripcion?: string | null
        } | null
      } | null
    }>(
      `
        query GetOpcionesPaginaProgramas {
          opcionesAprendiendoJuntos {
            opcionesPaginaProgramas {
              programasBgHeroImagen {
                node {
                  sourceUrl
                  altText
                }
              }
              programasPretitulo
              programasTitulo
              programasDescripcion
            }
          }
        }
      `,
      undefined,
      REVALIDATE,
    )

    const raw = data.opcionesAprendiendoJuntos?.opcionesPaginaProgramas
    if (!raw) return null
    return {
      bgHeroImagen: raw.programasBgHeroImagen?.node
        ? { node: { sourceUrl: raw.programasBgHeroImagen.node.sourceUrl, altText: raw.programasBgHeroImagen.node.altText ?? '' } }
        : undefined,
      pretitulo: raw.programasPretitulo ?? null,
      titulo: raw.programasTitulo ?? null,
      descripcion: raw.programasDescripcion ?? null,
    }
  } catch (err) {
    console.error('[getProgramasPageOptions] Error:', err)
    return null
  }
}

export async function getArticulosPageOptions(): Promise<WPPaginaHeroOptions | null> {
  try {
    const data = await fetchGraphQL<{
      opcionesAprendiendoJuntos?: {
        opcionesPaginaArticulos?: {
          articulosBgHeroImagen?: { node?: { sourceUrl: string; altText?: string | null } | null } | null
          articulosPretitulo?: string | null
          articulosTitulo?: string | null
          articulosDescripcion?: string | null
        } | null
      } | null
    }>(
      `
        query GetOpcionesPaginaArticulos {
          opcionesAprendiendoJuntos {
            opcionesPaginaArticulos {
              articulosBgHeroImagen {
                node {
                  sourceUrl
                  altText
                }
              }
              articulosPretitulo
              articulosTitulo
              articulosDescripcion
            }
          }
        }
      `,
      undefined,
      REVALIDATE,
    )

    const raw = data.opcionesAprendiendoJuntos?.opcionesPaginaArticulos
    if (!raw) return null
    return {
      bgHeroImagen: raw.articulosBgHeroImagen?.node
        ? { node: { sourceUrl: raw.articulosBgHeroImagen.node.sourceUrl, altText: raw.articulosBgHeroImagen.node.altText ?? '' } }
        : undefined,
      pretitulo: raw.articulosPretitulo ?? null,
      titulo: raw.articulosTitulo ?? null,
      descripcion: raw.articulosDescripcion ?? null,
    }
  } catch (err) {
    console.error('[getArticulosPageOptions] Error:', err)
    return null
  }
}
