import { fetchGraphQL } from '@/lib/graphql';
import type { WPMiembroEquipo } from '@/lib/types/equipo.types';

interface GetEquipoData {
  miembrosEquipo: {
    nodes: WPMiembroEquipo[];
  };
}

const REVALIDATE = 86400;

export async function getEquipo(): Promise<WPMiembroEquipo[]> {
  const data = await fetchGraphQL<GetEquipoData>(
    `
      query GetEquipo {
        miembrosEquipo(first: 100) {
          nodes {
            id
            title
            slug
            miembroEquipoFields {
              cargo
              especialidades {
                especialidad
              }
              bioCosta: bioCorta
              foto {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    `,
    undefined,
    REVALIDATE,
  );

  return data.miembrosEquipo.nodes;
}
