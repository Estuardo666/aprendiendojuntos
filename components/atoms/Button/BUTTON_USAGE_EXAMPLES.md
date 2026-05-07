# Button Component — Ejemplos de Uso

Documentación de ejemplo del componente Button reutilizable con soporte para colores dinámicos.

## 1. CTA Estándar (Sin personalización de colores)

Usa los valores por defecto del brand-sunrise gradient.

```tsx
import { Button } from '@/components/atoms/Button';

export function ServiceCard() {
  return (
    <Button 
      variant="primary" 
      size="lg" 
      iconName="ArrowRightIcon" 
      iconAnimation="slide"
      href="/servicios/coaching"
    >
      Ver servicio
    </Button>
  );
}
```

## 2. CTA con Colores Custom (Nuevo)

Personaliza el gradiente y colores de hover para crear variaciones visuales.

```tsx
<Button 
  variant="primary" 
  size="xl" 
  iconName="ArrowRightIcon" 
  iconAnimation="slide"
  gradientStart="#FF6B6B"     // Rojo
  gradientEnd="#FF8E8E"       // Rojo más claro
  fillColor="bg-red-700"      // Fill en hover
  hoverTextColor="text-white" // Texto en hover
  href="/programs/special"
>
  Programa especial
</Button>
```

## 3. Uso en ServiceHero (Hero principal)

El hero del servicio usa el button con gradiente custom:

```tsx
// En ServiceHero.tsx
<Button
  variant="primary"
  size="xl"
  iconName="ArrowRightIcon"
  iconAnimation="slide"
  gradientStart="#FDD904"    // Amarillo
  gradientEnd="#F9B50B"      // Naranja-amarillo
  fillColor="bg-brand-azul"  // Azul
  hoverTextColor="text-white"
  href={`/servicios/${slug}#contacto`}
>
  Conocer más
</Button>
```

## 4. CTAs en Cards de Programas

Cada programa podría tener su propio color:

```tsx
// Verde para programas de bienestar
<Button 
  variant="primary" 
  size="lg" 
  iconAnimation="slide"
  gradientStart="#10B981"    // Verde
  gradientEnd="#059669"      // Verde oscuro
  fillColor="bg-green-800"
  hoverTextColor="text-white"
  href={`/programas/${slug}`}
>
  Explorar
</Button>

// Morado para coaching
<Button 
  variant="primary" 
  size="lg" 
  iconAnimation="slide"
  gradientStart="#8B5CF6"    // Morado
  gradientEnd="#7C3AED"      // Morado oscuro
  fillColor="bg-purple-900"
  hoverTextColor="text-white"
  href={`/programas/${slug}`}
>
  Conocer más
</Button>
```

## 5. Botón Secundario (Sin animación slide)

Los botones secundarios mantienen su comportamiento estándar:

```tsx
<Button 
  variant="secondary" 
  size="md"
  href="/servicios"
>
  Ver todos
</Button>
```

## 6. Botón con Evento onClick

Para acciones dentro de la página:

```tsx
<Button 
  variant="primary" 
  size="lg"
  onClick={() => scrollToSection('#faq')}
>
  Ir a FAQs
</Button>
```

## 7. Preset de Colores Reutilizables

Si notas que ciertos colores se repiten, puedes crear constantes:

```tsx
// lib/buttonPresets.ts
export const buttonPresets = {
  wellness: {
    gradientStart: '#10B981',
    gradientEnd: '#059669',
    fillColor: 'bg-green-800',
    hoverTextColor: 'text-white',
  },
  coaching: {
    gradientStart: '#8B5CF6',
    gradientEnd: '#7C3AED',
    fillColor: 'bg-purple-900',
    hoverTextColor: 'text-white',
  },
  default: {
    gradientStart: '#FDD904',
    gradientEnd: '#F9B50B',
    fillColor: 'bg-brand-azul',
    hoverTextColor: 'text-white',
  },
} as const;
```

Luego usarlos:

```tsx
import { buttonPresets } from '@/lib/buttonPresets';

<Button 
  variant="primary" 
  size="xl" 
  iconAnimation="slide"
  {...buttonPresets.wellness}
  href="/programs/wellness"
>
  Programa de bienestar
</Button>
```

## 8. Variantes de Color Disponibles

### Primaria con animación slide (permite custom colors)
```tsx
<Button variant="primary" iconAnimation="slide" {...customColors}>
  Custom CTA
</Button>
```

### Secundaria (azul)
```tsx
<Button variant="secondary">
  Acción secundaria
</Button>
```

### Celeste (links, hover)
```tsx
<Button variant="celeste">
  Más info
</Button>
```

### Ghost (sin relleno, solo borde)
```tsx
<Button variant="ghost">
  Cancelar
</Button>
```

### WhatsApp (para contacto directo)
```tsx
<Button variant="whatsapp" href="https://wa.me/...">
  Contactar por WhatsApp
</Button>
```

### Dark (fondos claros)
```tsx
<Button variant="dark">
  Acción oscura
</Button>
```

## 9. Tamaños Disponibles

| Tamaño | Uso | Ejemplo |
| `sm` | Acciones secundarias en cards | Filtros, botones inline |
| `md` | Botones estándar (default) | CTAs en secciones normales |
| `lg` | CTAs principales en secciones | Calls-to-action destacadas |
| `xl` | CTAs principales en héroes | Hero de servicio, promociones |

## 10. Estructura de Props de Color

### Para gradiente (solo hex)
```tsx
gradientStart="#FDD904"  // Hex color format (#RRGGBB)
gradientEnd="#F9B50B"    // Hex color format
```

### Para colores de hover (solo Tailwind)
```tsx
fillColor="bg-brand-azul"      // Clase Tailwind para el fill
hoverTextColor="text-white"    // Clase Tailwind para el texto
```

## Notas Importantes

1. **Props de color solo aplican a**:
   - Variante: `primary`
   - Animación: `slide` (con icon)
   - Otros combinaciones ignoran las props de color

2. **Compatibilidad hacia atrás**: 
   - Todos los botones existentes funcionan sin cambios
   - Los nuevos props son completamente opcionales

3. **Performance**:
   - El gradiente se genera con CSS inline cuando se proporcionan props
   - Sin overhead de performance si se omiten los props custom

4. **Recomendación de accesibilidad**:
   - Mantener suficiente contraste entre el fill color y el texto color en hover
   - Usar colores consistentes con la paleta del sitio

## Migración desde versiones anteriores

No se requiere cambio. Los botones existentes funcionan idénticamente.

Si quieres aprovechar los nuevos colores:

```diff
- <Button variant="primary" size="xl" iconAnimation="slide">
+ <Button 
+   variant="primary" 
+   size="xl" 
+   iconAnimation="slide"
+   gradientStart="#YOUR_COLOR_1"
+   gradientEnd="#YOUR_COLOR_2"
+   fillColor="bg-your-color"
+   hoverTextColor="text-your-color"
+ >
```

