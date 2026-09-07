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

const CONCURRENCY = 12

async function graphqlProbe(index: number) {
  const start = Date.now()
  try {
    const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ generalSettings { title url } }' }),
      cache: 'no-store',
    })
    await res.text()
    return {
      request: index,
      ok: res.ok,
      status: res.status,
      durationMs: Date.now() - start,
      error: null,
    }
  } catch (err) {
    return {
      request: index,
      ok: false,
      status: null,
      durationMs: Date.now() - start,
      error: serializeError(err),
    }
  }
}

async function testConcurrency() {
  const start = Date.now()
  const requests = await Promise.all(
    Array.from({ length: CONCURRENCY }, (_, i) => graphqlProbe(i + 1))
  )
  const totalDurationMs = Date.now() - start
  const durations = requests.map((r) => r.durationMs)

  return {
    url: GRAPHQL_URL,
    concurrency: CONCURRENCY,
    totalDurationMs,
    successful: requests.filter((r) => r.ok).length,
    failed: requests.filter((r) => !r.ok).length,
    minDurationMs: Math.min(...durations),
    maxDurationMs: Math.max(...durations),
    averageDurationMs: Math.round(
      durations.reduce((a, b) => a + b, 0) / durations.length
    ),
    requests,
  }
}

export async function GET() {
  const wordpress = await testWordpress()
  const graphql = await testGraphql()
  const concurrency = await testConcurrency()

  return NextResponse.json({ wordpress, graphql, concurrency }, { status: 200 })
}
