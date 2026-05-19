import type { Metadata } from 'next'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Términos de Uso | Centro Aprendiendo Juntos',
  description: 'Conoce los términos y condiciones de uso de nuestro sitio web y servicios.',
}

export default function TerminosUsoPage() {
  return (
    <main className="min-h-screen bg-brand-crema px-6 py-16 md:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="font-heading text-h1 font-bold text-brand-azul mb-4">
            Términos de Uso
          </h1>
          <p className="font-body text-lead text-brand-azul/80">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              1. Aceptación de términos
            </h2>
            <p className="font-body text-body text-brand-azul/80">
              Al acceder y utilizar el sitio web del Centro Neuropsicopedagógico Aprendiendo Juntos, aceptas cumplir con estos términos de uso y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con estos términos, por favor no utilices nuestro sitio web.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              2. Uso del sitio web
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              Puedes utilizar este sitio web para:
            </p>
            <ul className="font-body text-body text-brand-azul/80 list-disc list-inside space-y-2">
              <li>Informarte sobre nuestros servicios y programas</li>
              <li>Contactarnos para solicitar información o agendar citas</li>
              <li>Acceder a recursos educativos y contenido relevante</li>
            </ul>
            <p className="font-body text-body text-brand-azul/80 mt-4">
              No está permitido:
            </p>
            <ul className="font-body text-body text-brand-azul/80 list-disc list-inside space-y-2">
              <li>Utilizar el sitio para fines ilegales o no autorizados</li>
              <li>Reproducir, duplicar o distribuir contenido sin autorización</li>
              <li>Intentar acceder a partes del sitio sin autorización</li>
              <li>Interferir con el funcionamiento del sitio web</li>
            </ul>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              3. Contenido del sitio
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              El contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseños, es propiedad del Centro Neuropsicopedagógico Aprendiendo Juntos y está protegido por leyes de propiedad intelectual.
            </p>
            <p className="font-body text-body text-brand-azul/80">
              Nos esforzamos por mantener la información actualizada y precisa, pero no garantizamos que el contenido esté libre de errores o sea completo. El uso de la información es bajo tu propio riesgo.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              4. Servicios y citas
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              Respecto a la agendación y prestación de servicios:
            </p>
            <ul className="font-body text-body text-brand-azul/80 list-disc list-inside space-y-2">
              <li>La agendación de citas está sujeta a disponibilidad</li>
              <li>Es necesario proporcionar información veraz y completa</li>
              <li>Las cancelaciones o reprogramaciones deben realizarse con anticipación</li>
              <li>Nos reservamos el derecho de modificar o suspender servicios según sea necesario</li>
            </ul>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              5. Limitación de responsabilidad
            </h2>
            <p className="font-body text-body text-brand-azul/80">
              El Centro Neuropsicopedagógico Aprendiendo Juntos no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso o incapacidad de usar este sitio web o nuestros servicios.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              6. Enlaces a terceros
            </h2>
            <p className="font-body text-body text-brand-azul/80">
              Nuestro sitio web puede contener enlaces a sitios web de terceros. No tenemos control sobre el contenido de estos sitios y no asumimos responsabilidad por ellos. Los enlaces se proporcionan solo para tu conveniencia.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              7. Privacidad
            </h2>
            <p className="font-body text-body text-brand-azul/80">
              Tu uso de este sitio web también está regido por nuestra Política de Privacidad. Por favor revisa nuestra política para entender cómo recopilamos, usamos y protegemos tu información personal.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              8. Modificaciones a los términos
            </h2>
            <p className="font-body text-body text-brand-azul/80">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor tan pronto como se publiquen en el sitio web. Tu uso continuado del sitio después de los cambios constituye la aceptación de los nuevos términos.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              9. Legislación aplicable
            </h2>
            <p className="font-body text-body text-brand-azul/80">
              Estos términos se rigen por las leyes de la República del Ecuador. Cualquier disputa relacionada con estos términos o el uso del sitio web será resuelta en los tribunales de Loja, Ecuador.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              10. Contacto
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              Si tienes preguntas sobre estos términos de uso, contáctanos:
            </p>
            <ul className="font-body text-body text-brand-azul/80 list-disc list-inside space-y-2">
              <li>Correo: servicioscajec@gmail.com</li>
              <li>Teléfono: (07) 261-3255</li>
              <li>Dirección: Bilbao 1721 entre Valencia y Logroño, Loja-Ecuador</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Button variant="primary" size="lg" iconName="ArrowRightIcon" iconAnimation="slide" href="/contacto" className="rounded-full">
            Contáctanos
          </Button>
        </div>
      </div>
    </main>
  )
}
