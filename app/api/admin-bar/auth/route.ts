import { NextResponse } from 'next/server'

const WP_URL = process.env.NEXT_PUBLIC_WP_URL ?? ''
const WP_ADMIN_SECRET = process.env.WP_ADMIN_SECRET ?? ''

export async function GET() {
  if (!WP_URL || !WP_ADMIN_SECRET) {
    return NextResponse.json({ authenticated: false })
  }

  try {
    const res = await fetch(`${WP_URL}/wp-json/aj/v1/auth-check`, {
      method: 'GET',
      headers: {
        'X-AJ-Secret': WP_ADMIN_SECRET,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json({ authenticated: false })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}
