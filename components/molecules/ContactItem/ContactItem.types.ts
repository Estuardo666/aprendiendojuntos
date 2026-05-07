export type ContactItemType = 'telefono' | 'whatsapp' | 'email' | 'direccion' | 'horario';

export interface ContactItemProps {
  type: ContactItemType;
  label: string;
  value: string;
  /** href para el enlace: tel:, mailto:, https://maps... */
  href?: string;
  className?: string;
}
