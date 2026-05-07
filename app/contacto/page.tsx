import type { Metadata } from 'next'
import { ContactoSplitStage } from '@/components/organisms/ContactoSplitStage/ContactoSplitStage'
import { Footer } from '@/components/organisms/Footer'
import { getContacto } from '@/lib/api/contacto'
import { getOpciones } from '@/lib/api/opciones'
import { getGlobalNavbarLinks } from '@/lib/navigation'
import type {
  ContactoInfoSectionData,
  ContactoPageData,
  ContactoSocialLinkData,
} from '@/lib/types/contacto.types'
import type { WPOpcionesGlobales } from '@/lib/types/opciones.types'

const EMPTY_OPCIONES: WPOpcionesGlobales = {
  heroTitulo: '',
  heroSubtitulo: null,
  ctaTexto: '',
  ctaWhatsappNumero: '',
  contactoTelefono: '',
  contactoDireccion: null,
  contactoMapsUrl: null,
  redesInstagram: null,
  redesFacebook: null,
  mensajeBienvenida: null,
}

export const metadata: Metadata = {
  title: 'Contacto | Centro Aprendiendo Juntos',
  description: 'Agenda una consulta y conoce nuestros canales de atención, horarios y ubicación.',
}

function sanitizePhone(value: string) {
  return value.replace(/[^\d+]/g, '')
}

function sanitizeWhatsappPhone(value: string) {
  return value.replace(/\D/g, '')
}

function buildFallbackContacto(opciones: Awaited<ReturnType<typeof getOpciones>>): ContactoPageData {
  return {
    hero: {
      pretitulo: 'Pretitulo',
      titulo: 'Agenda tu visita en Aprendiendo Juntos',
      descripcion:
        'Brindamos atención integral a niños, jóvenes y adultos en Loja, Ecuador. Escríbenos o llámanos para resolver tus dudas, enviarte la ubicación y acompañarte en el siguiente paso.',
    },
    ubicacion: {
      direccion: 'Bilbao 1721 entre Valencia y Logroño.',
      horarios: 'Sector Turunuma Alto, 3 cuadras tras el ECU911, Loja-Ecuador',
    },
    numeros: [
      {
        nombre: 'WhatsApp',
        numero: '098 578 8925',
        descripcion: 'Consultas y agendamiento',
      },
      {
        nombre: 'Teléfono',
        numero: '(07) 261-3255',
        descripcion: 'Atención del centro',
      },
    ],
    correos: [
      {
        nombre: 'Correo general',
        correo: 'servicioscajec@gmail.com',
        descripcion: 'Información general y coordinación',
      },
      {
        nombre: 'Correo profesional',
        correo: 'mmsinchire@hotmail.com',
        descripcion: 'Mónica Marina Sinchire',
      },
    ],
    redes: [
      ...(opciones.redesInstagram
        ? [{ icono: 'instagram' as const, link: opciones.redesInstagram, nombreRed: 'Instagram' }]
        : []),
      ...(opciones.redesFacebook
        ? [{ icono: 'facebook' as const, link: opciones.redesFacebook, nombreRed: 'Facebook' }]
        : []),
      ...(opciones.contactoMapsUrl
        ? [{ icono: 'google' as const, link: opciones.contactoMapsUrl, nombreRed: 'Google Maps' }]
        : []),
    ],
  }
}

