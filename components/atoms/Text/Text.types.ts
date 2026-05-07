export type TextVariant = 'lead' | 'body' | 'small' | 'caption';
export type TextColor = 'default' | 'muted' | 'blanco';
export type TextTag = 'p' | 'span' | 'div';

export interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  as?: TextTag;
  /** id HTML para aria-describedby */
  id?: string;
  /** role ARIA (ej. 'alert') */
  role?: string;
  className?: string;
  children: React.ReactNode;
}
