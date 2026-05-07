import Link from 'next/link';
import { InstagramIcon, FacebookIcon } from '@/lib/icons';
import { cn } from '@/lib/utils/cn';
import type { SocialLinkProps } from './SocialLink.types';

// Íconos y etiquetas accesibles por plataforma
// Importado directamente de lib/icons.ts para no violar la regla de no importar de components/
const platformConfig = {
  instagram: {
    Icon: InstagramIcon,
    label: 'Instagram',
  },
  facebook: {
    Icon: FacebookIcon,
    label: 'Facebook',
  },
};

export function SocialLink({ platform, href, className }: SocialLinkProps) {
  const { Icon, label } = platformConfig[platform];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visitar ${label}`}
      className={cn(
        'inline-flex items-center justify-center w-9 h-9 rounded-full',
        'text-brand-celeste hover:text-brand-azul',
        'transition-colors duration-200',
        className,
      )}
    >
      <span className="w-5 h-5">
        <Icon />
      </span>
    </Link>
  );
}
