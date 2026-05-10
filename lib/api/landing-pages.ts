import { fetchGraphQL } from '@/lib/graphql'
import type { WPLandingPage, LandingPageData } from '@/lib/types/landing-page.types'

const REVALIDATE = 86400

interface GetLandingPageResponse {
  landingPage: WPLandingPage | null
}

interface GetLandingPagesResponse {
  landingPages: {
    nodes: Pick<WPLandingPage, 'id' | 'title' | 'slug'>[]
  }
}

function mapLandingPage(lp: WPLandingPage): LandingPageData {
  const f = lp.landingPageFields
  return {
    slug: lp.slug,
    title: lp.title,
    imagenHeroSrc: f.imagenHero?.node.sourceUrl ?? undefined,
    imagenHeroAlt: f.imagenHero?.node.altText ?? undefined,
    pretitulo: f.pretitulo ?? undefined,
    titulo: f.titulo,
    descripcionCorta: f.descripcionCorta ?? undefined,
    infoEvento: f.infoEvento ?? undefined,
    formTitulo: f.formTitulo ?? 'Reserva tu lugar',
    formCtaTexto: f.formCtaTexto ?? 'Reservar mi lugar',
    urgencia: f.urgencia ?? undefined,
    beneficios: f.beneficios?.map((b) => ({ icono: b.icono, texto: b.texto })) ?? undefined,
    faqs: f.faqs?.nodes
      .filter((n) => !!n.faqFields)
      .map((n) => ({
        id: n.id,
        pregunta: n.faqFields!.pregunta,
        respuesta: n.faqFields!.respuesta,
      })) ?? undefined,
    testimonios: f.testimonios?.nodes
      .filter((n) => !!n.testimonioFields)
      .map((n) => ({
        id: n.id,
        autor: n.testimonioFields!.autorNombre ?? '',
        cargo: n.testimonioFields!.autorRol ?? undefined,
        texto: n.testimonioFields!.texto,
        calificacion: n.testimonioFields!.calificacion ?? undefined,
      })) ?? undefined,
  }
}

export async function getLandingPage(slug: string): Promise<LandingPageData | null> {
  const data = await fetchGraphQL<GetLandingPageResponse>(
    `
      query GetLandingPage($slug: ID!) {
        landingPage(id: $slug, idType: SLUG) {
          id
          title
          slug
          landingPageFields {
            imagenHero {
              node {
                sourceUrl
                altText
              }
            }
            pretitulo
            titulo
            descripcionCorta
            infoEvento
            formTitulo
            formCtaTexto
            urgencia
            beneficios {
              icono
              texto
            }
            faqs {
              nodes {
                id
                ... on Faq {
                  faqFields {
                    pregunta
                    respuesta
                  }
                }
              }
            }
            testimonios {
              nodes {
                id
                ... on Testimonio {
                  testimonioFields {
                    autorNombre
                    autorRol
                    texto
                    calificacion
                  }
                }
              }
            }
          }
        }
      }
    `,
    { slug },
    REVALIDATE,
  )

  return data.landingPage ? mapLandingPage(data.landingPage) : null
}

export async function getLandingPageSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<GetLandingPagesResponse>(
    `
      query GetLandingPageSlugs {
        landingPages(first: 100) {
          nodes {
            slug
          }
        }
      }
    `,
    undefined,
    REVALIDATE,
  )

  return data.landingPages.nodes.map((n) => n.slug)
}
