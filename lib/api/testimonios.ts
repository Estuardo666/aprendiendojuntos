import { fetchGraphQL } from '@/lib/graphql'
import type { WPTestimonio } from '@/lib/types/testimonio.types'

interface GetTestimoniosData {
  testimonios: {
    nodes: WPTestimonio[]
  }
}

const REVALIDATE = 3600

export async function getTestimonios(): Promise<WPTestimonio[]> {
  try {
    const data = await fetchGraphQL<GetTestimoniosData>(
      `
        query GetTestimonios {
          testimonios(first: 12, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
              id
              databaseId
              title
              slug
              date
              testimonioFields {
                autorNombre
                autorRol
                texto
                calificacion
                tituloCortoCard
                descripcionCortaCard
                videoTestimonial {
                  node {
                    mediaItemUrl
                    mimeType
                  }
                }
                imagenDestacadaTestimonio {
                  node {
                    sourceUrl
                    altText
                  }
                }
                servicioRelacionado {
                  nodes {
                    ... on Servicio {
                      id
                      title
                      slug
                    }
                  }
                }
              }
              featuredImage {
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

    return data.testimonios.nodes
  } catch (err) {
    console.error('[getTestimonios] Error con campos nuevos, fallback:', err)
    // Fallback: query sin campos nuevos para aislar el problema
    const data = await fetchGraphQL<GetTestimoniosData>(
      `
        query GetTestimoniosFallback {
          testimonios(first: 12, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
              id
              databaseId
              title
              slug
              testimonioFields {
                autorNombre
                autorRol
                texto
                calificacion
              }
              featuredImage {
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
    return data.testimonios.nodes
  }
}
