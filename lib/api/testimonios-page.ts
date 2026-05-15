import { fetchGraphQL } from '@/lib/graphql'
import type { WPPaginaTestimoniosOptions } from '@/lib/types/testimonios-page.types'

const REVALIDATE = 86400

export async function getTestimoniosPageOptions(): Promise<WPPaginaTestimoniosOptions | null> {
  try {
    const data = await fetchGraphQL<{
      opcionesAprendiendoJuntos?: {
        opcionesPaginaTestimonios?: WPPaginaTestimoniosOptions | null
      } | null
    }>(
      `
        query GetOpcionesPaginaTestimonios {
          opcionesAprendiendoJuntos {
            opcionesPaginaTestimonios {
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

    return data.opcionesAprendiendoJuntos?.opcionesPaginaTestimonios ?? null
  } catch (err) {
    console.error('[getTestimoniosPageOptions] Error:', err)
    return null
  }
}
