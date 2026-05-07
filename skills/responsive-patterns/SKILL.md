---
name: responsive-patterns
description: >
  PUSHY — Activate when: creating any organismo or template, asking about
  mobile/breakpoints/grid/layout, mentioning navbar mobile/drawer/hamburger,
  designing a card grid (services/programs/team), asking how it looks on mobile.
  Never skip this skill for layout work.
---

# Responsive Patterns — Centro Aprendiendo Juntos

## 1. Principio mobile-first

Escribir la clase base (mobile) primero, luego sobreescribir en breakpoints mayores.

```tsx
// ✅ correcto
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// ❌ incorrecto
className="grid grid-cols-3 max-md:grid-cols-1"
```

**Breakpoints (defaults de Tailwind, no customizar):**

| Prefijo | Mínimo | Objetivo |
| (base) | 0px | Mobile portrait |
| sm: | 640px | Mobile landscape |
| md: | 768px | Tablet |
| lg: | 1024px | Desktop |
| xl: | 1280px | Desktop wide |

## 2. Grids canónicos

```tsx
// ServicesGrid / ProgramsGrid / ValuesSection (3 cols)
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"

// TeamSection (2 cols, centrado si 1 item)
className="grid grid-cols-1 sm:grid-cols-2 gap-8"
// con 1 item: className="flex justify-center"

// FAQSection (siempre 1 columna, centrado)
className="flex flex-col gap-4 max-w-3xl mx-auto"

// TestimonialsCarousel
className="flex overflow-x-auto scroll-snap-x snap-mandatory"
// cada item:
className="snap-start shrink-0 w-full md:w-1/2 lg:w-1/3"
```

## 3. Navbar mobile/desktop

```tsx
// Contenedor
className="flex items-center justify-between px-4 lg:px-8 py-4"

// Links desktop
className="hidden lg:flex gap-8"

// Botón hamburguesa
className="flex lg:hidden"

// Drawer mobile
className="fixed inset-y-0 left-0 w-72 bg-brand-blanco
  transform transition-transform duration-300
  -translate-x-full" // abierto: translate-x-0

// Overlay
className="fixed inset-0 bg-black/40 lg:hidden"
```

MobileMenu necesita `'use client'` + `useMobileMenu` hook.

## 4. Secciones — padding y max-width

Todo organismo que sea sección usa este wrapper canónico:

```tsx
<section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-crema">
  <div className="max-w-7xl mx-auto">
    {children}
  </div>
</section>
```

Fondo alternado: `bg-brand-blanco` en secciones pares.

## 5. HeroSection responsive

```tsx
// Contenedor
className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16"

// Texto
className="text-center lg:text-left w-full lg:w-1/2"

// Imagen
className="w-full lg:w-1/2 aspect-video lg:aspect-square"

// Heading: text-h1 mobile, text-display desktop
className="text-h1 lg:text-display"

// Botones: apilados mobile, fila desktop
className="flex flex-col sm:flex-row gap-3 sm:gap-4"
```

## 6. Tipografía responsive

| Elemento | Mobile | Desktop |
| H1 página | text-h1 | text-display |
| H2 sección | text-h2 | — |
| H3 card | text-h3 | — |
| Lead | text-lead | — |
| Body | text-body | — |

Solo H1 cambia entre mobile y desktop. Patrón: `className="text-h1 lg:text-display"`

## 7. Imágenes responsive con next/image

```tsx
// Cards (3-column grid)
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

// Hero (above the fold)
priority sizes="100vw"

// Avatares (TeamMemberCard)
sizes="(max-width: 768px) 80px, 120px"
```

## 8. Anti-patrones responsive

- No usar px fijos para anchos — usar %, vw o Tailwind fractions
- No usar max-width inline — usar clases canónicas de sección 4
- No ocultar contenido con visibility:hidden — usar hidden/block
- No hacer responsive con JS — solo Tailwind breakpoints
- No usar componentes separados para mobile/desktop — uno solo con clases
