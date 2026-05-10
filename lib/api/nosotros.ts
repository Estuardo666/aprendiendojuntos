import { fetchGraphQL } from '@/lib/graphql';
import type { WPImagen, WPPaginaNosotrosFields } from '@/lib/types/nosotros.types';

// Contenido estático: revalidar cada 24 horas
const REVALIDATE = 86400;

type WPImagenEdge = {
  node?: WPImagen | null;
} | null;

type WPPaginaNosotrosRaw = {
  paginaNosotros: {
    nosotrosFields: Omit<
      WPPaginaNosotrosFields,
      'imagenDestacada' | 'heroVideo' | 'heroImagenes' | 'historiaImagenes' | 'ctaImagen'
    > & {
      imagenDestacada?: WPImagenEdge;
      heroVideo?: WPImagenEdge;
      heroImagenes?: Array<{ imagen?: WPImagenEdge } | null> | null;
      historiaImagenes?: Array<{ imagen?: WPImagenEdge } | null> | null;
      ctaImagen?: WPImagenEdge;
    };
  };
};

export async function getPaginaNosotros(): Promise<WPPaginaNosotrosFields> {
  const data = await fetchGraphQL<WPPaginaNosotrosRaw>(
    `
      query GetPaginaNosotros {
        paginaNosotros {
          nosotrosFields {
            imagenDestacada {
              node {
                sourceUrl
                altText
              }
            }
            heroVideo {
              node {
                sourceUrl
                mediaItemUrl
              }
            }
            heroPretitulo
            heroTitulo
            heroSubtitulo
            heroImagenes {
              imagen {
                node {
                  sourceUrl
                  altText
                }
              }
            }
            historiaPretitulo
            historiaTitulo
            historiaCuerpo
            historiaImagenes {
              imagen {
                node {
                  sourceUrl
                  altText
                }
              }
            }
            propositoCuerpo
            misionCuerpo
            visionCuerpo
            valoresPretitulo
            valoresTitulo
            valoresIntro
            valores {
              titulo
              descripcion
              iconoEmoji
            }
            diferencialPretitulo
            diferencialTitulo
            diferencialItems {
              titulo
              descripcion
            }
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
  );

  const fields = data.paginaNosotros.nosotrosFields;

  return {
    ...fields,
    imagenDestacada: fields.imagenDestacada?.node ?? undefined,
    heroVideo: fields.heroVideo?.node?.mediaItemUrl ?? fields.heroVideo?.node?.sourceUrl ?? undefined,
    heroImagenes: (fields.heroImagenes ?? [])
      .map((item) => {
        const imagen = item?.imagen?.node;
        return imagen ? { imagen } : null;
      })
      .filter((item): item is { imagen: WPImagen } => Boolean(item)),
    historiaImagenes: (fields.historiaImagenes ?? [])
      .map((item) => {
        const imagen = item?.imagen?.node;
        return imagen ? { imagen } : null;
      })
      .filter((item): item is { imagen: WPImagen } => Boolean(item)),
    ctaImagen: fields.ctaImagen?.node ?? undefined,
  };
}
