import type { NavLink, NavbarSubmenuItem } from '@/components/organisms/Navbar'
import { getProgramas } from '@/lib/api/programas'
import { getServicios } from '@/lib/api/servicios'

const BASE_NAV_LINKS: Array<Omit<NavLink, 'submenu'>> = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Programas', href: '/programas' },
  { label: 'Testimonio', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
]

export async function getGlobalNavbarLinks(): Promise<NavLink[]> {
  const [serviciosResult, programasResult] = await Promise.allSettled([getServicios(), getProgramas()])

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

  return BASE_NAV_LINKS.map(link => {
    if (link.href === '/servicios') {
      return { ...link, submenu: serviciosSubmenu }
    }

    if (link.href === '/programas') {
      return { ...link, submenu: programasSubmenu }
    }

    return link
  })
}
