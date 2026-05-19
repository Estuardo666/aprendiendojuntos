import type { Metadata } from 'next'
import { Button } from '@/components/atoms/Button'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Centro Aprendiendo Juntos',
  description: 'Conoce nuestra política de privacidad y cómo protegemos tus datos personales.',
}

export default function PoliticaPrivacidadPage() {
  return (
    <main className="min-h-screen bg-brand-crema px-6 py-16 md:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="font-heading text-h1 font-bold text-brand-azul mb-4">
            Política de Privacidad
          </h1>
          <p className="font-body text-lead text-brand-azul/80">
            Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              1. Información que recopilamos
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              En el Centro Neuropsicopedagógico Aprendiendo Juntos, recopilamos información personal que nos proporcionas voluntariamente cuando:
            </p>
            <ul className="font-body text-body text-brand-azul/80 list-disc list-inside space-y-2">
              <li>Completas formularios de contacto en nuestro sitio web</li>
              <li>Solicitas información sobre nuestros servicios y programas</li>
              <li>Agendas una cita o consulta</li>
              <li>Te comunicas con nosotros por correo electrónico, teléfono o WhatsApp</li>
            </ul>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              2. Uso de la información
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="font-body text-body text-brand-azul/80 list-disc list-inside space-y-2">
              <li>Proporcionar los servicios y programas que solicitas</li>
              <li>Responderte a tus consultas y solicitudes de información</li>
              <li>Agendar y gestionar tus citas</li>
              <li>Mejorar nuestros servicios y experiencia del usuario</li>
              <li>Enviarte comunicaciones relevantes sobre nuestros servicios (con tu consentimiento)</li>
            </ul>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              3. Protección de datos
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              4. Compartición de información
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              No vendemos, alquilamos ni compartimos tu información personal con terceros para fines de marketing. Solo podemos compartir tu información cuando:
            </p>
            <ul className="font-body text-body text-brand-azul/80 list-disc list-inside space-y-2">
              <li>Es necesario para proporcionar los servicios solicitados</li>
              <li>Lo exige la ley o una autoridad competente</li>
              <li>Contamos con tu consentimiento explícito</li>
            </ul>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              5. Tus derechos
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              Tienes derecho a:
            </p>
            <ul className="font-body text-body text-brand-azul/80 list-disc list-inside space-y-2">
              <li>Acceder a tu información personal</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
            <p className="font-body text-body text-brand-azul/80 mt-4">
              Para ejercer estos derechos, contáctanos a través de nuestros canales de atención.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              6. Cookies
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              Nuestro sitio web puede utilizar cookies para mejorar tu experiencia de navegación. Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades del sitio.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              7. Cambios a esta política
            </h2>
            <p className="font-body text-body text-brand-azul/80">
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Te notificaremos sobre cambios significativos a través de nuestro sitio web o por correo electrónico.
            </p>
          </section>

          <section className="bg-brand-blanco rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-h2 font-bold text-brand-azul mb-4">
              8. Contacto
            </h2>
            <p className="font-body text-body text-brand-azul/80 mb-4">
              Si tienes preguntas sobre esta política de privacidad o sobre el manejo de tus datos personales, contáctanos:
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
