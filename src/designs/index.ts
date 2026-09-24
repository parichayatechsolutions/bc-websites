// src/designs/index.ts
// Finds the designs at build time. Each src/designs/<id>/Design.tsx exports
// the page component and the font pair it's drawn with. They load on demand,
// so opening one boutique doesn't download the other designs.

import type { ComponentType } from 'react'
import type { IFontPair } from '../theme/fonts'

export * from './catalog'

export interface IDesignModule {
  default: ComponentType
  fonts: IFontPair
}

const modules = import.meta.glob<IDesignModule>('/src/designs/*/Design.tsx')

export async function loadDesign(id: string): Promise<IDesignModule | null> {
  const load = modules[`/src/designs/${id}/Design.tsx`]
  return load ? await load() : null
}
