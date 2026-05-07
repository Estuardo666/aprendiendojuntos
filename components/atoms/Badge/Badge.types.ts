export type BadgeVariant =
  | 'neuropsicologia'
  | 'psicopedagogia'
  | 'lenguaje'
  | 'sensorial'
  | 'default';

export interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}
