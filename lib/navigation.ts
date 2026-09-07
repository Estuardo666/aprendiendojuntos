import { cache } from 'react'
import type { NavLink, NavbarSubmenuItem } from '@/components/organisms/Navbar'
import { getNavigationConfig } from '@/lib/api/navigation'

async function getGlobalNavbarLinksUncached(): Promise<NavLink[]> {
  const items = await getNavigationConfig()

  return items
    .filter(i => i.visible && i.href)
    .sort((a, b) => a.order - b.order)
    .map(item => ({
      label: item.label,
      href: item.href,
      submenu: item.subitems
        ?.filter(s => s.visible)
        .sort((a, b) => a.order - b.order)
        .map(s => ({
          label: s.label,
          href: s.href,
        })),
    }))
}

export const getGlobalNavbarLinks = cache(getGlobalNavbarLinksUncached)
