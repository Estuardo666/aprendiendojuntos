export interface NavLinkProps {
  href: string;
  label: string;
  /** Forzar estado activo. Si no se pasa, se detecta con usePathname. */
  active?: boolean;
  className?: string;
}
