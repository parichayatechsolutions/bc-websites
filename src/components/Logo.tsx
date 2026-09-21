// src/components/Logo.tsx
// The boutique's logo, or a monogram of its initials until the logo arrives.

import { useBoutique } from '../app/BoutiqueContext'

export default function Logo({ className = 'h-11 w-11' }: { className?: string }) {
  const { boutique, photo } = useBoutique()
  const src = photo(boutique.brand.logo)

  if (src) return <img src={src} alt={boutique.brand.name} className={`object-contain ${className}`} />

  const initials = boutique.brand.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-accent font-display text-lg text-on-accent ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
