import type { Metadata } from 'next'
import { AboutHero } from '@/components/organisms/AboutHero'
import { AboutStorySection } from '@/components/organisms/AboutStorySection'
import { AboutDiferencialSection } from '@/components/organisms/AboutDiferencialSection'
import { AboutCTASection } from '@/components/organisms/AboutCTASection'
import { AboutTeamSection } from '@/components/organisms/AboutTeamSection'
import { AboutValuesSection } from '@/components/organisms/AboutValuesSection'
import { getEquipo } from '@/lib/api/equipo'
import { getPaginaNosotros } from '@/lib/api/nosotros'
import type { WPMiembroEquipo } from '@/lib/types/equipo.types'
import type { WPPaginaNosotrosFields } from '@/lib/types/nosotros.types'

const FALLBACK_NOSOTROS: WPPaginaNosotrosFields = {
  heroTitulo: 'Conoce Aprendiendo Juntos',
  heroSubtitulo: 'Acompanamos el desarrollo infantil con una mirada humana, clinica y educativa.',
  heroImagenes: [],
  historiaTitulo: 'Nuestra historia',
  historiaCuerpo:
    'Trabajamos junto a ninos, familias y docentes para construir procesos de acompanamiento claros, cercanos y sostenibles.',
  historiaImagenes: [],
  propositoCuerpo: 'Crear espacios de evaluacion, intervencion y orientacion centrados en el potencial de cada persona.',
  misionCuerpo: 'Ofrecer acompanamiento interdisciplinario con criterio tecnico y calidez humana.',
  visionCuerpo: 'Ser un referente local en desarrollo infantil, neurodiversidad y trabajo con familias.',
  valoresTitulo: 'Nuestros valores',
  valoresIntro: 'Trabajo colaborativo, respeto y compromiso con cada proceso.',
  valores: [],
  diferencialTitulo: 'Lo que nos diferencia',
  diferencialItems: [],
  ctaTitulo: 'Hablemos',
  ctaCuerpo: 'Si quieres conocer mas sobre nuestro enfoque, estamos listos para ayudarte.',
  ctaBotonTexto: 'Contactanos',
}

const FALLBACK_EQUIPO: WPMiembroEquipo[] = []

export const metadata: Metadata = {
  title: 'Nosotros | Centro Aprendiendo Juntos',
  description: 'Conoce nuestra historia, propósito y forma de acompañar el desarrollo infantil.',
}

export default async function NosotrosPage() {
  const [nosotrosData, equipoData] = await Promise.all([
    getPaginaNosotros().catch(() => null),
    getEquipo().catch(() => null),
  ])
  const nosotros = nosotrosData ?? FALLBACK_NOSOTROS
  const equipo = equipoData ?? FALLBACK_EQUIPO
  const imagenesHistoria = [...(nosotros.historiaImagenes ?? []), ...(nosotros.heroImagenes ?? [])]
    .map((item) => item.imagen)
    .filter((img): img is NonNullable<typeof img> => Boolean(img?.sourceUrl))

  const imagenesStack = (() => {
    if (imagenesHistoria.length >= 4) return imagenesHistoria.slice(0, 4)

    if (nosotros.imagenDestacada?.sourceUrl) {
      return [...imagenesHistoria, ...Array.from({ length: 4 - imagenesHistoria.length }, () => nosotros.imagenDestacada!)].slice(0, 4)
    }

    return imagenesHistoria
  })()

  const diferencialImages = [...(nosotros.heroImagenes ?? []), ...(nosotros.historiaImagenes ?? [])]
    .map((item) => item.imagen)
    .filter((img): img is NonNullable<typeof img> => Boolean(img?.sourceUrl))

  const diferencialCards = nosotros.diferencialItems.slice(0, 4).map((item, index) => ({
    id: `${item.titulo}-${index}`,
    titulo: item.titulo,
    descripcion: item.descripcion,
    imagenSrc: diferencialImages[index]?.sourceUrl,
    imagenAlt: diferencialImages[index]?.altText ?? item.titulo,
  }))

  return (
    <main>
      <AboutHero
        pretitulo="Pretitulo"
        titulo={nosotros.heroTitulo}
        descripcion={nosotros.heroSubtitulo ?? undefined}
        imagenDestacada={nosotros.imagenDestacada}
        imagenesCarrusel={nosotros.heroImagenes ?? []}
      />

      <AboutStorySection
        pretitulo="Pretitulo"
        titulo={nosotros.historiaTitulo}
        parrafo={nosotros.historiaCuerpo}
        accordionItems={[
          { titulo: 'Propósito', contenido: nosotros.propositoCuerpo },
          { titulo: 'Misión', contenido: nosotros.misionCuerpo },
          { titulo: 'Visión', contenido: nosotros.visionCuerpo },
        ]}
        imagenes={imagenesStack}
      />

      <AboutValuesSection
        pretitulo="Pretitulo"
        titulo={nosotros.valoresTitulo}
        descripcion={nosotros.valoresIntro}
        valores={nosotros.valores}
      />

      <AboutTeamSection
        pretitulo="El equipo que te acompaña"
        titulo="Profesionales formados, comprometidos y en constante especialización."
        miembros={equipo.map((miembro) => ({
          id: miembro.id,
          nombre: miembro.title,
          cargo: miembro.miembroEquipoFields.cargo,
          fotoSrc: miembro.miembroEquipoFields.foto?.node.sourceUrl,
          fotoAlt: miembro.miembroEquipoFields.foto?.node.altText ?? miembro.title,
        }))}
      />

      <AboutDiferencialSection
        pretitulo="Pretitulo"
        titulo={nosotros.diferencialTitulo}
        parrafo={nosotros.heroSubtitulo ?? undefined}
        cards={diferencialCards}
      />

      <AboutCTASection
        pretitulo="Pretitulo"
        titulo={nosotros.ctaTitulo}
        cuerpo={nosotros.ctaCuerpo}
        botonTexto={nosotros.ctaBotonTexto}
        botonHref="/contacto"
        imagenSrc={nosotros.ctaImagen?.sourceUrl}
        imagenAlt={nosotros.ctaImagen?.altText}
      />
    </main>
  )
}
