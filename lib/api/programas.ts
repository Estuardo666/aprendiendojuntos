import { fetchGraphQL } from '@/lib/graphql';
import type { WPPrograma } from '@/lib/types/programa.types';

interface GetProgramasData {
  programas: {
    nodes: WPPrograma[];
  };
}

interface GetProgramaData {
  programas: {
    nodes: WPPrograma[];
  };
}

const REVALIDATE = 86400;

export async function getProgramas(): Promise<WPPrograma[]> {
  const data = await fetchGraphQL<GetProgramasData>(
    `
      query GetProgramas {
        programas(first: 100) {
          nodes {
            id
            title
            slug
            programaFields {
              descripcion
              iconoEmoji
              edadObjetivo
              descripcionHeroTexto
              modalidad
              duracionSesion
              frecuencia
              fraseDestacada
              beneficios {
                beneficio
              }
              logoPrograma {
                node {
                  sourceUrl
                  altText
                }
              }
              imagenDestacada {
                node {
                  sourceUrl
                  altText
                }
              }
              galeria {
                imagen {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
              tags {
                nodes {
                  id
                  name
                  slug
                }
              }
              ctaPretitulo
              ctaTitulo
              descripcionCta
              ctaBotonTexto
              ctaLabel
              ctaHref
              cta2Label
              cta2Href
            }
          }
        }
      }
    `,
    undefined,
    REVALIDATE,
  );

  return data.programas.nodes;
}

export async function getPrograma(slug: string): Promise<WPPrograma | null> {
  const data = await fetchGraphQL<GetProgramaData>(
    `
      query GetPrograma($slug: String!) {
        programas(where: { name: $slug }, first: 1) {
          nodes {
            id
            title
            slug
            programaFields {
              descripcion
              iconoEmoji
              edadObjetivo
              descripcionHeroTexto
              modalidad
              duracionSesion
              frecuencia
              fraseDestacada
              beneficios {
                beneficio
              }
              logoPrograma {
                node {
                  sourceUrl
                  altText
                }
              }
              imagenDestacada {
                node {
                  sourceUrl
                  altText
                }
              }
              galeria {
                imagen {
                  node {
                    sourceUrl
                    altText
                  }
                }
              }
              tags {
                nodes {
                  id
                  name
                  slug
                }
              }
              ctaPretitulo
              ctaTitulo
              descripcionCta
              ctaBotonTexto
              ctaLabel
              ctaHref
              cta2Label
              cta2Href
            }
          }
        }
      }
    `,
    { slug },
    REVALIDATE,
  );

  return data.programas.nodes[0] ?? null;
}
