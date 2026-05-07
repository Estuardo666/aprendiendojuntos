---
name: tailwind-tokens
description: >
  PUSHY — Activate when: writing any className in a component, asking what
  color/font/size to use, mentioning background/text/border/hover/shadow,
  designing any atom/molecule/organism, asking how to apply brand identity.
  Never skip for any visual component work.
---

# Tailwind Tokens — Centro Aprendiendo Juntos

## 1. Regla crítica de colores

NUNCA usar colores primarios como fondo de página o sección.

| Color | Uso permitido | Uso prohibido |
| brand-naranja | CTAs, badges, acentos, bordes | Fondo de página/sección |
| brand-azul | Títulos, navbar, footer, texto | Fondo de página/sección |
| brand-celeste | Links, hover, iconos activos | Fondo de página/sección |
| brand-crema | Fondo de página SIEMPRE | Texto sobre fondo claro |
| brand-blanco | Fondo de cards, modales | Texto (bajo contraste) |

## 2. Mapeo situación → clase Tailwind

**Fondos:**

| Situación | Clase |
| Fondo de página | bg-brand-crema |
| Fondo de card/contenedor | bg-brand-blanco |
| Sección alternada (par) | bg-brand-crema |
| Sección alternada (impar) | bg-brand-blanco |
| Navbar | bg-brand-blanco shadow-sm |
| Footer | bg-brand-azul |
| Overlay modal/drawer | bg-black/40 |

**Textos:**

| Situación | Clase |
| Título H1-H3 | text-brand-azul font-heading |
| Título sobre fondo azul (footer) | text-brand-blanco font-heading |
| Párrafo cuerpo | text-gray-700 font-body |
| Texto secundario/caption | text-gray-500 font-body text-small |
| Link | text-brand-celeste hover:underline |
| Badge/label de categoría | text-brand-azul text-small font-heading |

**Botones:**

| Variante | Clase base | Hover |
| primary | bg-brand-naranja text-white font-heading px-6 py-3 rounded-lg | hover:bg-yellow-500 |
| secondary | border-2 border-brand-azul text-brand-azul font-heading px-6 py-3 rounded-lg | hover:bg-brand-azul hover:text-white |
| ghost | text-brand-celeste font-body underline | hover:text-brand-azul |
| whatsapp | bg-green-500 text-white font-heading px-6 py-3 rounded-lg | hover:bg-green-600 |

**Badges de categoría:**

| Categoría | Clase |
| neuropsicologia | bg-blue-100 text-brand-azul |
| psicopedagogia | bg-yellow-100 text-yellow-800 |
| lenguaje | bg-green-100 text-green-800 |
| sensorial | bg-purple-100 text-purple-800 |
| otro | bg-gray-100 text-gray-700 |

**Cards:**

```
bg-brand-blanco rounded-2xl shadow-sm p-6
hover:shadow-md transition-shadow duration-200
```

**Inputs y formularios:**

| Elemento | Clase |
| Input/Textarea | w-full border border-gray-300 rounded-lg px-4 py-3 font-body focus:outline-none focus:ring-2 focus:ring-brand-celeste |
| Label | text-brand-azul font-heading text-small mb-1 block |
| Error message | text-red-600 text-small mt-1 |

## 3. Tipografía — clases canónicas

| Elemento | Clase completa |
| Hero title | text-h1 lg:text-display font-heading text-brand-azul |
| H2 sección | text-h2 font-heading text-brand-azul |
| H3 card | text-h3 font-heading text-brand-azul |
| Subtítulo sección | text-lead font-body text-gray-600 |
| Párrafo body | text-body font-body text-gray-700 |
| Caption/label | text-small font-body text-gray-500 |
| CTA button text | font-heading (siempre Gilroy en botones) |
| Nav links | text-body font-heading text-brand-azul |

## 4. Espaciado canónico

| Contexto | Clase |
| Gap entre cards en grid | gap-6 |
| Gap entre secciones de página | py-16 md:py-24 |
| Padding interno de card | p-6 |
| Padding horizontal de página | px-4 sm:px-6 lg:px-8 |
| Max width contenedor | max-w-7xl mx-auto |
| Gap entre elementos de form | space-y-4 |
| Margen título → contenido | mb-4 (H3) mb-6 (H2) mb-12 (sección) |

## 5. Sombras y bordes

| Situación | Clase |
| Card en reposo | shadow-sm |
| Card en hover | shadow-md |
| Navbar con scroll | shadow-sm |
| Input en foco | ring-2 ring-brand-celeste |
| Divider horizontal | border-t border-gray-200 |
| Badge | border border-current rounded-full |

## 6. Transiciones permitidas

| Elemento | Clase |
| Hover en card | transition-shadow duration-200 |
| Hover en botón | transition-colors duration-150 |
| Drawer mobile | transition-transform duration-300 |
| Hover en link | transition-colors duration-150 |
| Accordion FAQ | transition-all duration-200 |

No agregar otras transiciones sin consultar.

## 7. Anti-patrones

- No usar `style={{ color: '#FAB600' }}` — usar `text-brand-naranja`
- No usar colores de Tailwind genéricos (blue-500) para marca
- No inventar variantes fuera de las definidas en tailwind.config.ts
- No usar `font-sans` — usar `font-heading` o `font-body`
- No hardcodear px en className — solo escala de Tailwind
- No usar opacity para colores de marca — usar variantes `/40`, `/60`
