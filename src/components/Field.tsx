// src/components/Field.tsx
// A labelled form field with its error message. Every form on every boutique
// site uses these, so fields look, read and behave the same everywhere.

import { useId, type ReactNode } from 'react'

const INPUT =
  'w-full min-h-12 rounded-xl border bg-white/70 px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 ease-stitch focus:outline-none focus:ring-2 focus:ring-accent/60'

type IFieldProps = {
  label: string
  /** Shown under the label, e.g. what the field is for. */
  hint?: string
  error?: string
  required?: boolean
  children: (props: { id: string; className: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => ReactNode
}

export default function Field({ label, hint, error, required, children }: IFieldProps) {
  const id = useId()
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
        {!required && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="t-small mt-0.5 text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">
        {children({
          id,
          className: `${INPUT} ${error ? 'border-error' : 'border-ink/20 focus:border-ink/40'}`,
          'aria-invalid': Boolean(error),
          'aria-describedby': describedBy,
        })}
      </div>
      {error && (
        <p id={`${id}-error`} className="t-small mt-1.5 text-error">
          {error}
        </p>
      )}
    </div>
  )
}
