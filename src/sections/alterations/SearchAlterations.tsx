// src/sections/alterations/SearchAlterations.tsx
// Type "sleeve", "hook" or "length" and their alteration rates narrow to
// match; when nothing does, the button asks about exactly what she typed.
// (Lab: alter J, "Search".)
//
// Rates from `alterationPrices`, only with permission to show prices;
// hides otherwise. No motion.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconSearch } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

export default function SearchAlterations() {
  const { boutique } = useBoutique()
  const id = useId()
  const [query, setQuery] = useState('')
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  if (!rates.length) return null

  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const found = words.length ? rates.filter((r) => words.every((w) => r.item.toLowerCase().includes(w))) : rates

  return (
    <section id="alteration-search" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[12ch] text-balance">What needs fixing?</h2>
        <label htmlFor={id} className="mt-8 flex min-h-14 items-center gap-3 rounded-full border border-ink/25 bg-light px-5 focus-within:border-primary-ink">
          <IconSearch size={22} stroke={1.5} className="shrink-0 text-muted" aria-hidden="true" />
          <span className="sr-only">Search alterations</span>
          <input
            id={id}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try sleeve, hook or length"
            className="min-w-0 flex-1 bg-transparent py-3 outline-none placeholder:text-muted/70"
          />
        </label>
        <p className="t-small mt-3 text-muted" aria-live="polite">
          {words.length ? `${found.length} ${found.length === 1 ? 'match' : 'matches'}` : `${rates.length} alterations`}
        </p>
        {found.length > 0 ? (
          <dl className="mt-6 border-t border-ink/15">
            {found.map(({ item, price }) => (
              <div key={item} className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4">
                <dt>{item}</dt>
                <dd className="t-3 shrink-0 text-primary-ink">{rupees(price)}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="mt-6 border-t border-ink/15 pt-8">
            <p className="text-muted">Not in our list, but we may still be able to fix it.</p>
          </div>
        )}
        <div className="mt-8">
          <Button
            href={whatsappLink(boutique, query.trim() ? `Hi ${boutique.brand.name}, can you fix this: ${query.trim()}?` : `Hi ${boutique.brand.name}, I have something that needs altering.`)}
            variant="primary"
            icon={IconBrandWhatsapp}
          >
            {query.trim() && !found.length ? `Ask about “${query.trim()}”` : 'Send a photo on WhatsApp'}
          </Button>
        </div>
      </div>
    </section>
  )
}
