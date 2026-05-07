---
name: atomic-components
description: >
  PUSHY — Activate when: creating any component in components/, asking how to
  structure an atom/molecule/organism/template, generating Button/Card/Section/
  Grid or any UI element, asking about props/types/exports/folder structure.
  Never skip this skill for component work.
---

# Atomic Components — Centro Aprendiendo Juntos

## 1. Estructura de carpeta por componente (obligatoria)

Todo componente tiene exactamente 3 archivos:

```
components/<nivel>/<NombreComponente>/
├── <NombreComponente>.tsx
├── <NombreComponente>.types.ts
└── index.ts
```

**Ejemplo — Button:**

`Button.types.ts`:
```ts
export interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
```

`Button.tsx`:
```tsx
import Link from 'next/link';
import { ButtonProps } from './Button.types';
import { cn } from '@/lib/utils/cn';

const variantClasses = {
  primary: 'bg-brand-naranja text-white font-heading',
  secondary: 'border-2 border-brand-azul text-brand-azul',
  ghost: 'text-brand-celeste underline',
  whatsapp: 'bg-green-500 text-white',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-small',
  md: 'px-5 py-2.5 text-body',
  lg: 'px-7 py-3.5 text-lead',
};

export function Button({ children, variant, size = 'md', href, onClick, disabled, className }: ButtonProps) {
  const classes = cn(variantClasses[variant], sizeClasses[size], className);
  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button onClick={onClick} disabled={disabled} className={classes}>{children}</button>;
}
```

`index.ts`:
```ts
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

## 2. Checklist por nivel atómico

**Átomo:**
- [ ] No importa nada de components/
- [ ] Props solo de presentación (strings, numbers, booleans, ReactNode)
- [ ] Sin fetch, sin lógica de negocio
- [ ] Sin 'use client' salvo estado visual simple
- [ ] Tiene .types.ts y index.ts

**Molécula:**
- [ ] Solo importa de components/atoms/
- [ ] Sin fetch
- [ ] Una función de UI clara — si hace dos cosas, dividir
- [ ] Props tipadas en .types.ts

**Organismo:**
- [ ] Solo importa de atoms/ y molecules/
- [ ] Sin fetch — recibe datos por props
- [ ] Sección visual completa y autónoma
- [ ] Sin 'use client' salvo interacción necesaria (carousel, accordion)

**Template:**
- [ ] Solo importa organisms/
- [ ] Sin datos reales — solo props tipadas
- [ ] Define zonas y layout, nada más

## 3. Tabla de componentes

**Átomos:**

| Componente | Props clave | Notas |
| Button | variant, size, href | `<Link>` si href, `<button>` si no |
| Heading | level: 1-6, variant | variant desacoplado del level semántico |
| Text | variant: lead/body/small/caption | Siempre `<p>` |
| Badge | variant: neuropsicologia/psicopedagogia/... | Color por variante |
| Icon | emoji: string, size: sm/md/lg | Wrapper con aria-hidden |
| Avatar | src?, alt, initials | Fallback a iniciales |
| Logo | variant: color/blanco, size | SVG inline |
| Tag | label, color? | Pill redondeado |
| Divider | color? | `<hr>` con variante |

**Moléculas:**

| Componente | Átomos que usa | Función |
| ServiceCard | Icon+Badge+Heading+Text+Button | Card de servicio |
| ProgramCard | Badge+Heading+Text+lista | Card de programa |
| TestimonialCard | Avatar+Text+StarRating+Tag | Testimonio con calificación |
| TeamMemberCard | Avatar+Heading+Text | Miembro del equipo |
| FAQItem | Heading+Text | Accordion (necesita 'use client') |
| ValueItem | Icon+Heading+Text | Valor institucional |
| ContactItem | Icon+Text | Teléfono, dirección, etc. |
| NavLink | Text | Link con estado activo (necesita 'use client') |
| SocialLink | Icon+Text | Red social |
| FormField | Text+input/textarea | Label + campo + error |
| StarRating | — | Estrellas 1-5 display |

## 4. Reglas de 'use client'

Nunca por defecto. Solo si el componente necesita useState, useReducer, useEffect, event handlers del browser o browser APIs.

Componentes que SÍ necesitan 'use client':
- FAQItem (estado abierto/cerrado)
- MobileMenu (estado drawer)
- TestimonialsCarousel (estado slide activo)
- ContactForm (estado formulario)
- NavLink (usePathname)

Todos los demás: Server Components.

## 5. Extensión con className

Todo componente acepta `className?: string`. Se aplica con `cn()`:

`lib/utils/cn.ts`:
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Instalar: `npm install clsx tailwind-merge`

Uso: `className={cn(baseClasses, variantClasses, className)}`

## 6. Anti-patrones

- No crear componente genérico "Card" — cada card tiene su nombre
- No usar `style={{ }}` inline — solo Tailwind
- No saltarse niveles (organismo importando template)
- No poner lógica de fetch en ningún componente
- No exportar default — siempre named exports
- No omitir .types.ts aunque las props sean simples
