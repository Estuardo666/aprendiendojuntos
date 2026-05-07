import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { cn } from '@/lib/utils/cn';
import type { IconName } from '@/lib/icons';
import type { ContactItemProps, ContactItemType } from './ContactItem.types';

// Mapa de tipo de contacto → nombre de icono
const iconMap: Record<ContactItemType, IconName> = {
  telefono: 'PhoneIcon',
  whatsapp: 'WhatsappIcon',
  email: 'MailIcon',
  direccion: 'MapPinIcon',
  horario: 'ClockIcon',
};

export function ContactItem({ type, label, value, href, className }: ContactItemProps) {
  const iconName = iconMap[type];

  // Contenido interior compartido entre <a> y <div>
  const inner = (
    <>
      <span className="w-10 h-10 rounded-xl bg-brand-azul/5 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-celeste/10 transition-colors">
        <Icon name={iconName} size="sm" color="azul" />
      </span>
      <div>
        <Text variant="caption" color="muted">
          {label}
        </Text>
        <Text variant="small" color="default" className="font-medium">
          {value}
        </Text>
      </div>
    </>
  );

  const baseClasses = cn(
    'flex items-center gap-3 group hover:text-brand-celeste transition-colors',
    className,
  );

  // Con href: renderizar como enlace
  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {inner}
      </a>
    );
  }

  // Sin href: renderizar como div
  return <div className={baseClasses}>{inner}</div>;
}
