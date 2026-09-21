// src/app/BoutiqueContext.tsx
// Gives every section the current boutique, a way to resolve its photos, and
// the base of its links ('/<slug>' in the demo build, '' on its own domain).

import { createContext, useContext } from 'react'
import type { BoutiqueConfig, PhotoFile } from '../types/boutique'
import { photoUrl } from './registry'

interface IBoutiqueContext {
  boutique: BoutiqueConfig
  photo: (file?: PhotoFile) => string | undefined
  base: string
}

const BoutiqueContext = createContext<IBoutiqueContext | null>(null)

export function BoutiqueProvider({
  boutique,
  base,
  children,
}: {
  boutique: BoutiqueConfig
  base: string
  children: React.ReactNode
}) {
  const photo = (file?: PhotoFile) => photoUrl(boutique.slug, file)
  return <BoutiqueContext.Provider value={{ boutique, photo, base }}>{children}</BoutiqueContext.Provider>
}

export function useBoutique(): IBoutiqueContext {
  const value = useContext(BoutiqueContext)
  if (!value) throw new Error('useBoutique must be used inside <BoutiqueProvider>')
  return value
}

/** wa.me link that opens a chat with a first message already typed. */
export function whatsappLink(boutique: BoutiqueConfig, message?: string): string {
  const digits = boutique.contact.whatsapp.replace(/\D/g, '')
  const text = message ?? `Hi ${boutique.brand.name}, I'd like to book a fitting.`
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
