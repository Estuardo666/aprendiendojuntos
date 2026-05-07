export type TagVariant = 'default' | 'destacado';

export interface TagProps {
  label: string;
  variant?: TagVariant;
  className?: string;
}
