import { fetchGraphQL } from '@/lib/graphql';
import type { ContactoPageData } from '@/lib/types/contacto.types';

export interface WPNumero {
  nombre: string;
  numero: string;
  descripcion?: string | null;
}

export interface WPCorreo {
  nombre: string;
  correo: string;
  descripcion?: string | null;
}

export interface WPRedSocial {
  icono: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'google';
  link: string;
  nombreRed: string;
}

export interface WPContacto {
  contactoPageFields: {
    pretitulo: string;
    titulo: string;
    descripcion: string;
  };
  contactoDatosFields: {
    direccion: string;
    horarios: string;
    numeros?: WPNumero[] | null;
    correos?: WPCorreo[] | null;
    redesSociales?: WPRedSocial[] | null;
  };
}

export interface WPPaginaContacto {
  paginaContacto: WPContacto;
}

const REVALIDATE = 86400;

function mapContactoData(contacto: WPContacto): ContactoPageData {
  return {
    hero: {
      pretitulo: contacto.contactoPageFields.pretitulo,
      titulo: contacto.contactoPageFields.titulo,
      descripcion: contacto.contactoPageFields.descripcion,
    },
    ubicacion: {
      direccion: contacto.contactoDatosFields.direccion,
      horarios: contacto.contactoDatosFields.horarios,
    },
    numeros: (contacto.contactoDatosFields.numeros ?? []).map((numero) => ({
      nombre: numero.nombre,
      numero: numero.numero,
      descripcion: numero.descripcion ?? undefined,
    })),
    correos: (contacto.contactoDatosFields.correos ?? []).map((correo) => ({
      nombre: correo.nombre,
      correo: correo.correo,
      descripcion: correo.descripcion ?? undefined,
    })),
    redes: contacto.contactoDatosFields.redesSociales ?? [],
  };
}

export async function getContacto(): Promise<ContactoPageData | null> {
  const data = await fetchGraphQL<WPPaginaContacto>(
    `
      query GetContacto {
        paginaContacto {
          contactoPageFields {
            pretitulo
            titulo
            descripcion
          }
          contactoDatosFields {
            direccion
            horarios
            numeros {
              nombre
              numero
              descripcion
            }
            correos {
              nombre
              correo
              descripcion
            }
            redesSociales {
              icono
              link
              nombreRed
            }
          }
        }
      }
    `,
    undefined,
    REVALIDATE,
  );

  return data.paginaContacto ? mapContactoData(data.paginaContacto) : null;
}