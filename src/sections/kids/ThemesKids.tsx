// src/sections/kids/ThemesKids.tsx
// Party themes for a child's birthday (princess, garden, traditional,
// royal), each a strip of colours that suit it; picking one sets the
// message to ask for an outfit in that theme. (Lab: kids Y, "Party
// themes", with palettes only: outfit photos per theme aren't in the
// data.)
//
// The palettes are suggestions, set directly since they're the theme's
// colours, not the brand's. Needs a Kids group. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const THEMES = [
  { name: 'Princess', palette: ['#f6c6d6', '#e58fb0', '#fff1e6', '#d9b45a'] },
  { name: 'Garden', palette: ['#b9d7a8', '#f4d35e', '#f7a072', '#ffffff'] },
  { name: 'Traditional', palette: ['#b3202a', '#e8b923', '#2f7d4a', '#6e1423'] },
  { name: 'Royal', palette: ['#2b2d6e', '#5d2e8c', '#d6a838', '#efe3c8'] },
]

export default function ThemesKids() {
  const { boutique } = useBoutique()
  const hasKids = boutique.services.groups.some((g) => /^kid|child/i.test(g.title))
  const [index, setIndex] = useState(0)
  if (!hasKids) return null
  const theme = THEMES[index]

  return (
    <section id="kids-themes" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Dress for the theme</h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4" role="group" aria-label="Party theme">
          {THEMES.map((t, i) => (
            <li key={t.name}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="w-full cursor-pointer rounded-2xl border border-ink/15 p-3 text-left transition-[border-color,background-color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-paper"
              >
                <span aria-hidden="true" className="flex h-16 overflow-hidden rounded-xl">
                  {t.palette.map((c) => (
                    <span key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </span>
                <span className="mt-3 block font-semibold">{t.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a ${theme.name.toLowerCase()}-theme birthday outfit for my child.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a {theme.name.toLowerCase()} outfit
          </Button>
        </div>
      </div>
    </section>
  )
}