function buildInfoSections(
  contacto: ContactoPageData,
  opciones: Awaited<ReturnType<typeof getOpciones>>,
): ContactoInfoSectionData[] {
  const telefonoItems = contacto.numeros.map((numero, index) => {
    const lowerName = numero.nombre.toLowerCase()
    const isWhatsapp =
      lowerName.includes('whats') ||
      sanitizeWhatsappPhone(numero.numero) === sanitizeWhatsappPhone(opciones.ctaWhatsappNumero) ||
      (index === 0 && contacto.numeros.length > 1)

    return {
      iconoSrc: isWhatsapp ? '/whatsapp%20ico.svg' : '/phone%20ico.svg',
      valor: numero.numero,
      descripcion: numero.descripcion,
      href: isWhatsapp
        ? `https://wa.me/${sanitizeWhatsappPhone(numero.numero)}`
        : `tel:${sanitizePhone(numero.numero)}`,
    }
  })

  const correoItems = contacto.correos.map((correo) => ({
    iconoSrc: '/mail%20ico.svg',
    valor: correo.correo,
    descripcion: correo.descripcion,
    href: `mailto:${correo.correo}`,
  }))

  return [
    {
      pretitulo: 'Dirección',
      items: [
        {
          iconoSrc: '/info%20card%20pin%20map%20ico.svg',
          valor: contacto.ubicacion.direccion,
          descripcion: contacto.ubicacion.horarios,
          href: opciones.contactoMapsUrl ?? undefined,
        },
      ],
    },
    {
      pretitulo: 'Teléfonos',
      items: telefonoItems,
    },
    {
      pretitulo: 'Correo electrónico',
      items: correoItems,
    },
  ]
}

function buildSocialLinks(
  contacto: ContactoPageData,
  opciones: Awaited<ReturnType<typeof getOpciones>>,
): ContactoSocialLinkData[] {
  const source =
    contacto.redes.length > 0
      ? contacto.redes
      : [
          ...(opciones.redesInstagram
            ? [{ icono: 'instagram' as const, link: opciones.redesInstagram, nombreRed: 'Instagram' }]
            : []),
          ...(opciones.redesFacebook
            ? [{ icono: 'facebook' as const, link: opciones.redesFacebook, nombreRed: 'Facebook' }]
            : []),
          ...(opciones.contactoMapsUrl
            ? [{ icono: 'google' as const, link: opciones.contactoMapsUrl, nombreRed: 'Google Maps' }]
            : []),
        ]

  return source.map((social) => ({
    plataforma: social.icono,
    nombre: social.nombreRed,
    href: social.link,
  }))
}

export default async function ContactoPage() {
  const [contactoData, opcionesData, navLinks] = await Promise.all([
    getContacto().catch(() => null),
    getOpciones().catch(() => null),
    getGlobalNavbarLinks().catch(() => [] as Awaited<ReturnType<typeof getGlobalNavbarLinks>>),
  ])
  const opciones = opcionesData ?? EMPTY_OPCIONES
  const contacto = contactoData ?? buildFallbackContacto(opciones)
  const infoSections = buildInfoSections(contacto, opciones)
  const socialLinks = buildSocialLinks(contacto, opciones)

  const footerContactItems = [
    {
      type: 'telefono' as const,
      label: 'Teléfono',
      value: opciones.contactoTelefono,
      href: `tel:${sanitizePhone(opciones.contactoTelefono)}`,
    },
    {
      type: 'direccion' as const,
      label: 'Dirección',
      value: contacto.ubicacion.direccion,
      href: opciones.contactoMapsUrl ?? undefined,
    },
  ]

  const footerSocialLinks = [
    ...(opciones.redesInstagram ? [{ platform: 'instagram' as const, href: opciones.redesInstagram }] : []),
    ...(opciones.redesFacebook ? [{ platform: 'facebook' as const, href: opciones.redesFacebook }] : []),
  ]

  return (
    <>
      <main className="overflow-hidden px-0 pt-[4.5rem] md:pt-[2rem]">
        <div id="ubicacion">
          <ContactoSplitStage
            pretitulo={contacto.hero.pretitulo}
            titulo={contacto.hero.titulo}
            descripcion={contacto.hero.descripcion}
            infoSections={infoSections}
            socialPretitulo="Redes sociales"
            socialLinks={socialLinks}
            latitude={-3.9740564558924913}
            longitude={-79.20941891089117}
          />
        </div>
      </main>

      <Footer links={navLinks} contactItems={footerContactItems} socialLinks={footerSocialLinks} />
    </>
  )
}