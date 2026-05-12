'use client'

import { useState, useId } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@/components/atoms/Icon'
import type { LandingPageFormProps } from './LandingPageForm.types'

type FormState = 'idle' | 'loading' | 'success' | 'error'

/* ─── Campo con placeholder flotante animado ─────────────────────────────── */
interface AnimatedFieldProps {
  id: string
  type: string
  autoComplete: string
  value: string
  onChange: (v: string) => void
  placeholder: string
}

function AnimatedField({ id, type, autoComplete, value, onChange, placeholder }: AnimatedFieldProps) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  // h-[52px] → mitad = 26px. Label de 0.97rem ≈ 15.5px → mitad ≈ 8px
  // En reposo: top=0, y=18px  (26 - 8 = centro vertical)
  // Activo:    top=0, y=6px   (pegado arriba con margen)
  return (
    <div className="relative h-[52px]">
      <motion.label
        htmlFor={id}
        initial={false}
        animate={active ? { y: 6, scale: 0.76, opacity: 0.55 } : { y: 18, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28, mass: 0.8 }}
        className="pointer-events-none absolute left-5 top-0 origin-left font-body text-[0.97rem] font-medium text-brand-azul"
      >
        {placeholder}
      </motion.label>

      <input
        id={id}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={placeholder}
        placeholder=" "
        className="h-full w-full rounded-2xl border-2 border-transparent bg-[#deeef8] px-5 pb-1 pt-5 font-body text-[0.97rem] text-brand-azul outline-none transition-all duration-200 focus:border-brand-celeste focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,128,201,0.12)]"
      />
    </div>
  )
}

/* ─── Botón arrow dedicado para el formulario ────────────────────────────── */
const fillTransition = { type: 'spring', stiffness: 300, damping: 30, mass: 0.95 } as const
const elemTransition = { type: 'spring', stiffness: 340, damping: 26, mass: 0.9 } as const
const fadeIn  = { duration: 0.78, delay: 0.06, ease: [0.22, 1, 0.36, 1] } as const
const fadeOut = { duration: 0.32, ease: [0.4, 0, 0.2, 1] } as const

interface FormSubmitButtonProps {
  label: string
  isLoading: boolean
}

function FormSubmitButton({ label, isLoading }: FormSubmitButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileTap={{ scale: isLoading ? 1 : 0.97 }}
      className="group relative mt-1 w-full overflow-hidden rounded-full bg-brand-naranja font-body text-[0.98rem] font-semibold text-brand-azul transition-opacity disabled:opacity-70 min-h-[46px] px-6 py-3 tracking-[-0.03em] inline-flex items-center justify-center"
    >
      {/* Fill azul que sube en hover */}
      <motion.span
        initial={false}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={hovered ? fadeIn : fadeOut}
        className="absolute inset-0 z-0 rounded-full bg-brand-azul"
      />
      <motion.span
        initial={false}
        animate={hovered ? { width: '108%', height: 152, bottom: -54 } : { width: 8, height: 8, bottom: -8 }}
        transition={fillTransition}
        className="absolute bottom-[-8px] left-1/2 z-0 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-azul"
      />

      {/* Contenido — mismo patrón que Button atom slide */}
      <span className="relative z-10 flex items-center justify-center overflow-hidden">
        {/* Spacer invisible: reserva el ancho del label + flecha */}
        <span className="pointer-events-none invisible inline-flex items-center px-1" aria-hidden="true">
          <span className="whitespace-nowrap">{label}</span>
          {!isLoading && <span className="ml-5 h-[23px] w-7 shrink-0" />}
        </span>

        {/* Texto: se desliza hacia la izquierda cuando aparece la flecha */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap px-1 text-white"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent"
              />
              Enviando formulario…
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 10, x: 0 }}
              animate={{ opacity: 1, y: 0, x: hovered ? -18 : 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={elemTransition}
              className={`pointer-events-none absolute inset-0 flex items-center justify-center whitespace-nowrap px-1 transition-colors duration-200 ${hovered ? 'text-white' : 'text-brand-azul'}`}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Flecha — entra desde la derecha, no ocupa espacio del texto */}
        {!isLoading && (
          <motion.span
            initial={false}
            animate={hovered ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 18, scale: 0.92 }}
            transition={elemTransition}
            className="pointer-events-none absolute inset-y-0 right-3 my-auto flex h-[23px] w-6 items-center justify-center text-white"
            aria-hidden="true"
          >
            <Icon
              name="ArrowRightIcon"
              size="sm"
              className="flex h-[23px] w-6 shrink-0 items-center justify-center [&_path]:[stroke-width:2.85] [&_svg]:block [&_svg]:h-[23px] [&_svg]:w-6"
            />
          </motion.span>
        )}
      </span>
    </motion.button>
  )
}

