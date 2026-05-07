---
name: graphql-types-sync
description: >
  PUSHY — Activate when: writing/modifying a TypeScript WP interface,
  creating/modifying a GraphQL query in lib/api/, transforming a WP response
  into component props, asking what TS type has an ACF field, or there's a
  type error in data from WordPress. Never skip for type or query work.
---

# GraphQL Types Sync — Centro Aprendiendo Juntos

## 1. Dos capas de tipos — nunca mezclar

**Capa 1 — Tipos WP raw (`lib/types/`):** Modelan la respuesta exacta de WPGraphQL. Prefijo `WP` obligatorio. Reflejan la estructura anidada de GraphQL.

**Capa 2 — Tipos de componentes (`components/*/*.types.ts`):** Modelan los props que recibe el componente. Sin prefijo. Planos y simples.

La transformación ocurre en `app/*/page.tsx` únicamente.

## 2. Mapeo ACF tipo → TypeScript

| Tipo ACF | Estructura GraphQL | Tipo TypeScript |
| text | campo: string | string |
| textarea | campo: string | string |
| wysiwyg | campo: string | string (HTML) |
| true_false | campo: boolean | boolean |
| number | campo: number | number |
| select | campo: string | union literal |
| image | campo: { node: { sourceUrl, altText } } | WPImage |
| post_object | campo: { node: { id, slug, title } } | WPPostRef |
| repeater | campo: Array<{ subcampo: string }> | Array\<{}\> |
| options_page | acfOptionsOpcionesGlobales: { opcionesGlobales: {} } | WPOpciones |

## 3. Tipos base reutilizables — `lib/types/shared.types.ts`

```ts
export interface WPImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails?: { width: number; height: number };
  };
}

export interface WPPostRef {
  node: {
    id: string;
    slug: string;
    title: string;
  };
}

export interface WPNode<T> {
  nodes: T[];
}
```

Estos 3 tipos se importan en todos los demás tipos WP.

## 4. Tipos WP por CPT — estructura canónica

`lib/types/servicio.types.ts` (ejemplo canónico, los demás siguen el mismo patrón):

```ts
import type { WPImage } from './shared.types';

export interface WPServicioACF {
  tituloCorto: string;
  descripcionCorta: string;
  descripcionLarga: string | null;
  iconoEmoji: string;
  categoria: 'neuropsicologia' | 'psicopedagogia' | 'lenguaje' | 'sensorial' | 'otro';
  destacado: boolean;
}

export interface WPServicio {
  id: string;
  slug: string;
  title: string;
  acf: WPServicioACF;
}
```

Los demás CPTs (Programa, Testimonio, FAQ, Equipo, Post) siguen este mismo patrón con sus campos según `acf-schema` skill.

## 5. Función de transformación — patrón canónico

La transformación raw → props ocurre en `page.tsx`:

```ts
// app/servicios/page.tsx
import { WPServicio } from '@/lib/types/servicio.types';
import { ServiceCardProps } from '@/components/molecules/ServiceCard/ServiceCard.types';

export default async function ServiciosPage() {
  const serviciosRaw = await getServicios();

  const servicios: ServiceCardProps[] = serviciosRaw.map(s => ({
    titulo: s.acf.tituloCorto,
    descripcionCorta: s.acf.descripcionCorta,
    icono: s.acf.iconoEmoji,
    categoria: s.acf.categoria,
    slug: s.slug,
    destacado: s.acf.destacado ?? false,
  }));

  return <ServiciosTemplate servicios={servicios} />;
}
```

**Reglas de transformación:**
- Campos nullable de WP → usar `??` con valor por defecto
- Campos HTML (wysiwyg) → pasar como string, renderizar con `dangerouslySetInnerHTML` solo en componentes de detalle
- Campos Image → extraer `sourceUrl` y `altText` del nodo
- Campos Repeater → mapear el array interno

## 6. Validación de tipos

Si la query GraphQL pide un campo que no existe en el tipo WP: TypeScript lanzará error en build. Ese es el comportamiento correcto.

**Flujo de corrección:**
1. Error TS en campo X → verificar `acf-schema` skill
2. ¿El campo existe en ACF? → agregar al tipo WP
3. ¿No existe en ACF? → remover de la query
4. Ejecutar `graphql-schema-validator` agente si persiste duda

## 7. Checklist de sincronización

Antes de PR con cambios en tipos o queries:
- [ ] Campo en acf-schema → campo en `WP*ACF` interface
- [ ] Campo en `WP*ACF` interface → campo pedido en query GraphQL
- [ ] Campo nullable en ACF → tipado como `T | null` en TS
- [ ] Campo Image → usando `WPImage` de shared.types
- [ ] Campo Post Object → usando `WPPostRef` de shared.types
- [ ] Transformación raw→props en `page.tsx`, no en `lib/api/`
- [ ] Ejecutar graphql-schema-validator si hay duda
