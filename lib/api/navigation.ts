import { cache } from 'react'
import { fetchGraphQL } from '@/lib/graphql'
import type { NavItem } from '@/lib/types/navigation.types'

const REVALIDATE = 3600

const NAVIGATION_QUERY = `
  query GetNavigation {
    ajNavigation {
      id
      type
      label
      href
      target
      order
      visible
      cpt
      subitems {
        id
        label
        href
        sourceId
        visible
        order
      }
    }
  }
`

interface GetNavigationResponse {
  ajNavigation: NavItem[]
}

async function getNavigationConfigUncached(): Promise<NavItem[]> {
  const data = await fetchGraphQL<GetNavigationResponse>(
    NAVIGATION_QUERY,
    undefined,
    REVALIDATE,
  )
  return data.ajNavigation ?? []
}

export const getNavigationConfig = cache(getNavigationConfigUncached)
