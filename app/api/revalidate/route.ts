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
