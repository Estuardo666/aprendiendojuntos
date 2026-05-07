export interface ContactoHeroData {
  pretitulo: string;
  titulo: string;
  descripcion: string;
}

export interface DireccionData {
  direccion: string;
  horarios: string;
}

export interface NumeroContacto {
  nombre: string;
  numero: string;
  descripcion?: string;
}

export interface CorreoContacto {
  nombre: string;
  correo: string;
  descripcion?: string;
}

export interface RedSocial {
  icono: 'facebook' | 'instagram' | 'tiktok' | 'youtube' | 'google';
  link: string;
  nombreRed: string;
}

export interface ContactoInfoItemData {
  iconoSrc: string;
  valor: string;
  descripcion?: string;
  href?: string;
}

export interface ContactoInfoSectionData {
  pretitulo: string;
  items: ContactoInfoItemData[];
}

export type ContactoSocialPlatform = RedSocial['icono'];

export interface ContactoSocialLinkData {
  plataforma: ContactoSocialPlatform;
  nombre: string;
  href: string;
}

export interface ContactoPageData {
  hero: ContactoHeroData;
  ubicacion: DireccionData;
  numeros: NumeroContacto[];
  correos: CorreoContacto[];
  redes: RedSocial[];
}