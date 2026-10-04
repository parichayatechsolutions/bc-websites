// src/sections/saree/RackSaree.tsx
// A saree rack: their drape photos hanging side by side from a rod as
// tall narrow strips, each drape's name running down its side; tapping
// one widens it. (Lab: saree U, "Saree rack".)
//
// From photos drape-<style>.jpg; up to six. Hides without any. The strips
// widen with a CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoTag } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function RackSaree() {
  const { boutique } = useBoutique()
  const drapes = (boutique.media.drapes ?? []).slice(0, 6)
  const captions = boutique.media.captions ?? {}
  const [index, setIndex] = useState(0)
  if (!drapes.length) return null
  const drape = drapes[index] ?? drapes[0]
  const name = photoTag(drape, 'drape') ?? 'This drape'

  return (
    <section id="saree-rack" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Drapes we do</h2>
        <div className="mt-12">
          <span aria-hidden="true" className="block h-1.5 rounded-full bg-thread" />
          <ul className="flex h-[26rem] gap-2 md:h-[32rem]" role="group" aria-label="Drapes">
            {drapes.map((f, i) => {
              const on = i === index
              return (
                <li key={f} className={`min-w-12 transition-[flex-grow] duration-500 ease-stitch ${on ? 'grow-[6]' : 'grow'}`} style={{ flexBasis: 0 }}>
                  <button type="button" onClick={() => setIndex(i)} aria-pressed={on} className="relative flex h-full w-full cursor-pointer">
                    <span className="block flex-1 overflow-hidden bg-paper">
                      <Media file={f} alt={on ? (captions[f] ?? `${photoTag(f, 'drape')} drape`) : ''} />
                    </span>
                    <span className="t-small flex w-8 shrink-0 items-center justify-center bg-light font-semibold [writing-mode:vertical-rl]">
                      {photoTag(f, 'drape')}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6" aria-live="polite">
          <div>
            <p className="t-2">{name}</p>
            {captions[drape] && <p className="mt-1 text-muted">{captions[drape]}</p>}
          </div>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like my saree draped in the ${name.toLowerCase()} style.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for this drape
          </Button>
        </div>
      </div>
    </section>
  )
}
