import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const WP_URL = 'https://admin.aprendiendojuntos.ec/'
const GRAPHQL_URL = 'https://admin.aprendiendojuntos.ec/graphql'

function serializeError(err: unknown) {
  if (err instanceof Error) {
    const cause = err.cause
    return {
      name: err.name,
      message: err.message,
      code: (err as NodeJS.ErrnoException).code ?? null,
      cause:
        cause instanceof Error
          ? {
              name: cause.name,
              message: cause.message,
              code: (cause as NodeJS.ErrnoException).code ?? null,
            }
          : (cause ?? null),
    }
  }
  return { name: 'Unknown', message: String(err), code: null, cause: null }
}

async function testWordpress() {
  const start = Date.now()
  try {
    const res = await fetch(WP_URL, { cache: 'no-store' })
    return {
      ok: res.ok,
      status: res.status,
      durationMs: Date.now() - start,
      url: WP_URL,
      error: null,
    }
  } catch (err) {
    return {
      ok: false,
      status: null,
      durationMs: Date.now() - start,
      url: WP_URL,
      error: serializeError(err),
    }
  }
}

async function testGraphql() {
  const start = Date.now()
  try {
    const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ generalSettings { title url } }' }),
      cache: 'no-store',
    })
    const text = await res.text()
    let data: unknown
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
    return {
      ok: res.ok,
      status: res.status,
      durationMs: Date.now() - start,
      url: GRAPHQL_URL,
      data,
      error: null,
    }
  } catch (err) {
    return {
      ok: false,
      status: null,
      durationMs: Date.now() - start,
      url: GRAPHQL_URL,
      data: null,
      error: serializeError(err),
    }
  }
}

export async function GET() {
  const wordpress = await testWordpress()
  const graphql = await testGraphql()

  return NextResponse.json({ wordpress, graphql }, { status: 200 })
}
