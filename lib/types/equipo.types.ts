import type { WPImage } from './shared.types';

export interface WPMiembroEquipoFields {
  cargo: string;
  especialidades: { especialidad: string }[] | null;
  bioCosta: string | null;
  foto: WPImage | null;
}

export interface WPMiembroEquipo {
  id: string;
  title: string;
  slug: string;
  miembroEquipoFields: WPMiembroEquipoFields;
}
