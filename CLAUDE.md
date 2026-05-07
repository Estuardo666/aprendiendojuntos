Approach
Read existing files before writing. Don't re-read unless changed.
Thorough in reasoning, concise in output.
Skip files over 100KB unless required.
No sycophantic openers or closing fluff.
No emojis or em-dashes.
Do not guess APIs, versions, flags, commit SHAs, or package names. Verify by reading code or docs before asserting.

## Graphify Knowledge Graph

Before doing any Glob or Grep search, read graphify-out/GRAPH_REPORT.md first.
It contains the full architecture map, god nodes, communities, and surprising connections.

Key graph facts:
- God node #1: cn() — 20 edges, used in every component
- God node #3: fetchGraphQL() — single WPGraphQL gateway (lib/graphql.ts)
- God node #4: getServicios() — most-called API function
- 5 main communities: Atomic UI Components, Button Usage Patterns, GraphQL API & Config, Data Fetching, Servicios Data Flow
- Graph lives at: graphify-out/graph.json
- Agent guide: graphify-out/AGENTS.md
- Auto-rebuilds on git commit and branch checkout (hook installed)




# Centro Neuropsicopedagógico Aprendiendo Juntos — Frontend

## Proyecto

Frontend del Centro Neuropsicopedagógico Aprendiendo Juntos.
Next.js 14 App Router + TypeScript + Tailwind CSS.
Consume WordPress Headless via WPGraphQL.

## Stack

| Capa | Tecnología | Versión |
| Framework | Next.js App Router | 14 |
| Lenguaje | TypeScript | strict mode |
| Estilos | Tailwind CSS + tokens custom | 3 |
| Fuentes | Gilroy (headings) + Inter (body) | Local + Google Fonts |
| API | WPGraphQL (GraphQL) | - |
| Deploy | Vercel | - |

## Arquitectura de componentes (Atomic Design)

Regla de oro: cada componente pertenece a exactamente un nivel.
No se salta niveles. No se importa hacia arriba.

| Nivel | Carpeta | Responsabilidad | Puede importar de |
| Átomo | components/atoms/ | Elemento base sin hijos componentes | Nada de components/ |
| Molécula | components/molecules/ | 2-4 átomos con función clara | Solo atoms/ |
| Organismo | components/organisms/ | Sección visual completa | atoms/ + molecules/ |
| Template | components/templates/ | Layout de página sin datos reales | Solo organisms/ |
| Page | app/*/page.tsx | Fetch + transformar + pasar al template | lib/api/ + templates/ |

Reglas adicionales:
- Sin fetch fuera de app/*/page.tsx
- Sin 'use client' en atoms, molecules, organismos ni templates
  salvo que el componente requiera estado de UI (hover, accordion, drawer),
  hooks de React (useState, useEffect, useRef), hooks de next/navigation
  (usePathname, useRouter), Framer Motion, o event handlers directos.
  **Regla clave**: cualquier componente que importe o use NavLink (usePathname)
  o cualquier Client Component con hooks también DEBE tener 'use client'.
- Sin datos hardcodeados en organismos o templates
- Sin JSX propio en pages — solo llamar al Template

## Tokens de diseño

Colores (definidos en tailwind.config.ts — no buscar en otro lado):

| Token | Hex | Uso |
| brand-naranja | #FAB600 | CTAs, badges, acentos |
| brand-azul | #0056A4 | Títulos H1-H3, navbar, footer |
| brand-celeste | #0080C9 | Links, hover, iconos interactivos |
| brand-crema | #EFEDE4 | Fondo de página SIEMPRE |
| brand-blanco | #FFFFFF | Fondo de cards y contenedores |

Regla crítica: NUNCA usar colores primarios (naranja, azul, celeste)
como fondo de página o sección completa.

Tipografía:

| Clase Tailwind | Uso |
| font-heading | Títulos, navbar, CTAs (Gilroy) |
| font-body | Párrafos, descripciones (Inter) |
| text-display | Hero principal |
| text-h1 / text-h2 / text-h3 | Jerarquía de títulos |
| text-lead | Subtítulos y destacados |
| text-small | Labels, captions |

## Componente Button — CTA Premium Reutilizable

### Visión general

El componente Button (`components/atoms/Button/Button.tsx`) es un CTA reutilizable
con soporte para animaciones premium (Framer Motion). Permite configurar:
- Variantes (primary, secondary, celeste, ghost, whatsapp, dark)
- Tamaños (sm, md, lg, xl)
- Animaciones (none, slide)
- **Colores dinámicos**: gradiente y hover color (nuevos)

