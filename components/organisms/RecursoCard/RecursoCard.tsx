'use client'

import { useState } from 'react'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import type { RecursoCardItem } from './RecursoCard.types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface RecursoCardProps {
  item: RecursoCardItem
}

export function RecursoCard({ item }: RecursoCardProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const isEmailValid = EMAIL_REGEX.test(email)

  async function handleDescargar() {
    if (!isEmailValid || loading) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/recurso-descarga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          recursoTitulo: item.titulo,
          recursoUrl: item.archivoUrl,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError((data as { error?: string }).error ?? 'Error al procesar la solicitud')
        return
      }

      setSuccess(true)
      window.open(item.archivoUrl, '_blank', 'noopener,noreferrer')
    } catch {
      setError('No se pudo conectar con el servidor. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-[1.75rem] bg-white p-8 shadow-sm md:flex-row md:items-center md:gap-10 md:p-10">
      {/* Contenedor izquierdo */}
      <div className="flex-1">
        {item.subtitulo && (
          <span className="mb-4 inline-flex rounded-full bg-[#9accea] px-[0.6rem] py-2 font-body text-[0.875rem] font-medium leading-none text-brand-azul md:px-4 md:py-2.5 md:text-[1rem]">
            {item.subtitulo}
          </span>
        )}

        <Heading
          as="h3"
          variant="h3"
          className="mt-3 text-[clamp(1.4rem,2.5vw,2rem)] font-bold leading-tight text-[#0056A4]"
        >
          {item.titulo}
        </Heading>

        {item.descripcion && (
          <Text
            variant="body"
            className="mt-3 text-[clamp(0.875rem,1.25vw,1.05rem)] leading-[1.5] text-[#253a44]"
          >
            {item.descripcion}
          </Text>
        )}
      </div>

      {/* Contenedor derecho */}
      <div className="flex w-full shrink-0 flex-col gap-3 md:w-[340px]">
        <label htmlFor={`email-${item.id}`} className="sr-only">
          Ingresa tu correo para descargar
        </label>
        <input
          id={`email-${item.id}`}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(null)
            if (success) setSuccess(false)
          }}
          placeholder="tu@correo.com"
          className="w-full rounded-full border border-[#d0cdc4] bg-[#f7f6f2] px-5 py-3 text-[0.95rem] text-[#253a44] placeholder-[#9a9890] outline-none transition focus:border-[#0080C9] focus:ring-2 focus:ring-[#0080C9]/20"
          aria-label="Correo electrónico para descargar el recurso"
        />

        <button
          onClick={handleDescargar}
          disabled={!isEmailValid || loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FAB600] px-6 py-3 font-body text-[0.95rem] font-semibold text-[#253a44] transition hover:bg-[#e5a500] disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Descargar ${item.titulo}`}
        >
          {loading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
              Procesando...
            </>
          ) : success ? (
            <>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Descarga iniciada
            </>
          ) : (
            <>
              <span>Descargar recurso</span>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </button>

        {error && (
          <p role="alert" className="text-[0.85rem] text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
