// src/sections/lookbook/MoodLookbook.tsx
// A mood board: their looks as prints taped to a board at slight angles,
// with swatches of the fabrics they stock pinned among them and names
// written beneath. (Lab: look L, "Mood board".)
//
// Looks from photos look-<occasion>-<nn>.jpg, up to five; swatches from
// `fabrics`, up to three, when they have any. Hides without looks. The
// angles are fixed. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Media from '../../components/Media'

const TURNS = ['-rotate-2', 'rotate-2', 'rotate-1', '-rotate-3', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-2']

export default function MoodLookbook() {
  const { boutique } = useBoutique()
  const looks = byFunction(boutique.media.looks ?? [], 'look').slice(0, 5)
  const swatches = (boutique.fabrics ?? []).slice(0, 3)
  const captions = boutique.media.captions ?? {}
  if (!looks.length) return null

  // Looks and swatches interleaved, a swatch after every second look.
  const pieces = looks.flatMap((f, i) => {
    const swatch = i % 2 === 1 ? swatches[(i - 1) / 2] : undefined
    return [{ kind: 'look' as const, file: f, name: photoTag(f, 'look') ?? '' }, ...(swatch ? [{ kind: 'swatch' as const, file: swatch.photo, name: swatch.name }] : [])]
  })

  return (
    <section id="lookbook" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">The mood board</h2>
        <ul className="mt-12 grid grid-cols-2 items-start gap-x-6 gap-y-10 bg-paper p-6 md:grid-cols-4 md:p-10">
          {pieces.map((p, i) => (
            <li key={p.file + i} className={`relative bg-light p-2 pb-4 ring-1 ring-ink/10 ${TURNS[i % TURNS.length]} ${p.kind === 'swatch' ? 'mx-auto w-3/4' : ''}`}>
              <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-2 bg-accent/35" />
              <div className={`${p.kind === 'swatch' ? 'aspect-square' : 'aspect-[3/4]'} overflow-hidden bg-paper`}>
                <Media file={p.file} alt={p.kind === 'swatch' ? `${p.name} swatch` : (captions[p.file] ?? `${p.name} look`)} />
              </div>
              <p className="mt-3 text-center font-display italic">{p.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
