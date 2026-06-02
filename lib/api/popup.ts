import { fetchGraphQL } from '@/lib/graphql';

const REVALIDATE = 3600;

interface WPImageNode {
  node: {
    sourceUrl: string;
    altText: string | null;
  };
}

export interface PopupData {
  popupActivo: boolean;
  popupDelay: number;
  popupImagen: WPImageNode | null;
  popupUrl: string | null;
}

interface PopupQueryResponse {
  opcionesAprendiendoJuntos: {
    popupFields: PopupData;
  };
}

export async function getPopup(): Promise<PopupData | null> {
  try {
    const data = await fetchGraphQL<PopupQueryResponse>(
      `
        query GetPopup {
          opcionesAprendiendoJuntos {
            popupFields {
              popupActivo
              popupDelay
              popupImagen {
                node {
                  sourceUrl
                  altText
                }
              }
              popupUrl
            }
          }
        }
      `,
      undefined,
      REVALIDATE,
    );

    return data?.opcionesAprendiendoJuntos?.popupFields ?? null;
  } catch {
    return null;
  }
}
