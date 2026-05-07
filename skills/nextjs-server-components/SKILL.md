---
name: nextjs-server-components
description: >
  PUSHY — Activate when: creating or modifying any component/page, asking
  about 'use client' usage, mentioning useState/useEffect/fetch/loading/error,
  asking about Suspense/streaming/loading.tsx, mentioning hydration or
  browser events. Never skip for component or page creation.
---

# Next.js Server Components — Centro Aprendiendo Juntos

## 1. Regla de decisión — Server vs Client

¿El componente necesita useState/useReducer? → Client
¿Necesita useEffect? → Client
¿Necesita event handlers con lógica (onChange, onSubmit)? → Client
¿Necesita browser APIs (window, document, navigator)? → Client
¿Necesita next/navigation hooks (useRouter, usePathname)? → Client
→ Todo lo demás: Server Component (default)

**Componentes de este proyecto que son Client:**

| Componente | Razón |
| NavLink | usePathname para estado activo |
| MobileMenu | useState drawer abierto/cerrado |
| FAQItem | useState accordion expandido |
| TestimonialsCarousel | useState slide activo |
| ContactForm | useState + useEffect del formulario |

Todos los demás: Server Components.

## 2. Patrón de composición Server + Client

Regla: empujar 'use client' lo más abajo posible en el árbol.

**Correcto:**
- `Navbar.tsx` → Server Component (recibe datos de opciones globales)
- `NavLink.tsx` → Client Component ('use client', usePathname)
- Navbar importa NavLink — esto es correcto

**Anti-patrón:**
- `Navbar.tsx` con 'use client' completo solo por NavLink
  → convierte todo el árbol en client innecesariamente

## 3. Fetch en Server Components

Solo en `app/*/page.tsx`. Nunca en componentes. El fetch es async/await directo.

**Correcto:**
```ts
// app/servicios/page.tsx
export default async function ServiciosPage() {
  const servicios = await getServicios()
  return <ServiciosTemplate servicios={servicios} />
}
```

**Anti-patrón — NUNCA hacer esto:**
```ts
'use client'
export function ServicesGrid() {
  const [servicios, setServicios] = useState([])
  useEffect(() => { fetch('/api/servicios')... }, [])
}
```

## 4. loading.tsx y error.tsx por ruta

Cada segmento de ruta con fetch debe tener:

```
app/servicios/
├── page.tsx         ← fetch + template
├── loading.tsx      ← skeleton mientras carga
└── error.tsx        ← UI de error
```

**loading.tsx:**
```tsx
export default function Loading() {
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-brand-crema">
      <div className="max-w-7xl mx-auto">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-brand-blanco rounded-2xl p-6">
              <div className="h-48 bg-gray-200 rounded-lg animate-pulse mb-4" />
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**error.tsx:**
```tsx
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-16 px-4 bg-brand-crema text-center">
      <p className="text-h2 font-heading text-brand-azul mb-4">
        Algo salió mal
      </p>
      <button onClick={reset} className="bg-brand-naranja text-white font-heading px-6 py-3 rounded-lg">
        Intentar de nuevo
      </button>
    </div>
  );
}
```

## 5. Suspense y streaming

Usar Suspense para secciones independientes con fetch de diferente velocidad.

```tsx
// app/page.tsx (Home)
export default async function HomePage() {
  const opciones = await getOpciones()
  return (
    <HomeTemplate>
      <HeroSection datos={opciones.hero} />
      <Suspense fallback={<ServicesGridSkeleton />}>
        <ServicesGridAsync />
      </Suspense>
      <Suspense fallback={<TestimonialsSkeleton />}>
        <TestimonialsCarouselAsync />
      </Suspense>
    </HomeTemplate>
  );
}
```

**Cuándo usar Suspense en este proyecto:**
- Home: ServicesGrid y TestimonialsCarousel en Suspense separados
- Resto de pages: loading.tsx es suficiente

## 6. generateMetadata y generateStaticParams

**generateMetadata():**
```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const servicio = await getServicio(params.slug)
  if (!servicio) return { title: 'Servicio no encontrado | Aprendiendo Juntos' }
  return {
    title: `${servicio.acf.tituloCorto} | Aprendiendo Juntos`,
    description: servicio.acf.descripcionCorta.slice(0, 155),
  }
}
```

**generateStaticParams():**
```tsx
export async function generateStaticParams() {
  const servicios = await getServicios()
  return servicios.map(s => ({ slug: s.slug }))
}
```

Si WP no responde: retornar `[]` para fallback dinámico.

## 7. Anti-patrones

- No agregar 'use client' "por si acaso" — tiene costo real de bundle
- No hacer fetch en useEffect — usar Server Components
- No usar useState para datos que vienen de WP — son estáticos
- No importar componentes Client en el nivel más alto si solo una parte necesita interactividad
- No olvidar loading.tsx en rutas con fetch lento
- No usar 'as any' para silenciar errores de tipos