/* ─── Componente principal ───────────────────────────────────────────────── */
export function LandingPageForm({
  landingSlug,
  landingTitulo,
  formTitulo = 'Reserva tu lugar',
  formCtaTexto = 'Reservar mi lugar',
  urgencia,
}: LandingPageFormProps) {
  const uid = useId()
  const pathname = usePathname()
  const [state, setState] = useState<FormState>('idle')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')
    setState('loading')

    try {
      const res = await fetch('/api/landing-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, telefono, email, landingSlug, landingTitulo, landingUrl: pathname }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error ?? 'Error al enviar')
      }

      setState('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Ocurrió un error. Intenta de nuevo.')
      setState('error')
    }
  }

  const isSubmitting = state === 'loading'
  const isSuccess    = state === 'success'

  return (
    <div className="flex flex-col items-center">

      {/* ── Pill título montado 50% sobre el card ── */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-[-1.35rem] inline-flex rounded-full bg-[#9accea] px-5 py-2 font-heading text-[1rem] font-bold text-brand-azul"
      >
        {formTitulo}
      </motion.span>

      {/* ── Card del formulario ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="w-full rounded-[2rem] bg-white px-5 pb-5 pt-8 md:px-6 md:pb-6 md:pt-9"
      >
        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* ── Estado éxito ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3 py-6 text-center"
            >
              <motion.span
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                className="text-5xl"
              >
                ✓
              </motion.span>
              <p className="font-heading text-[1.2rem] font-bold text-brand-azul">¡Formulario enviado!</p>
              <p className="font-body text-[0.9rem] text-brand-texto/70">
                Nos pondremos en contacto contigo pronto.
              </p>
              <button
                type="button"
                onClick={() => {
                  setState('idle')
                  setNombre('')
                  setTelefono('')
                  setEmail('')
                  setErrorMsg('')
                }}
                className="mt-2 font-body text-[0.85rem] text-brand-celeste underline underline-offset-2 hover:text-brand-azul transition-colors"
              >
                Enviar de nuevo
              </button>
            </motion.div>
          ) : (
            /* ── Formulario ── */
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3"
            >
              <AnimatedField
                id={`${uid}-nombre`}
                type="text"
                autoComplete="name"
                value={nombre}
                onChange={setNombre}
                placeholder="Nombres completos"
              />
              <AnimatedField
                id={`${uid}-telefono`}
                type="tel"
                autoComplete="tel"
                value={telefono}
                onChange={setTelefono}
                placeholder="Teléfono"
              />
              <AnimatedField
                id={`${uid}-email`}
                type="email"
                autoComplete="email"
                value={email}
                onChange={setEmail}
                placeholder="Email"
              />

              <AnimatePresence>
                {state === 'error' && errorMsg && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden rounded-2xl bg-red-50 px-4 py-2.5 font-body text-[0.875rem] text-red-600"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              <FormSubmitButton label={formCtaTexto} isLoading={isSubmitting} />
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Urgencia — oculta cuando se envía el formulario */}
      {urgencia && state !== 'success' && (
        <motion.p
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center font-body text-[0.88rem] font-semibold text-brand-azul"
        >
          <span className="inline-flex items-center gap-1">
            <span aria-hidden="true">⚡</span>
            {urgencia}
          </span>
        </motion.p>
      )}
    </div>
  )
}
