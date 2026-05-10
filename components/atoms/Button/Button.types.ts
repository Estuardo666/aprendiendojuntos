import type { IconName } from '@/lib/icons';

export type ButtonVariant = 'primary' | 'secondary' | 'celeste' | 'ghost' | 'whatsapp' | 'dark';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonIconAnimation = 'none' | 'slide';

export interface ButtonProps {
  children: React.ReactNode;
  variant: ButtonVariant;
  size?: ButtonSize;
  iconName?: IconName;
  iconAnimation?: ButtonIconAnimation;
  /** Si se pasa, renderiza como <a> usando next/link */
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  /** Color inicial del gradiente (ej: "#FDD904"). Solo aplica a variante primary con slide animation */
  gradientStart?: string;
  /** Color final del gradiente (ej: "#F9B50B"). Solo aplica a variante primary con slide animation */
  gradientEnd?: string;
  /** Color del texto en hover (ej: "#FFFFFF"). Solo aplica con slide animation */
  hoverTextColor?: string;
  /** Color del fill que aparece en hover (ej: "#117FC3"). Solo aplica con slide animation */
  fillColor?: string;
}