### Uso básico

```tsx
import { Button } from '@/components/atoms/Button';

// CTA estándar
<Button variant="primary" size="md">
  Contactar
</Button>

// CTA con ícono y animación slide
<Button 
  variant="primary" 
  size="xl" 
  iconName="ArrowRightIcon" 
  iconAnimation="slide"
  href="/contacto"
>
  Comenzar ahora
</Button>
```

### Uso avanzado — Colores configurables (Token Design)

Para CTAs que necesiten colores especiales (gradientes o hover colors distintos):

```tsx
<Button 
  variant="primary" 
  size="xl" 
  iconName="ArrowRightIcon" 
  iconAnimation="slide"
  gradientStart="#FDD904"    // Color inicial del gradiente
  gradientEnd="#F9B50B"      // Color final del gradiente
  fillColor="bg-brand-azul"  // Color del fill en hover
  hoverTextColor="text-white" // Color del texto en hover
  href="/servicios/coaching"
>
  Ver programa
</Button>
```

**Notas:**
- `gradientStart` y `gradientEnd` aceptan valores hex (#RRGGBB)
- `fillColor` y `hoverTextColor` aceptan clases Tailwind (ej: `text-white`, `bg-blue-500`)
- Estos props solo aplican a la variante `primary` con `iconAnimation="slide"`
- Si no se pasan, el Button usa los valores por defecto (brand-sunrise + brand-azul)

### Props disponibles

| Prop | Tipo | Requerido | Descripción |
| children | React.ReactNode | Sí | Texto del botón |
| variant | ButtonVariant | Sí | 'primary' \| 'secondary' \| 'celeste' \| 'ghost' \| 'whatsapp' \| 'dark' |
| size | ButtonSize | No | 'sm' \| 'md' (default) \| 'lg' \| 'xl' |
| iconName | IconName | No | Nombre del ícono (ej: 'ArrowRightIcon') |
| iconAnimation | ButtonIconAnimation | No | 'none' (default) \| 'slide' |
| href | string | No | Si se pasa, renderiza como `<Link>` |
| onClick | () => void | No | Handler onClick si es `<button>` |
| disabled | boolean | No | Deshabilita el botón |
| className | string | No | Clases Tailwind adicionales |
| gradientStart | string | No | Color hex inicial (ej: '#FDD904') |
| gradientEnd | string | No | Color hex final (ej: '#F9B50B') |
| fillColor | string | No | Clase Tailwind para el fill en hover |
| hoverTextColor | string | No | Clase Tailwind para el texto en hover |

## Conectividad con WordPress Headless

Archivo central: `lib/graphql.ts` → `fetchGraphQL<T>()`
- ÚNICA función que hace fetch a WP
- Recibe query, variables, revalidate
- URL desde NEXT_PUBLIC_WP_GRAPHQL_URL

Módulos lib/api/ — uno por recurso:

| Archivo | Funciones | Revalidate |
| servicios.ts | getServicios, getServicio(slug) | 86400 |
| programas.ts | getProgramas, getPrograma(slug) | 86400 |
| testimonios.ts | getTestimonios | 3600 |
| faqs.ts | getFAQs | 3600 |
| equipo.ts | getEquipo | 86400 |
| blog.ts | getPosts, getPost(slug) | 1800 |
| opciones.ts | getOpciones | 86400 |

Reglas:
- lib/api/ solo hace fetch, no transforma datos
- La transformación raw WP → props ocurre en app/*/page.tsx
- Verificar data.errors[] — WPGraphQL retorna 200 con errores
- Imágenes: siempre next/image con dominio WP en next.config.ts

## Seguridad

### Variables de entorno
- NEXT_PUBLIC_* solo para valores que el browser necesita
- WP_PREVIEW_SECRET nunca expuesto al cliente
- Nunca hardcodear URLs, tokens ni credenciales en el código
- .env.local en .gitignore siempre

### Formularios
- Sanitizar inputs en /api/contact/route.ts antes de enviar a WP
- Rate limiting básico en API routes
- No exponer errores internos de WP al cliente
- Headers de seguridad en next.config.ts:
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff

## ⚠️ Notas importantes - WPGraphQL

### Opciones globales (ACF Options)

La query correcta para obtener opciones globales es:

```graphql
{
  opcionesAprendiendoJuntos {
    opcionesGlobales {
      # ... fields
    }
  }
}
```

**NO** usar `acfOptionsOpcionesGlobales` como sugiere la documentación estándar de WPGraphQL for ACF.
Esta es una customización del sitio WordPress.
  Referrer-Policy: strict-origin-when-cross-origin

### Imágenes
- Whitelist de dominios en next.config.ts (no wildcard en producción)
- Alt text obligatorio en todo next/image — viene del campo altText de WP

### Datos
- No loguear respuestas completas de WP en producción
- Manejar notFound() en pages con [slug] si el item no existe
- Error boundaries via error.tsx por segmento de ruta

### ⚠️ Campos ACF en WPGraphQL — tipos reales

Los campos ACF de tipo `select` (y algunos `text` con `allow_multiple`) pueden
devolver `string[]` en lugar de `string`.

**Patrón seguro para normalizar siempre:**
```typescript
const valor = Array.isArray(campo) ? (campo[0] ?? '') : (campo ?? '')
```

Aplicar este patrón a: `categoria`, cualquier `select` de ACF.
Verificar en GraphiQL el tipo real antes de asumir `string` simple.

### ⚠️ Campos ACF de tipo Relationship en WPGraphQL

Todo campo ACF de tipo **Relationship** devuelve `AcfContentNodeConnection`, NO un arreglo directo.
Siempre usar `nodes {}` para acceder a los items e inline fragments:

```graphql
# ✅ Correcto
campoRelacion {
  nodes {
    ... on TipoEsperado {
      id
      # ...
    }
  }
}

# ❌ Incorrecto — lanza "Fragment cannot be spread on AcfContentNodeConnection"
campoRelacion {
  ... on TipoEsperado {
    id
  }
}
```

En TypeScript el tipo correspondiente es `{ nodes: T[] }`, no `T[]`.
Esto aplica a TODOS los CPTs: aj_servicio, aj_programa, aj_faq, etc.

## Convenciones de código

| Elemento | Convención | Ejemplo |
| Componentes | PascalCase | ServiceCard.tsx |
| Hooks | use + PascalCase | useContactForm.ts |
| Tipos WP raw | WP + PascalCase | WPServicio |
| Tipos componentes | PascalCase + Props | ServiceCardProps |
| Archivos lib/ | minúscula | servicios.ts |
| Variables CSS | --brand-* | --brand-naranja |
| Clases Tailwind | mobile-first | sm: md: lg: |

TypeScript:
- strict: true en tsconfig.json
- Sin any — usar unknown si el tipo es incierto
- Tipos de WP en lib/types/ separados de tipos de componentes
- Props siempre tipadas con interface, no type alias

## Performance

- Todas las pages son Server Components por defecto
- 'use client' solo cuando sea estrictamente necesario
  (estado de UI, event handlers, browser APIs, Framer Motion,
  hooks de next/navigation como usePathname/useRouter)
- **Error "Cannot read properties of null (reading 'useContext')"**: siempre
  indica un componente con hooks de cliente sin 'use client'. Buscar el
  componente padre más cercano que lo importe y agregarle la directiva.
- Fuentes: next/font/google con display: swap
- Imágenes: next/image con sizes y priority en above-the-fold
- No instalar librerías para lo que Tailwind ya resuelve
- Bundle: no importar librerías completas (usar imports named)

Lighthouse targets:

| Métrica | Target |
| Performance | > 90 |
| Accessibility | > 95 |
| SEO | > 95 |
| Best Practices | > 90 |

## SEO

Cada page exporta generateMetadata():
- title: "[Nombre página] | Aprendiendo Juntos"
- description: max 155 chars
- openGraph: title + description + imagen de la página
- Pages con [slug]: metadata dinámica desde WP

Sitemap y robots.txt: generar en Fase 5 del roadmap.

## Decisiones tomadas — no preguntar

| Área | Decisión |
| API | Solo GraphQL, nunca REST de WP |
| Estilos | Solo Tailwind con tokens del config |
| Imágenes | Solo next/image |
| Formularios | useContactForm + /api/contact/route.ts |
| Fuentes | Solo next/font/google |
| Estado global | No usar (no Redux, no Zustand, no Context) |
| Animaciones | Solo Tailwind transitions — no Framer Motion |
| Iconos | Solo emojis definidos en ACF — no icon libraries |
| Testing | No generar tests salvo que se pida explícitamente |
| Comentarios | No agregar comentarios salvo que se pida |

## Skills disponibles

| Skill | Leer antes de... |
| acf-schema | Escribir query GraphQL o tipo TypeScript de WP |
| wordpress-graphql | Tocar lib/api/*.ts o lib/graphql.ts |
| nextjs-page-pattern | Crear o modificar app/*/page.tsx |
| wp-cpt-registration | Registrar CPT o campo ACF en PHP |
| project-shortcuts | Interpretar abreviaciones del usuario |
| frontend-design | Crear cualquier componente visual |

## 🐛 Errores comunes corregidos — prevención

### 1. Imágenes no cargan: "hostname not configured"
**Síntoma**: `Invalid src prop (...) hostname "aprendiendo-juntos.local" is not configured`
**Causa**: `next.config.mjs` no lista el dominio WP o falta un protocolo
**Prevención**:
- Ambos protocolos en `remotePatterns`: `{ protocol: 'http', ... }` Y `{ protocol: 'https', ... }`
- En dev local con certificados auto-firmados: usar `unoptimized: isDev` para que el optimizador
  server-side no intente descargar imágenes (que fallan con SSL auto-firmado)
- Reiniciar servidor después de cambiar `next.config.mjs`

```javascript
// En next.config.mjs:
const isDev = process.env.NODE_ENV === 'development'
const nextConfig = {
  images: {
    unoptimized: isDev,  // ← Crítico para dev local
    remotePatterns: [
      { protocol: 'http', hostname: 'aprendiendo-juntos.local' },
      { protocol: 'https', hostname: 'aprendiendo-juntos.local' },
    ]
  }
}
```

### 2. Hydration warning: "Extra attributes from server"
**Síntoma**: `Warning: Extra attributes from the server: suppresshydrationwarning,data-lt-installed`
**Causa**: Extensiones del navegador (LanguageTool, Grammarly) inyectan atributos en `<html>`
**Prevención**: Añadir `suppressHydrationWarning` en `app/layout.tsx`:
```tsx
<html lang="es" suppressHydrationWarning>
```

### 3. Erro "usePathname() requires 'use client'"
**Síntoma**: `TypeError: Cannot read properties of null (reading 'useContext')`
**Causa**: Componente con hook de cliente sin directiva `'use client'`, o padre que lo importa falta la directiva
**Prevención**:
- Todo componente con hooks React, next/navigation, o Framer Motion → `'use client'` como PRIMERA línea
- Si un Server Component importa un Client Component, también necesita 'use client'
  si ese Client Component tiene hooks
- Patrón correcto: los Client Components declaran su propia directiva. El padre (Server o Client)
  que los importa TAMBIÉN necesita 'use client' si tiene lógica de cliente

### 4. Categoria es array pero código espera string
**Síntoma**: `cat.toLowerCase is not a function`
**Causa**: Campo ACF select en WP devuelve `string[]` en lugar de `string`
**Prevención**:
- Tipos: `categoria: string | string[]` (nunca asumir `string` solo)
- Accessores: normalizar siempre antes de usar:
```typescript
const cat = Array.isArray(campo) ? (campo[0] ?? '') : (campo ?? '')
const lower = cat.toLowerCase()
```

### 5. Campos de relación ACF causan "Fragment cannot be spread"
**Síntoma**: `Fragment cannot be spread here as objects of type "AcfContentNodeConnection" can never be of type "Servicio"`
**Causa**: Olvidar `nodes {}` wrapper en campos relationship de ACF
**Prevención**:
- Todos los campos ACF relationship deben usar: `campoRelation { nodes { ... on Tipo { } } }`
- Tipos TS: `campo?: { nodes: Tipo[] }` NO `campo?: Tipo[]`
- Accessores: `sf.campo?.nodes ?? []` siempre

### 6. Imágenes arriba del fold sin LCP optimization
**Síntoma**: Warning en consola: `Image with src "..." was detected as Largest Contentful Paint (LCP). Please add the "priority" property`
**Prevención**:
- Imágenes hero, featured images above the fold → prop `priority` en `<Image>`
- Solo una o dos imágenes por página deben tener `priority` (las más grandes y altas)

## Agentes disponibles

| Agente | Invocar cuando... |
| graphql-schema-validator | PR con cambios en ACF + queries + tipos TS |
| content-loader | Carga inicial de contenido desde cuestionario |

## Instrucciones de respuesta

Por defecto NO:
- Explicar conceptos de Next.js, TypeScript o Tailwind
- Agregar comentarios en el código
- Generar tests
- Sugerir librerías no listadas en decisiones tomadas
- Preguntar "¿quieres que también genere X?"

Por defecto SÍ:
- Indicar archivo exacto a crear o editar
- Leer la skill correspondiente antes de generar código
- Seguir Atomic Design sin desviarse
- Usar tokens de diseño del tailwind.config.ts
- Formato: prompt listo para Claude Code o archivo a editar
