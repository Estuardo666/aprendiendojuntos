'use client';

import { Text } from '@/components/atoms/Text';
import { cn } from '@/lib/utils/cn';
import type { FormFieldProps } from './FormField.types';

// Clases base del input/textarea
const baseInputClasses =
  'w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-brand-azul text-sm ' +
  'bg-brand-blanco placeholder:text-gray-300 outline-none ' +
  'focus:border-brand-celeste focus:ring-2 focus:ring-brand-celeste/20 ' +
  'transition-all duration-200';

// Clases adicionales cuando hay error de validación
const errorInputClasses =
  'border-red-400 focus:border-red-400 focus:ring-red-400/20';

export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  rows = 4,
}: FormFieldProps) {
  const inputClasses = cn(baseInputClasses, error && errorInputClasses);

  return (
    <div className="flex flex-col gap-1.5">
      {/* Etiqueta con asterisco para campos requeridos */}
      <label htmlFor={id} className="text-sm font-semibold font-heading text-brand-azul">
        {label}
        {required && <span className="text-brand-naranja ml-1">*</span>}
      </label>

      {/* Textarea o input según el tipo */}
      {type === 'textarea' ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={inputClasses}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={inputClasses}
        />
      )}

      {/* Mensaje de error accesible */}
      {error && (
        <Text id={`${id}-error`} variant="caption" className="text-red-500" role="alert">
          {error}
        </Text>
      )}
    </div>
  );
}
