import { fetchGraphQL } from '@/lib/graphql'
import type { WPHomeFields, WPHomeOptions } from '@/lib/types/home.types'

const REVALIDATE = 86400

export async function getPaginaHome(): Promise<WPHomeFields> {
  const data = await fetchGraphQL<WPHomeOptions>(
    `
      query GetPaginaHome {
        paginaHome {
          homeFields {
            imagenDestacada {
              node {
                sourceUrl
                altText
              }
            }
            metaTitle
            metaDescription
            heroPretitulo
            heroTitulo
            heroSubtitulo
            heroVideo {
              node {
                sourceUrl
                mediaItemUrl
              }
            }
            heroCtaPrimarioLabel
            heroCtaPrimarioHref
            heroCtaSecundarioLabel
            heroCtaSecundarioHref
            keywords {
              texto
              emoji
            }
            sobreImagen {
              node {
                sourceUrl
                altText
              }
            }
            sobrePretitulo
            sobreTitulo
            sobreDescripcion
            sobreBotonLabel
            serviciosPretitulo
            serviciosTitulo
            serviciosParrafo
            serviciosBotonLabel
            serviciosBotonHref
            programasPretitulo
            programasTitulo
            programasParrafo
            programasBotonLabel
            programasBotonHref
            procesoPretitulo
            procesoTitulo
            procesoParrafo
            procesoCtaLabel
            procesoCtaHref
            procesoPasos {
              numero
              titulo
              descripcion
              imagen {
                node {
                  sourceUrl
                  altText
                }
              }
            }
            diferencialesPretitulo
            diferencialesTitulo
            diferencialesParrafo
            diferencialesItems {
              titulo
              descripcion
              imagen {
                node {
                  sourceUrl
                  altText
                }
              }
            }
            testimoniosPretitulo
            testimoniosTitulo
            testimoniosParrafo
            testimoniosBotonLabel
            testimoniosBotonHref
            faqsPretitulo
            faqsTitulo
            faqsParrafo
            faqsCtaLabel
            faqsCtaHref
            ctaPretitulo
            ctaTitulo
            ctaCuerpo
            ctaBotonTexto
            ctaBotonUrl
            ctaImagen {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    `,
    undefined,
    REVALIDATE,
  )

  return data.paginaHome?.homeFields ?? {
    heroTitulo: 'Potenciamos el aprendizaje de cada persona',
  }
}
