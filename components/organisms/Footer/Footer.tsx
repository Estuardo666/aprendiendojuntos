import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/atoms/Icon'
import type { ContactItem, FooterProps, SocialLinkItem } from './Footer.types'

const contactIconMap: Record<ContactItem['type'], string> = {
  direccion: 'MapPinIcon',
  telefono: 'PhoneIcon',
  whatsapp: 'WhatsappIcon',
  email: 'MailIcon',
}

const socialIconMap: Record<SocialLinkItem['platform'], string> = {
  instagram: 'InstagramIcon',
  facebook: 'FacebookIcon',
  tiktok: 'TiktokIcon',
}

/**
 * Footer principal del sitio.
 * Estructura de 4 columnas: Logo+desc+redes | Explorar | Familias | Contacto.
 */
export function Footer({ logoUrl, logoAlt, description, links, contactItems, socialLinks }: FooterProps) {
  const exploreLinks = links.filter(l => l.href !== '/landing')
  const familyHrefs = new Set(['/servicios', '/programas', '/blog', '/contacto'])
  const familyLinks = links.filter(l => familyHrefs.has(l.href))

  return (
    <footer className="bg-brand-azul text-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

        {/* Columna 1: Logo + descripción + redes sociales */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label="Inicio">
            <Image
              src={logoUrl ?? '/logoamarillo.svg'}
              alt={logoAlt ?? 'Aprendiendo Juntos'}
              width={200}
              height={64}
              className="h-10 w-auto mb-6"
            />
          </Link>
          <p className="font-body text-sm text-white/70 leading-relaxed mb-6 max-w-xs">
            {description ?? 'Centro neuropsicopedagógico dedicado al desarrollo integral de niños y niñas a través de terapias especializadas, programas educativos y acompañamiento familiar.'}
          </p>
          {socialLinks.length > 0 && (
            <ul className="flex gap-3">
              {socialLinks.map((social, i) => (
                <li key={i}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-brand-naranja hover:text-brand-azul transition-colors duration-200"
                  >
                    <Icon name={socialIconMap[social.platform] as any} size="sm" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Columna 2: Explorar */}
        <div>
          <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 font-heading text-[0.7rem] font-bold uppercase tracking-wider text-white/90 mb-5">
            Explorar
          </span>
          <ul className="space-y-2.5">
            {exploreLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-white/70 hover:text-brand-naranja transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Familias */}
        <div>
          <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 font-heading text-[0.7rem] font-bold uppercase tracking-wider text-white/90 mb-5">
            Familias
          </span>
          <ul className="space-y-2.5">
            {familyLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-white/70 hover:text-brand-naranja transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div>
          <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 font-heading text-[0.7rem] font-bold uppercase tracking-wider text-white/90 mb-5">
            Contacto
          </span>
          <ul className="space-y-4">
            {contactItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex shrink-0 text-brand-naranja">
                  <Icon name={contactIconMap[item.type] as any} size="sm" />
                </span>
                <div className="font-body text-sm text-white/70">
                  {item.href ? (
                    <a href={item.href} className="hover:text-white transition-colors duration-200">
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-white/10 text-center">
        <p className="font-body text-xs text-white/40">
          &copy; {new Date().getFullYear()} Centro Aprendiendo Juntos. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
