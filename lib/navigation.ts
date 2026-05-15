import type { NavLink, NavbarSubmenuItem } from '@/components/organisms/Navbar'
import { getLandingPages } from '@/lib/api/landing-pages'
import { getProgramas } from '@/lib/api/programas'
import { getServicios } from '@/lib/api/servicios'

const BASE_NAV_LINKS: Array<Omit<NavLink, 'submenu'>> = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Programas', href: '/programas' },
  { label: 'Eventos', href: '/landing' },
  { label: 'Testimonios', href: '/testimonios' },
  { label: 'Contacto', href: '/contacto' },
]

export async function getGlobalNavbarLinks(): Promise<NavLink[]> {
  const [serviciosResult, programasResult, landingPagesResult] = await Promise.allSettled([
    getServicios(),
    getProgramas(),
    getLandingPages(),
  ])

  const serviciosSubmenu: NavbarSubmenuItem[] =
    serviciosResult.status === 'fulfilled'
      ? serviciosResult.value
          .map(servicio => ({
            label: servicio.title,
            href: `/servicios/${servicio.slug}`,
          }))
      : []

  const programasSubmenu: NavbarSubmenuItem[] =
    programasResult.status === 'fulfilled'
      ? programasResult.value
          .map(programa => ({
            label: programa.title,
            href: `/programas/${programa.slug}`,
          }))
      : []

  const landingPagesSubmenu: NavbarSubmenuItem[] =
    landingPagesResult.status === 'fulfilled'
      ? landingPagesResult.value
          .map(lp => ({
            label: lp.title,
            href: `/landing/${lp.slug}`,
          }))
      : []

  return BASE_NAV_LINKS.map(link => {
    if (link.href === '/servicios') {
      return { ...link, submenu: serviciosSubmenu }
    }

    if (link.href === '/programas') {
      return { ...link, submenu: programasSubmenu }
    }

    if (link.href === '/landing') {
      return { ...link, submenu: landingPagesSubmenu }
    }

    return link
  })
}
