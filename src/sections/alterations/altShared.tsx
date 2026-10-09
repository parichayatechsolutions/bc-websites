// src/sections/alterations/altShared.tsx
// What the before/after sections share: the pairs, their captions, the
// drag-to-compare photo, and the WhatsApp way out.
//
// The comparison is two photos stacked, the "after" clipped from the left
// by a CSS variable. A native range input lies invisibly over the photo, so
// it drags with a finger or a mouse, moves with the arrow keys, and is read
// out by screen readers, with no script of its own beyond setting the
// variable. `touch-action: pan-y` lets a vertical swipe still scroll the page.

import { useRef, type CSSProperties } from 'react'
import { IconArrowsHorizontal, IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { DURATION, EASE, gsap, TRIGGER } from '../../motion/gsap'
import type { AlterationPair } from '../../types/boutique'

export function useAlterations() {
  const { boutique } = useBoutique()
  const pairs = boutique.media.alterations ?? []
  const captions = boutique.media.captions ?? {}
  return { pairs, caption: (p: AlterationPair) => captions[p.after] ?? captions[p.before] }
}

/** "Before" or "After" in the photo's top corner. */
export function Label({ children, side }: { children: string; side: 'left' | 'right' }) {
  return <span className={`t-small absolute top-3 bg-dark/75 px-2.5 py-1 text-light ${side === 'left' ? 'left-3' : 'right-3'}`}>{children}</span>
}

/** Drag across to compare. Give it a `key` per pair, so a new pair starts in the middle. */
export function Compare({ pair, caption, className = '' }: { pair: AlterationPair; caption?: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null)
  const what = caption ?? 'The garment'

  return (
    <div
      ref={box}
      data-compare
      style={{ '--x': '50%' } as CSSProperties}
      className={`relative w-full overflow-hidden bg-paper select-none has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-accent ${className}`}
    >
      <div className="absolute inset-0">
        <Media file={pair.before} alt={`${what}, before`} />
      </div>
      <div className="absolute inset-0" style={{ clipPath: 'inset(0 0 0 var(--x))' }}>
        <Media file={pair.after} alt={`${what}, after`} />
      </div>
      <Label side="left">Before</Label>
      <Label side="right">After</Label>
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-light" style={{ left: 'var(--x)' }}>
        <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-light text-ink">
          <IconArrowsHorizontal size={20} stroke={1.75} />
        </span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        aria-label="Compare before and after"
        onInput={(e) => box.current?.style.setProperty('--x', `${e.currentTarget.value}%`)}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        style={{ touchAction: 'pan-y' }}
      />
    </div>
  )
}

/**
 * The divider sweeps across and back once as the photo comes into view, to
 * show it can be dragged. Call inside useMotion. (Lab motion: "Slider sweep".)
 */
export function sweep(trigger: gsap.DOMTarget) {
  // fromTo, not to: GSAP can't read a custom property's starting value, so
  // it would sweep from 0 and come to rest at the far edge.
  return gsap.fromTo('[data-compare]', { '--x': '50%' }, {
    '--x': '64%',
    duration: DURATION.base,
    ease: EASE.morph,
    yoyo: true,
    repeat: 1,
    scrollTrigger: { trigger, start: TRIGGER.arrive, once: true },
  })
}

export function AskAboutAlterations() {
  const { boutique } = useBoutique()
  return (
    <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-between gap-6">
      <div>
        <p className="t-3">Something that doesn’t fit?</p>
        <p className="mt-1 text-muted">Send us a photo of it on WhatsApp.</p>
      </div>
      <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering.`)} variant="primary" icon={IconBrandWhatsapp}>
        Send a photo on WhatsApp
      </Button>
    </div>
  )
}
