import { fetchGraphQL } from '@/lib/graphql'
import type { WPPaginaTestimoniosOptions } from '@/lib/types/testimonios-page.types'

const REVALIDATE = 86400

export async function getTestimoniosPageOptions(): Promise<WPPaginaTestimoniosOptions | null> {
  try {
    const data = await fetchGraphQL<{
      opcionesAprendiendoJuntos?: {
        opcionesPaginaTestimonios?: {
          testimoniosBgHeroImagen?: { node?: { sourceUrl: string; altText?: string | null } | null } | null
          testimoniosPretitulo?: string | null
          testimoniosTitulo?: string | null
          testimoniosDescripcion?: string | null
        } | null
      } | null
    }>(
      `
        query GetOpcionesPaginaTestimonios {
          opcionesAprendiendoJuntos {
            opcionesPaginaTestimonios {
              testimoniosBgHeroImagen {
                node {
                  sourceUrl
                  altText
                }
              }
              testimoniosPretitulo
              testimoniosTitulo
              testimoniosDescripcion
            }
          }
        }
      `,
      undefined,
      REVALIDATE,
    )

    const raw = data.opcionesAprendiendoJuntos?.opcionesPaginaTestimonios
    if (!raw) return null
    return {
      bgHeroImagen: raw.testimoniosBgHeroImagen?.node
        ? { node: { sourceUrl: raw.testimoniosBgHeroImagen.node.sourceUrl, altText: raw.testimoniosBgHeroImagen.node.altText ?? '' } }
        : undefined,
      pretitulo: raw.testimoniosPretitulo ?? null,
      titulo: raw.testimoniosTitulo ?? null,
      descripcion: raw.testimoniosDescripcion ?? null,
    }
  } catch (err) {
    console.error('[getTestimoniosPageOptions] Error:', err)
    return null
  }
}
