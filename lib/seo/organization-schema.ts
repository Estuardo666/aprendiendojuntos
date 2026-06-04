import type { WPOpcionesGlobales } from '@/lib/types/opciones.types'

export function buildOrganizationSchema(
  opciones: WPOpcionesGlobales | null
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Centro Aprendiendo Juntos',
    url: 'https://www.aprendiendojuntos.ec',
    telephone: opciones?.contactoTelefono ?? '(07) 261-3255',
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        opciones?.contactoDireccion ?? 'Bilbao entre Valencia y Lérida',
      addressLocality: 'Loja',
      addressRegion: 'Loja',
      addressCountry: 'EC',
    },
    sameAs: [
      opciones?.redesInstagram,
      opciones?.redesFacebook,
    ].filter(Boolean),
  }
}
