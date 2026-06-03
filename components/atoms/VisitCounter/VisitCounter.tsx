'use client'

import { useEffect, useState } from 'react'

const BASE_COUNT = 12917
const STORAGE_KEY = 'aj_visit_count'

export function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const current = stored ? parseInt(stored, 10) : BASE_COUNT
    const next = current + 1
    localStorage.setItem(STORAGE_KEY, String(next))
    setCount(next)
  }, [])

  const display = (count ?? BASE_COUNT).toLocaleString('es-EC')

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-body text-sm font-semibold text-white/60">
        Visitas
      </span>
      <span className="inline-flex rounded-lg bg-brand-naranja px-4 py-1.5 font-body text-sm font-bold text-brand-azul">
        {display}
      </span>
    </div>
  )
}
