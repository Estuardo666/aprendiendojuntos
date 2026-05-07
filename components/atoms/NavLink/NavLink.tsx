'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import type { NavLinkProps } from './NavLink.types';

export function NavLink({ href, label, active, className }: NavLinkProps) {
  // usePathname detecta la ruta activa automáticamente
  const pathname = usePathname();
  const isActive = active ?? pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'font-heading font-semibold text-brand-azul',
        'transition-colors duration-200 hover:text-brand-naranja',
        isActive && 'text-brand-naranja underline underline-offset-4',
        className,
      )}
    >
      {label}
    </Link>
  );
}
