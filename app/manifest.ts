import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Centro Aprendiendo Juntos',
    short_name: 'Aprendiendo Juntos',
    description:
      'Centro neuropsicopedagógico en Loja especializado en evaluación, neuropsicología, psicopedagogía y acompañamiento integral.',
    start_url: '/',
    display: 'standalone',
    background_color: '#EFEDE4',
    theme_color: '#0056A4',
    icons: [
      {
        src: '/favico.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}
