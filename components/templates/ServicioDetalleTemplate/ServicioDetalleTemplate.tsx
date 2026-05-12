import { ServiceHero } from '@/components/organisms/ServiceHero'
import { ServiceContentSection } from '@/components/organisms/ServiceContentSection'
import { ProcessStepsSection } from '@/components/organisms/ProcessStepsSection'
import { ServiceCTASection } from '@/components/organisms/ServiceCTASection'
import { FAQServiceSection } from '@/components/organisms/FAQServiceSection'
import { ServicesStackingSlider } from '@/components/organisms/ServicesStackingSlider'
import { KeywordsMarquee } from '@/components/organisms/KeywordsMarquee'
import type { ServicioDetalleTemplateProps } from './ServicioDetalleTemplate.types'

/**
 * Template de detalle de servicio.
 * Server Component puro — orquesta todos los organismos sin lógica propia.
 * El page.tsx es el único responsable de transformar los datos WP → estas props.
 */
export function ServicioDetalleTemplate({
  hero,
  contenido,
  proceso,
  cta,
  faqs,
  masServicios,
  marquee,
}: ServicioDetalleTemplateProps) {
  return (
    <>
      <main>
        {/* 1. Hero: imagen full-width + título + CTAs */}
        <ServiceHero {...hero} />

        {/* 2. Contenido: descripción larga WP + imagen + tags */}
        <ServiceContentSection {...contenido} />

        {/* 3. Proceso: cards expandibles paso a paso */}
        <ProcessStepsSection {...proceso} />

        {/* 4. CTA: llamada a la acción fondo azul */}
        <ServiceCTASection {...cta} />

        {/* 5. FAQs: accordion con degradado (opcional) */}
        {faqs && <FAQServiceSection {...faqs} />}

        {/* 6. Más servicios: slider horizontal */}
        <ServicesStackingSlider {...masServicios} />

        {/* 7. Marquee: keywords animadas antes del footer */}
        <KeywordsMarquee {...marquee} />
      </main>
    </>
  )
}
