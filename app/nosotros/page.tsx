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

const FALLBACK_EQUIPO: WPMiembroEquipo[] = []

export const metadata: Metadata = {
  title: 'Nosotros | Centro Aprendiendo Juntos',
  description: 'Conoce nuestra historia, propósito y forma de acompañar el desarrollo infantil.',
}

export default async function NosotrosPage() {
  const [nosotrosData, equipoData] = await Promise.all([
    getPaginaNosotros(),
    getEquipo().catch(() => null),
  ])
  const nosotros = nosotrosData
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
        pretitulo={nosotros.heroPretitulo ?? 'Pretitulo'}
        titulo={nosotros.heroTitulo}
        descripcion={nosotros.heroSubtitulo ?? undefined}
        videoSrc={nosotros.heroVideo}
      />

      <AboutStorySection
        pretitulo={nosotros.historiaPretitulo ?? ''}
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
        pretitulo={nosotros.valoresPretitulo ?? ''}
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
          bio: miembro.miembroEquipoFields.bioCosta ?? undefined,
          especialidades: miembro.miembroEquipoFields.especialidades
            ?.map((e) => e.especialidad)
            .filter((e): e is string => Boolean(e)) ?? undefined,
        }))}
      />

      <AboutDiferencialSection
        pretitulo={nosotros.diferencialPretitulo ?? ''}
        titulo={nosotros.diferencialTitulo}
        parrafo={nosotros.heroSubtitulo ?? undefined}
        cards={diferencialCards}
      />

      <AboutCTASection
        pretitulo={nosotros.ctaPretitulo ?? ''}
        titulo={nosotros.ctaTitulo}
        cuerpo={nosotros.ctaCuerpo}
        botonTexto={nosotros.ctaBotonTexto}
        botonHref={nosotros.ctaBotonUrl ?? '/contacto'}
        imagenSrc={nosotros.ctaImagen?.sourceUrl}
        imagenAlt={nosotros.ctaImagen?.altText}
      />
    </main>
  )
}
