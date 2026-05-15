'use client'

import { cn } from '@/lib/utils/cn'
import type { ServiceFilterPillsProps } from './ServiceFilterPills.types'

export function ServiceFilterPills({
  filters,
  activeFilter,
  onSelect,
  allLabel = 'Todos',
}: ServiceFilterPillsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          'rounded-full px-5 py-2.5 font-body text-sm font-medium transition-colors duration-300',
          activeFilter === null
            ? 'bg-brand-azul text-white'
            : 'bg-brand-celeste text-white hover:bg-brand-azul',
        )}
      >
        {allLabel}
      </button>
      {filters.map((filter) => (
        <button
          key={filter.slug}
          type="button"
          onClick={() => onSelect(filter.slug)}
          className={cn(
            'rounded-full px-5 py-2.5 font-body text-sm font-medium transition-colors duration-300',
            activeFilter === filter.slug
              ? 'bg-brand-azul text-white'
              : 'bg-brand-celeste text-white hover:bg-brand-azul',
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
