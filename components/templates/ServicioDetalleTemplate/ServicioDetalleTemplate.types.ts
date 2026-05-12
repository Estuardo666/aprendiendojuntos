import type { ServiceHeroProps } from '@/components/organisms/ServiceHero'
import type { ServiceContentSectionProps } from '@/components/organisms/ServiceContentSection'
import type { ProcessStepsSectionProps } from '@/components/organisms/ProcessStepsSection'
import type { ServiceCTASectionProps } from '@/components/organisms/ServiceCTASection'
import type { FAQServiceSectionProps } from '@/components/organisms/FAQServiceSection'
import type { ServicesStackingSliderProps } from '@/components/organisms/ServicesStackingSlider'
import type { KeywordsMarqueeProps } from '@/components/organisms/KeywordsMarquee'

export interface ServicioDetalleTemplateProps {
  hero:         ServiceHeroProps
  contenido:    ServiceContentSectionProps
  proceso:      ProcessStepsSectionProps
  cta:          ServiceCTASectionProps
  /** FAQs opcionales — si no se pasa, la sección no se renderiza */
  faqs?:        FAQServiceSectionProps
  masServicios: ServicesStackingSliderProps
  marquee:      KeywordsMarqueeProps
}
