import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Centro Aprendiendo Juntos'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: '#EFEDE4',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          fontSize: 72,
        }}
      >
        <span style={{ marginRight: 16 }}>&#x1F42C;</span>
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: '#0056A4',
          textAlign: 'center',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
        }}
      >
        Centro Aprendiendo Juntos
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 500,
          color: '#0080C9',
          textAlign: 'center',
          marginTop: 16,
          maxWidth: 800,
        }}
      >
        Neuropsicología, psicopedagogía y acompañamiento integral en Loja
      </div>
    </div>,
    {
      ...size,
    }
  )
}
