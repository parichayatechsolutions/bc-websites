// src/sections/handwork/SpoolsHandwork.tsx
// A row of thread spools, one for each kind of handwork they do; tapping
// one lifts it from the row and the button asks about that work.
// (Lab: emb G, "Thread spools".)
//
// Only the works in their own services; needs two. The spools lift with a
// CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const HANDWORK = /aari|maggam|zardosi|zardozi|zari|mirror|bead|stone|hand embroidery|machine embroidery|kantha|chikan|cutwork|sequin/i
// Thread colours for the spools, from the brand's own.
const THREADS = ['var(--c-primary)', 'var(--c-accent)', 'var(--c-thread)', 'color-mix(in oklab, var(--c-primary) 55%, var(--c-light))', 'var(--c-dark)']

function Spool({ thread }: { thread: string }) {
  return (
    <svg viewBox="0 0 60 90" aria-hidden="true" className="block h-full w-full">
      <rect x={4} y={2} width={52} height={8} rx={2} style={{ fill: '#b98b5a' }} />
      <rect x={4} y={80} width={52} height={8} rx={2} style={{ fill: '#b98b5a' }} />
      <rect x={10} y={10} width={40} height={70} style={{ fill: thread }} />
      <path d="M 10 22 L 50 26 M 10 38 L 50 42 M 10 54 L 50 58 M 10 70 L 50 74" strokeWidth={1} style={{ stroke: 'rgba(255,255,255,0.25)' }} />
    </svg>
  )
}

export default function SpoolsHandwork() {
  const { boutique } = useBoutique()
  const works = [...new Set(boutique.services.groups.flatMap((g) => g.items).filter((i) => HANDWORK.test(i)))].slice(0, 6)
  const [index, setIndex] = useState(0)
  if (works.length < 2) return null
  const work = works[index] ?? works[0]
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

  return (
    <section id="handwork-spools" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Pick a thread</h2>
        <ul className="mt-12 flex flex-wrap items-end gap-x-4 gap-y-8 border-b-2 border-ink/20 pb-2 md:gap-x-8" role="group" aria-label="Handwork">
          {works.map((w, i) => (
            <li key={w}>
              <button type="button" onClick={() => setIndex(i)} aria-pressed={i === index} className="group flex w-20 cursor-pointer flex-col items-center gap-3 md:w-24">
                <span className="block h-24 w-16 transition-transform duration-300 ease-stitch group-hover:-translate-y-1 group-aria-pressed:-translate-y-4">
                  <Spool thread={THREADS[i % THREADS.length]} />
                </span>
                <span className="t-small text-center text-balance group-aria-pressed:font-semibold group-aria-pressed:text-primary-ink">{w}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6" aria-live="polite">
          <p className="t-2">{work}</p>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like ${lower(work)} on my outfit. Could you tell me more?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about {lower(work)}
          </Button>
        </div>
      </div>
    </section>
  )
}
