import type { Metadata } from 'next'
import { RecursosPageTemplate } from '@/components/templates/RecursosPageTemplate'
import { getRecursosPageOptions } from '@/lib/api/recursos-page'
import { getRecursos } from '@/lib/api/recursos'
import { getPaginaNosotros } from '@/lib/api/nosotros'

export const metadata: Metadata = {
  title: 'Recursos | Centro Aprendiendo Juntos',
  description:
    'Descarga materiales, guías y herramientas gratuitas diseñadas por nuestro equipo para apoyar el desarrollo de tus hijos.',
}

export default async function RecursosPage() {
  const [options, recursosRaw, nosotros] = await Promise.all([
    getRecursosPageOptions().catch(() => null),
    getRecursos().catch(() => []),
    getPaginaNosotros().catch(() => null),
  ])

  return (
    <RecursosPageTemplate
      hero={{
        pretitulo: options?.pretitulo ?? 'Estamos para acompañarlos',
        titulo: options?.titulo ?? 'Agenda tu visita en Aprendiendo Juntos',
        descripcion:
          options?.descripcion ??
          'Brindamos atención integral a niños, jóvenes y adultos en Loja, Ecuador. Escríbenos o llámanos para resolver tus dudas, enviarte la ubicación y acompañarte en el siguiente paso.',
        imagenSrc: options?.bgHeroImagen?.node?.sourceUrl ?? '/bg-test.jpg',
      }}
      items={recursosRaw.map((r) => ({
        id: r.id,
        titulo: r.title,
        subtitulo: r.recursoFields.subtitulo ?? null,
        descripcion: r.recursoFields.descripcion ?? null,
        archivoUrl: r.recursoFields.archivo?.node?.mediaItemUrl ?? '',
        archivoNombre: r.recursoFields.archivo?.node?.filePath ?? null,
      }))}
      cta={{
        pretitulo: nosotros?.ctaPretitulo ?? '¿Listo para Transformar el Aprendizaje?',
        heading:
          nosotros?.ctaTitulo ??
          'Tu hijo merece ser comprendido. Nos encantaría conocerte y ser parte de su camino.',
        descripcion: nosotros?.ctaCuerpo ?? undefined,
        ctaLabel: nosotros?.ctaBotonTexto ?? 'Agenda una Consulta',
        ctaHref: nosotros?.ctaBotonUrl ?? '/contacto',
        imagenSrc: nosotros?.ctaImagen?.sourceUrl,
        imagenAlt: nosotros?.ctaImagen?.altText,
      }}
    />
  )
}
