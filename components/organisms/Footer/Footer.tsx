'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Icon } from '@/components/atoms/Icon'
import type { ContactItem, FeaturedLink, FooterProps, SocialLinkItem } from './Footer.types'

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
 * Estructura de 5 columnas: Logo+redes | Explorar | Servicios | Programas | Contacto.
 */
export function Footer({ logoUrl, logoAlt, description, links, contactItems, socialLinks, serviciosDestacados, programasDestacados }: FooterProps) {
  const exploreLinks = links.filter(l => l.href !== '/landing' && l.href !== '/' && l.label !== 'Inicio')
  const serviciosLinks = (serviciosDestacados ?? []).slice(0, 5)
  const programasLinks = (programasDestacados ?? []).slice(0, 5)

  return (
    <footer className="bg-brand-footer text-white pt-16 pb-6 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_auto_1fr_1fr_auto] gap-10 lg:gap-6">

        {/* Columna 1: Logo + descripción + redes sociales */}
        <div className="sm:col-span-2 lg:col-span-1 lg:pr-6">
          <Link href="/" aria-label="Inicio">
            <Image
              src={logoUrl ?? '/logobgazul2.png'}
              alt={logoAlt ?? 'Aprendiendo Juntos'}
              width={200}
              height={64}
              className="h-20 w-auto mb-6"
            />
          </Link>
          {socialLinks.length > 0 && (
            <ul className="flex gap-3">
              {socialLinks.map((social, i) => (
                <li key={i}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-crema text-brand-azul hover:bg-brand-naranja hover:text-brand-azul transition-colors duration-200"
                  >
                    <Icon name={socialIconMap[social.platform] as any} size="sm" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Columna 2: Explorar */}
        <div className="lg:mr-6">
          <h4 className="font-heading text-[1.3rem] font-bold text-white mb-5">
            Explorar
          </h4>
          <ul className="space-y-2.5">
            {exploreLinks.map(link => (
              <li key={link.href}>
                <motion.div
                  className="relative inline-block"
                  initial="rest"
                  whileHover="hover"
                >
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="font-body text-sm text-white hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-brand-naranja origin-left"
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Servicios destacados */}
        <div>
          <h4 className="font-heading text-[1.3rem] font-bold text-white mb-5">
            Servicios destacados
          </h4>
          <ul className="space-y-2.5">
            {serviciosLinks.map((link: FeaturedLink) => (
              <li key={link.href}>
                <motion.div
                  className="relative inline-block"
                  initial="rest"
                  whileHover="hover"
                >
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="font-body text-sm text-white hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-brand-naranja origin-left"
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 4: Programas destacados */}
        <div>
          <h4 className="font-heading text-[1.3rem] font-bold text-white mb-5">
            Programas destacados
          </h4>
          <ul className="space-y-2.5">
            {programasLinks.map((link: FeaturedLink) => (
              <li key={link.href}>
                <motion.div
                  className="relative inline-block"
                  initial="rest"
                  whileHover="hover"
                >
                  <Link
                    href={link.href}
                    prefetch={false}
                    className="font-body text-sm text-white hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                  <motion.span
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-brand-naranja origin-left"
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                </motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 5: Contacto */}
        <div>
          <h4 className="font-heading text-[1.3rem] font-bold text-white mb-5">
            Contacto
          </h4>
          <ul className="space-y-4">
            {contactItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-acua text-brand-azul">
                  <Icon name={contactIconMap[item.type] as any} size="sm" className="[&_svg]:stroke-[2]" />
                </span>
                <div className="font-body text-sm text-white">
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

      <div className="max-w-7xl mx-auto mt-14">
        <img
          src="/separador amarillo.svg"
          alt=""
          aria-hidden="true"
          className="mx-auto mb-10 h-auto w-full max-w-[15rem]"
        />
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
          <p className="font-body text-xs text-white/40">
            &copy; {new Date().getFullYear()} Centro Aprendiendo Juntos. Todos los derechos reservados.
          </p>
          <span className="hidden md:block text-white/20">|</span>
          <div className="flex gap-4">
            <Link
              href="/politica-privacidad"
              prefetch={false}
              className="font-body text-xs text-white/40 hover:text-white/60 transition-colors duration-200"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/terminos-uso"
              prefetch={false}
              className="font-body text-xs text-white/40 hover:text-white/60 transition-colors duration-200"
            >
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
