import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPrograma, getProgramas } from '@/lib/api/programas'
import { ProgramaHero } from '@/components/organisms/ProgramaHero'
import { ProgramaDescripcionSection } from '@/components/organisms/ProgramaDescripcionSection'
import { ProgramaInfoCardsSection } from '@/components/organisms/ProgramaInfoCardsSection'
import { ProgramaMasProgramasSection } from '@/components/organisms/ProgramaMasProgramasSection'
import { ProgramaCTABottomSection } from '@/components/organisms/ProgramaCTABottomSection'

async function getProgramasSafe() {
  try {
    return await getProgramas()
  } catch {
    return []
  }
}

async function getProgramaSafe(slug: string) {
  try {
    return await getPrograma(slug)
  } catch {
    return null
  }
}

// ─── SSG: genera rutas estáticas para todos los programas ────────────────────
export async function generateStaticParams() {
  const programas = await getProgramasSafe()
  return programas.map((p) => ({ slug: p.slug }))
}

// ─── Metadatos dinámicos ─────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const programa = await getProgramaSafe(slug)
  if (!programa) return { title: 'Programa no encontrado' }

  return {
    title: `${programa.title} | Centro Aprendiendo Juntos`,
    description: programa.programaFields.descripcion,
    openGraph: {
      title: programa.title,
      description: programa.programaFields.descripcion,
      images: programa.programaFields.imagenDestacada?.node.sourceUrl
        ? [{ url: programa.programaFields.imagenDestacada.node.sourceUrl }]
        : [],
    },
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function ProgramaPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const [programa, programas] = await Promise.all([
    getProgramaSafe(slug),
    getProgramasSafe(),
  ])

  if (!programa) notFound()

  const f = programa.programaFields

  // Construir slides del carrusel: galería primero, fallback imagenDestacada
  const imagenesCarrusel = (f.galeria ?? [])
    .map((g) => ({
      sourceUrl: g.imagen.node.sourceUrl,
      altText: g.imagen.node.altText ?? undefined,
    }))
    .filter((img) => Boolean(img.sourceUrl))

  if (imagenesCarrusel.length === 0 && f.imagenDestacada?.node.sourceUrl) {
    imagenesCarrusel.push({
      sourceUrl: f.imagenDestacada.node.sourceUrl,
      altText: f.imagenDestacada.node.altText ?? undefined,
    })
  }

  const masProgramas = {
    heading: 'Más programas',
    slides: programas
      .filter((item) => item.slug !== programa.slug)
      .map((item) => ({
        titulo: item.title,
        slug: item.slug,
        imagenSrc: item.programaFields.imagenDestacada?.node.sourceUrl,
        imagenAlt: item.programaFields.imagenDestacada?.node.altText ?? item.title,
        categoria: item.programaFields.tags?.nodes[0]?.name ?? 'Programa',
        ctaLabel: 'Ver programa',
      })),
  }

  return (
    <main>
      <ProgramaHero
        pretitulo={programa.title}
        logoSrc={f.logoPrograma?.node.sourceUrl}
        logoAlt={f.logoPrograma?.node.altText || programa.title}
        descripcion={f.descripcionHeroTexto ?? f.descripcion}
        cta1Label={f.ctaLabel ?? undefined}
        cta1Href={f.ctaHref ?? '#'}
        cta2Label={f.cta2Label ?? undefined}
        cta2Href={f.cta2Href ?? '#'}
        imagenesCarrusel={imagenesCarrusel}
      />

      <ProgramaDescripcionSection
        fraseDestacada={f.fraseDestacada}
        descripcion={f.descripcion}
        beneficios={f.beneficios}
        ctaBotonTexto={f.ctaBotonTexto}
        ctaHref={f.ctaHref ?? '#'}
      />

      <ProgramaInfoCardsSection
        modalidad={f.modalidad}
        edadObjetivo={f.edadObjetivo}
        duracionSesion={f.duracionSesion}
        frecuencia={f.frecuencia}
      />

      <ProgramaCTABottomSection
        pretitulo={f.ctaPretitulo ?? undefined}
        heading={f.ctaTitulo ?? programa.title}
        descripcion={f.descripcionCta ?? undefined}
        ctaLabel={f.ctaBotonTexto ?? f.ctaLabel}
        ctaHref={f.ctaHref ?? '#'}
        imagenSrc={f.imagenDestacada?.node.sourceUrl}
        imagenAlt={f.imagenDestacada?.node.altText || programa.title}
      />

      <ProgramaMasProgramasSection
        heading={masProgramas.heading}
        slides={masProgramas.slides}
      />
    </main>
  )
}
