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

function normalizeLabel(value: string | null | undefined) {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export async function getGlobalNavbarLinks(): Promise<NavLink[]> {
  const [serviciosResult, programasResult] = await Promise.allSettled([getServicios(), getProgramas()])

  const serviciosSubmenu: NavbarSubmenuItem[] =
    serviciosResult.status === 'fulfilled'
      ? serviciosResult.value
          .filter(servicio => normalizeLabel(servicio.title) === 'evaluacion neuropsicologica')
          .slice(0, 1)
          .map(servicio => ({
            label: 'Evaluacion Neuropsicologica',
            href: `/servicios/${servicio.slug}`,
          }))
      : []

  const programasSubmenu: NavbarSubmenuItem[] =
    programasResult.status === 'fulfilled'
      ? programasResult.value
          .filter(programa => normalizeLabel(programa.title).includes('preskool'))
          .slice(0, 1)
          .map(programa => ({
            label: 'Programa Preskool',
            href: `/programas/${programa.slug}`,
          }))
      : [{ label: 'Programa Preskool', href: '/programas/preskool' }]

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