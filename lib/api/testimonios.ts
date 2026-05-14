import { fetchGraphQL } from '@/lib/graphql'
import type { WPTestimonio } from '@/lib/types/testimonio.types'

interface GetTestimoniosData {
  testimonios: {
    nodes: WPTestimonio[]
  }
}

const REVALIDATE = 3600

export async function getTestimonios(): Promise<WPTestimonio[]> {
  const data = await fetchGraphQL<GetTestimoniosData>(
    `
      query GetTestimonios {
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
              tituloCortoCard
              descripcionCortaCard
              videoTestimonial {
                url
                mimeType
              }
              servicioRelacionado {
                ... on AjServicio {
                  id
                  title
                  slug
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
}
