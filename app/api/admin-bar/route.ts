import { NextRequest, NextResponse } from 'next/server'
import { fetchGraphQL } from '@/lib/graphql'

const WP_URL = process.env.NEXT_PUBLIC_WP_URL ?? ''

interface NodeByUriResult {
  nodeByUri: {
    __typename: string
    databaseId: number
    uri: string
  } | null
}

const NODE_BY_URI_QUERY = `
  query GetNodeId($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Post {
        databaseId
        uri
      }
      ... on Page {
        databaseId
        uri
      }
      ... on Servicio {
        databaseId
        uri
      }
      ... on Programa {
        databaseId
        uri
      }
      ... on Testimonio {
        databaseId
        uri
      }
      ... on Faq {
        databaseId
        uri
      }
      ... on MiembroEquipo {
        databaseId
        uri
      }
      ... on LandingPage {
        databaseId
        uri
      }
      ... on Recurso {
        databaseId
        uri
      }
      ... on Articulo {
        databaseId
        uri
      }
    }
  }
`

// Map frontend routes to WordPress options pages
const OPTIONS_PAGES: Record<string, { slug: string; label: string }> = {
  '/': { slug: 'pagina-home', label: 'Editar inicio' },
  '/nosotros': { slug: 'pagina-nosotros', label: 'Editar nosotros' },
  '/contacto': { slug: 'pagina-contacto', label: 'Editar contacto' },
  '/servicios': { slug: 'pagina-servicios', label: 'Editar servicios' },
  '/programas': { slug: 'pagina-programas', label: 'Editar programas' },
  '/testimonios': { slug: 'pagina-testimonios', label: 'Editar testimonios' },
  '/recursos': { slug: 'pagina-recursos', label: 'Editar recursos' },
  '/articulos': { slug: 'pagina-articulos', label: 'Editar artículos' },
}

export async function GET(request: NextRequest) {
  if (!WP_URL) {
    return NextResponse.json({ editUrl: null, editLabel: null })
  }

  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') ?? '/'

  // Check if this is an options page
  const optionsPage = OPTIONS_PAGES[path]
  if (optionsPage) {
    return NextResponse.json({
      editUrl: `${WP_URL}/wp-admin/admin.php?page=${optionsPage.slug}`,
      editLabel: optionsPage.label,
    })
  }

  try {
    const data = await fetchGraphQL<NodeByUriResult>(
      NODE_BY_URI_QUERY,
      { uri: path },
      0,
      ['admin-bar'],
    )

    const node = data.nodeByUri
    if (!node?.databaseId) {
      return NextResponse.json({ editUrl: null, editLabel: null })
    }

    // Construct edit URL from databaseId
    const editUrl = `${WP_URL}/wp-admin/post.php?post=${node.databaseId}&action=edit`

    // Determine edit label based on type
    const typeLabels: Record<string, string> = {
      Post: 'Editar artículo',
      Page: 'Editar página',
      Servicio: 'Editar servicio',
      Programa: 'Editar programa',
      Testimonio: 'Editar testimonio',
      Faq: 'Editar FAQ',
      MiembroEquipo: 'Editar miembro',
      LandingPage: 'Editar landing',
      Recurso: 'Editar recurso',
      Articulo: 'Editar artículo',
    }

    const editLabel = typeLabels[node.__typename] ?? 'Editar'

    return NextResponse.json({ editUrl, editLabel })
  } catch {
    return NextResponse.json({ editUrl: null, editLabel: null })
  }
}
