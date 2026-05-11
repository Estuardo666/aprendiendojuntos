import { fetchGraphQL } from '@/lib/graphql';
import type { WPOpciones, WPOpcionesGlobales, WPEncabezadoFields } from '@/lib/types/opciones.types';

const REVALIDATE = 86400;

export async function getOpciones(): Promise<WPOpcionesGlobales & { encabezado?: WPEncabezadoFields | null }> {
  const data = await fetchGraphQL<WPOpciones>(
    `
      query GetOpciones {
        opcionesAprendiendoJuntos {
          opcionesGlobales {
            heroTitulo
            heroSubtitulo
            ctaTexto
            ctaWhatsappNumero
            contactoTelefono
            contactoDireccion
            contactoMapsUrl
            redesInstagram
            redesFacebook
            mensajeBienvenida
          }
        }
        paginaEncabezado {
          encabezadoFields {
            logoHeader {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            boton1Texto
            boton1Url
            boton2Texto
            boton2Url
          }
        }
      }
    `,
    undefined,
    REVALIDATE,
  );

  return {
    ...data.opcionesAprendiendoJuntos.opcionesGlobales,
    encabezado: data.paginaEncabezado?.encabezadoFields ?? null,
  };
}
