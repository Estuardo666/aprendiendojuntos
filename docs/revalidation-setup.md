# Guia: Revalidacion On-Demand con Next.js ISR + WordPress Headless

## Arquitectura

```
WordPress (save_post)
        |
        |  POST /api/revalidate
        |  Header: x-revalidate-secret
        |  Body: { tag: "wp-content" }
        v
Next.js (endpoint)  --revalidateTag("wp-content")-->  Cache limpia
        |
        v
F5 normal muestra contenido actualizado
```

---

## 1. Frontend: Next.js App Router

### 1.1 Crear endpoint de revalidacion

Crear `app/api/revalidate/route.ts`:

```ts
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    secretConfigured: !!process.env.WP_PREVIEW_SECRET,
  })
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')
  if (secret !== process.env.WP_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  const body = await request.json()
  const { path, tag, slug } = body

  if (tag) {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag })
  }

  if (path) {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path })
  }

  if (slug) {
    revalidatePath(`/servicios/${slug}`)
    revalidatePath('/servicios')
    return NextResponse.json({ revalidated: true, slug })
  }

  revalidateTag('wp-content')
  return NextResponse.json({ revalidated: true, tag: 'wp-content' })
}
```

### 1.2 Agregar cache tags a los fetches

En la funcion centralizada de GraphQL (ej. `lib/graphql.ts`), agregar `tags` al fetch:

```ts
const response = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, variables }),
  next: {
    revalidate: 86400,
    tags: tags && tags.length > 0 ? tags : ['wp-content'],
  },
});
```

**Nota:** Usar un tag general (`wp-content`) es mas practico para proyectos pequenos. Para proyectos grandes, usar tags especificos por recurso (ej. `servicios`, `programas`).

### 1.3 Variables de entorno

En `.env.local`:

```env
WP_PREVIEW_SECRET=cambiar_en_produccion
NEXT_PUBLIC_WP_GRAPHQL_URL=https://tu-wordpress.com/graphql
```

En produccion, cambiar `WP_PREVIEW_SECRET` por un string largo y aleatorio.

---

## 2. Backend: WordPress

### 2.1 Crear archivo del webhook

En el plugin del proyecto o en `functions.php` del tema, crear un archivo `includes/revalidation-webhook.php`:

```php
<?php
if (!defined('ABSPATH')) {
    exit;
}

add_action('save_post', 'aj_revalidate_nextjs', 20, 2);

function aj_revalidate_nextjs(int $post_id, WP_Post $post): void {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (wp_is_post_revision($post_id)) {
        return;
    }

    $post_status = get_post_status($post_id);
    if ($post_status !== 'publish') {
        return;
    }

    $secret = defined('NEXTJS_REVALIDATE_SECRET')
        ? NEXTJS_REVALIDATE_SECRET
        : '';

    $endpoint = defined('NEXTJS_REVALIDATE_ENDPOINT')
        ? NEXTJS_REVALIDATE_ENDPOINT
        : '';

    if (empty($secret) || empty($endpoint)) {
        return;
    }

    $post_type = get_post_type($post_id);
    $slug      = $post->post_name;

    $body = [
        'tag' => 'wp-content',
    ];

    if ($post_type === 'aj_servicio' && !empty($slug)) {
        $body['slug'] = $slug;
    }

    $response = wp_remote_post($endpoint, [
        'headers' => [
            'Content-Type'        => 'application/json',
            'x-revalidate-secret' => $secret,
        ],
        'body'    => json_encode($body),
        'timeout' => 5,
    ]);

    if (is_wp_error($response)) {
        error_log('[Revalidation] Error: ' . $response->get_error_message());
    } else {
        $status = wp_remote_retrieve_response_code($response);
        $body_response = wp_remote_retrieve_body($response);
        error_log('[Revalidation] Next.js HTTP ' . $status . ' | ' . $body_response);
    }
}
```

**Notas:**
- Filtrar por `$post_type` si se quiere revalidar solo ciertos CPTs.
- Eliminar el `error_log` en produccion si no se necesita debug.

### 2.2 Configurar constantes en `wp-config.php`

```php
// Desarrollo local: usar IP de la maquina donde corre npm run dev
// Obtenerla con: ipconfig (Windows) o ifconfig/ip addr (Mac/Linux)
define('NEXTJS_REVALIDATE_SECRET', 'cambiar_en_produccion');
define('NEXTJS_REVALIDATE_ENDPOINT', 'http://192.168.1.45:3000/api/revalidate');

// Produccion en Vercel:
// define('NEXTJS_REVALIDATE_ENDPOINT', 'https://tudominio.com/api/revalidate');
```

**Importante:** El secreto debe ser **exactamente igual** en `.env.local` (Next.js) y en `wp-config.php` (WordPress).

---

## 3. Checklist de verificacion

### En desarrollo local

1. **Next.js corriendo:** `npm run dev` en `http://localhost:3000`
2. **Endpoint responde GET:** Abrir `http://localhost:3000/api/revalidate` en navegador.
   - Debe responder: `{"status":"ok","secretConfigured":true}`
3. **Firewall abierto:** La IP de la PC debe ser accesible desde donde corre WP.
   - Probar: `http://192.168.x.x:3000/api/revalidate` desde el navegador.
4. **Guardar post en WP:** Editar y actualizar un post publicado.
5. **Revisar log de PHP:** Verificar que Next.js respondio HTTP 200.
6. **F5 en frontend:** El cambio debe verse con refresh normal.

### En produccion (Vercel)

1. **Deployar el endpoint:** Verificar que `/api/revalidate` existe en el deploy.
2. **Actualizar `wp-config.php`:** Cambiar `NEXTJS_REVALIDATE_ENDPOINT` a la URL de Vercel.
3. **Cambiar secret:** No usar `cambiar_en_produccion`. Generar un string largo y aleatorio.
4. **Verificar en ambos lados:** Asegurar que el secreto sea identico en Vercel (env var) y WP (`wp-config.php`).

---

## 4. Solucion de problemas

| Sintoma | Causa probable | Solucion |
|---------|--------------|----------|
| Log PHP: `HTTP 401` | Secreto no coincide | Verificar `.env.local` y `wp-config.php` |
| Log PHP: Error de conexion | Firewall o IP incorrecta | Verificar `ipconfig`, abrir puerto 3000 |
| Log PHP: No aparece nada | Hook no cargado o endpoint vacio | Verificar que el archivo PHP este incluido en el plugin |
| F5 sigue mostrando lo viejo | Endpoint no recibio el POST | Revisar que WP pueda hacer HTTP requests (algunos hosts bloquean `wp_remote_post`) |
| `secretConfigured: false` | Falta env var en Next.js | Agregar `WP_PREVIEW_SECRET` a `.env.local` |

---

## 5. Variantes

### Revalidar solo ciertos recursos

En lugar de invalidar todo con `tag: 'wp-content'`, enviar el `slug` o el `path`:

```php
$body = ['path' => '/servicios/' . $slug];
```

O usar tags especificos por CPT:

```php
$body = ['tag' => 'servicios'];
```

Y en `fetchGraphQL` pasar el tag correspondiente:

```ts
fetchGraphQL(query, variables, 86400, ['servicios'])
```

### Revalidar al eliminar (trash)

Agregar un segundo hook:

```php
add_action('trashed_post', function (int $post_id) {
    // Obtener slug antes de que se borre
    $post = get_post($post_id);
    if ($post) {
        aj_revalidate_nextjs($post_id, $post);
    }
}, 10, 1);
```
