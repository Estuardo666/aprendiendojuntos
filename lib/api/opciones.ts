import { fetchGraphQL } from '@/lib/graphql';
import type { WPOpciones, WPOpcionesGlobales } from '@/lib/types/opciones.types';

const REVALIDATE = 86400;

export async function getOpciones(): Promise<WPOpcionesGlobales> {
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
            contactoMapsUrl
            redesInstagram
            redesFacebook
            mensajeBienvenida
          }
        }
      }
    `,
    undefined,
    REVALIDATE,
  );

  return data.opcionesAprendiendoJuntos.opcionesGlobales;
}
