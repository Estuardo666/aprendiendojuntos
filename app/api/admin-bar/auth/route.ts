import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const WP_ADMIN_SECRET = process.env.WP_ADMIN_SECRET ?? ''

export async function GET(request: NextRequest) {
  if (!WP_ADMIN_SECRET) {
    return NextResponse.json({ authenticated: false })
  }

  // Read cookie from browser request
  const cookieHeader = request.headers.get('cookie') ?? ''
  const match = cookieHeader.match(/aj_admin_auth=([^;]+)/)

  if (!match) {
    return NextResponse.json({ authenticated: false })
  }

  return verifyToken(match[1])
}

export async function POST(request: NextRequest) {
  if (!WP_ADMIN_SECRET) {
    return NextResponse.json({ authenticated: false })
  }

  try {
    const body = await request.json()
    const token = body.token

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return verifyToken(token)
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}

function verifyToken(token: string) {
  const parts = token.split('.')

  if (parts.length !== 2) {
    return NextResponse.json({ authenticated: false })
  }

  const [payloadB64, signature] = parts

  // Verify HMAC signature
  let expectedSignature: string
  try {
    expectedSignature = crypto
      .createHmac('sha256', WP_ADMIN_SECRET)
      .update(payloadB64)
      .digest('hex')
  } catch {
    return NextResponse.json({ authenticated: false })
  }

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return NextResponse.json({ authenticated: false })
  }

  // Decode payload
  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString())

    // Verify expiration
    if (!payload.exp || payload.exp < Date.now() / 1000) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: payload.id,
        name: payload.name,
        roles: payload.roles,
      },
    })
  } catch {
    return NextResponse.json({ authenticated: false })
  }
}
