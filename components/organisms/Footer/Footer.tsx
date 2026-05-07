import Link from 'next/link'
import type { FooterProps } from './Footer.types'

/**
 * Footer principal del sitio.
 * Stub inicial — se completará con diseño completo.
 */
export function Footer({ links, contactItems, socialLinks }: FooterProps) {
  return (
    <footer className="bg-brand-azul text-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* Columna 1: links de navegación */}
        <div>
          <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-naranja mb-4">
            Navegación
          </h3>
          <ul className="space-y-2">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-white/75 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 2: datos de contacto */}
        <div>
          <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-naranja mb-4">
            Contacto
          </h3>
          <ul className="space-y-3">
            {contactItems.map((item, i) => (
              <li key={i} className="font-body text-sm text-white/75">
                <span className="block text-white/40 text-xs uppercase tracking-wider mb-0.5">
                  {item.label}
                </span>
                {item.href ? (
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: redes sociales */}
        <div>
          <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-naranja mb-4">
            Síguenos
          </h3>
          <ul className="flex gap-4">
            {socialLinks.map((social, i) => (
              <li key={i}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-white/75 hover:text-white transition-colors capitalize"
                >
                  {social.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center">
        <p className="font-body text-xs text-white/40">
          © {new Date().getFullYear()} Centro Aprendiendo Juntos. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
