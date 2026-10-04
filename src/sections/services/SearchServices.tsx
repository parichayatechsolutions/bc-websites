// src/sections/services/SearchServices.tsx
// "Do we make it?" A search box over everything they stitch: type "lehenga"
// or "fall" and the list narrows, each item with a link to ask about it.
// When nothing matches, the button asks about exactly what she typed.
// (Lab: services K, "Do we make it?".)
//
// Their own services; hides without any. No motion.

import { useId, useState } from 'react'
import { IconArrowRight, IconBrandWhatsapp, IconSearch } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

export default function SearchServices() {
  const { boutique } = useBoutique()
  const id = useId()
  const [query, setQuery] = useState('')
  const items = boutique.services.groups.flatMap((g) => g.items.map((item) => ({ item, group: g.title })))
  if (!items.length) return null

  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const found = words.length ? items.filter(({ item, group }) => words.every((w) => `${item} ${group}`.toLowerCase().includes(w))) : items
  const ask = (what: string) => whatsappLink(boutique, `Hi ${boutique.brand.name}, do you make ${what.charAt(0).toLowerCase()}${what.slice(1)}?`)

  return (
    <section id="services" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1">Do we make it?</h2>
        <label htmlFor={id} className="mt-8 flex min-h-14 items-center gap-3 rounded-full border border-ink/25 bg-light px-5 focus-within:border-primary-ink">
          <IconSearch size={22} stroke={1.5} className="shrink-0 text-muted" aria-hidden="true" />
          <span className="sr-only">Search what we stitch</span>
          <input
            id={id}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try lehenga, fall or kids"
            className="min-w-0 flex-1 bg-transparent py-3 outline-none placeholder:text-muted/70"
          />
        </label>
        <p className="t-small mt-3 text-muted" aria-live="polite">
          {words.length ? `${found.length} ${found.length === 1 ? 'match' : 'matches'}` : `${items.length} things we stitch`}
        </p>

        {found.length > 0 ? (
          <ul className="mt-6 border-t border-ink/15">
            {found.map(({ item, group }) => (
              <li key={group + item} className="border-b border-ink/15">
                <a href={ask(item)} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center justify-between gap-4 py-3">
                  <span>
                    {item} <span className="t-small text-muted">· {group}</span>
                  </span>
                  <IconArrowRight size={18} stroke={1.75} aria-hidden="true" className="shrink-0 text-primary-ink transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 border-t border-ink/15 pt-8">
            <p className="text-muted">Not in our list, but we may still make it.</p>
            <div className="mt-5">
              <Button href={ask(query.trim())} variant="primary" icon={IconBrandWhatsapp}>
                Ask about “{query.trim()}”
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
