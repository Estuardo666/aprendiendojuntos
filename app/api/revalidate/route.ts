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

  const body = (await request.json()) as { path?: string; tag?: string; slug?: string; postType?: string }
  const { path, tag, slug, postType } = body

  if (path) {
    await revalidatePath(path)
    if (tag) {
      // @ts-expect-error — Next.js 16 types expect 2 args but runtime accepts 1
      await revalidateTag(tag)
    }
    return NextResponse.json({ revalidated: true, path, tag })
  }

  if (tag) {
    // @ts-expect-error — Next.js 16 types expect 2 args but runtime accepts 1
    await revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag })
  }

  if (slug) {
    if (postType === 'aj_testimonio') {
      await revalidatePath(`/testimonios/${slug}`)
      await revalidatePath('/')
      return NextResponse.json({ revalidated: true, slug, path: `/testimonios/${slug}` })
    }

    await revalidatePath(`/servicios/${slug}`)
    await revalidatePath('/servicios')
    return NextResponse.json({ revalidated: true, slug })
  }

  // @ts-expect-error — Next.js 16 types expect 2 args but runtime accepts 1
  await revalidateTag('wp-content')
  return NextResponse.json({ revalidated: true, tag: 'wp-content' })
}
