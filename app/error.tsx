'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[app/error]', error)
  }, [error])

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-brand-crema px-6 py-24">
      <div className="max-w-xl text-center">
        <h1 className="font-heading text-h2 text-brand-azul">
          Estamos teniendo un problema temporal
        </h1>
        <p className="mt-4 font-body text-lead text-brand-azul/80">
          No pudimos cargar el contenido en este momento. Vuelve a intentarlo en unos
          segundos.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-full bg-brand-naranja px-8 py-3 font-heading text-brand-azul transition hover:bg-brand-celeste hover:text-white"
        >
          Reintentar
        </button>
      </div>
    </main>
  )
}
