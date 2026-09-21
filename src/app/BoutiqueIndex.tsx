// src/app/BoutiqueIndex.tsx
// Internal list of demos, for the team. Not linked from any boutique site.

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { BoutiqueConfig } from '../types/boutique'
import { boutiqueSlugs, loadBoutique } from './registry'

export default function BoutiqueIndex() {
  const [boutiques, setBoutiques] = useState<BoutiqueConfig[]>([])

  useEffect(() => {
    document.title = 'Boutique demos'
    Promise.all(boutiqueSlugs.map(loadBoutique)).then((list) =>
      setBoutiques(list.filter((b): b is BoutiqueConfig => b !== null)),
    )
  }, [])

  return (
    <main className="min-h-screen bg-white px-5 py-16 font-sans text-neutral-900 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">Boutique demos</h1>
        <p className="mt-2 text-neutral-600">
          {boutiqueSlugs.length} {boutiqueSlugs.length === 1 ? 'boutique' : 'boutiques'} with a config.
          Add one with <code className="rounded bg-neutral-100 px-1.5 py-0.5">npm run new-boutique "Name"</code>.
        </p>

        <ul className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
          {boutiques.map((b) => (
            <li key={b.slug}>
              <Link to={`/${b.slug}`} className="flex items-center gap-4 py-4 hover:bg-neutral-50">
                <span className="flex gap-1" aria-hidden="true">
                  <span className="h-6 w-6 rounded-full" style={{ background: b.brand.colors.primary }} />
                  <span className="h-6 w-6 rounded-full" style={{ background: b.brand.colors.accent }} />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{b.brand.name}</span>
                  <span className="block text-sm text-neutral-500">
                    {b.branches[0]?.city}
                  </span>
                </span>
                <span className="text-sm text-neutral-500">/{b.slug}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
