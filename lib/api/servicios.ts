import { fetchGraphQL } from '@/lib/graphql'
import type { WPServicio, WPServicioResumen } from '@/lib/types/servicio.types'

// ─── Fragments reutilizables ──────────────────────────────────

// Campos de un MediaItem de WP
const MEDIA_ITEM_FIELDS = `
  sourceUrl
  altText
`

// Fragment imagen para campos ACF (AcfMediaItemConnectionEdge → requiere .node)
const IMAGEN_FIELDS = `
  node {
    ${MEDIA_ITEM_FIELDS}
  }
`

// Fragment servicio resumido (para listados y relacionados)
const SERVICIO_RESUMEN_FIELDS = `
  id
  title
  slug
  servicioFields {
    descripcionCorta
    iconoEmoji
    categoria
    destacado
  }
  featuredImage {
    node {
      ${MEDIA_ITEM_FIELDS}
    }
  }
`

// ─── Queries ─────────────────────────────────────────────────

const GET_SERVICIOS = `
  query GetServicios {
    servicios(first: 100) {
      nodes {
        ${SERVICIO_RESUMEN_FIELDS}
      }
    }
  }
`

const GET_SERVICIO = `
  query GetServicio($slug: ID!) {
    servicio(id: $slug, idType: SLUG) {
      id
      title
      slug
      servicioFields {
        descripcionCorta
        descripcionLarga
        iconoEmoji
        categoria
        destacado
        imagenHero { ${IMAGEN_FIELDS} }
        ctaHeroSecundarioLabel
        ctaHeroSecundarioHref
        metaDescripcion
        proceso {
          numero
          titulo
          descripcion
          ctaLabel
          ctaHref
          imagen { ${IMAGEN_FIELDS} }
        }
        tags { tag }
        serviciosRelacionados {
          nodes {
            ... on Servicio {
              id
              title
              slug
              servicioFields {
                descripcionCorta
                iconoEmoji
                categoria
              }
              featuredImage {
                node { ${MEDIA_ITEM_FIELDS} }
              }
            }
          }
        }
        ctaHeading
        ctaDescripcion
        ctaLabel
        ctaHref
        ctaImagen { ${IMAGEN_FIELDS} }
        faqsPersonalizadas {
          nodes {
            ... on Faq {
              id
              faqFields {
                pregunta
                respuesta
                orden
              }
            }
          }
        }
        keywordsMarquee {
          texto
          emoji
        }
      }
      featuredImage {
        node { ${MEDIA_ITEM_FIELDS} }
      }
    }
  }
`

const GET_SERVICIOS_BY_CATEGORIA = `
  query GetServiciosByCategoria($categoria: String!) {
    servicios(
      first: 100
      where: { metaQuery: {
        metaArray: [{
          key: "categoria"
          value: $categoria
          compare: EQUAL_TO
        }]
      }}
    ) {
      nodes {
        ${SERVICIO_RESUMEN_FIELDS}
      }
    }
  }
`

// ─── Funciones fetch ──────────────────────────────────────────

// Lista completa para generateStaticParams y listados
export const getServicios = () =>
  fetchGraphQL<{ servicios: { nodes: WPServicioResumen[] } }>(
    GET_SERVICIOS,
    {},
    3600
  ).then(d => d.servicios.nodes)

// Detalle completo para página de servicio
export const getServicio = (slug: string) =>
  fetchGraphQL<{ servicio: WPServicio }>(
    GET_SERVICIO,
    { slug },
    86400
  ).then(d => d.servicio)

// Por categoría para filtros
export const getServiciosByCategoria = (categoria: string) =>
  fetchGraphQL<{ servicios: { nodes: WPServicioResumen[] } }>(
    GET_SERVICIOS_BY_CATEGORIA,
    { categoria },
    3600
  ).then(d => d.servicios.nodes)
