// src/sections/visit/mapShared.tsx
// Pieces the map sections share: the live Google map for a branch, and the
// row of buttons that switches between branches when there's more than one.
//
// The map is Google's keyless embed, found by street address rather than
// boutique name, so it lands on the right street even when the shop isn't
// listed on Maps. It loads lazily: it's the heaviest thing on the page, and
// most visitors on a phone never scroll that far.

import { useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import type { Branch } from '../../types/boutique'

export function mapEmbedUrl(branch: Branch): string {
  const place = [branch.address, branch.city, branch.pincode].filter(Boolean).join(', ')
  return `https://maps.google.com/maps?q=${encodeURIComponent(place)}&z=15&output=embed`
}

/** "Opposite City Bus Stand" → "opposite City Bus Stand", to sit mid-sentence. */
export const midSentence = (text: string) => text.charAt(0).toLowerCase() + text.slice(1)

/** The live map, filling its frame. Give the frame a fixed aspect ratio. */
export function MapFrame({ branch }: { branch: Branch }) {
  return (
    <iframe
      key={branch.address}
      title={`Map showing ${branch.name}, ${branch.city}`}
      src={mapEmbedUrl(branch)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-full w-full border-0"
    />
  )
}

/** The branch being shown, and a way to switch. */
export function useBranch() {
  const { boutique } = useBoutique()
  const [index, setIndex] = useState(0)
  const branches = boutique.branches
  return { branches, branch: branches[index] ?? branches[0], index, setIndex }
}

/** A button per branch, named by area. Renders nothing for a single branch. */
export function BranchPicker({ branches, index, onPick }: { branches: Branch[]; index: number; onPick: (index: number) => void }) {
  if (branches.length < 2) return null
  return (
    <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose a branch">
      {branches.map((b, i) => (
        <button
          key={b.name + b.address}
          type="button"
          onClick={() => onPick(i)}
          aria-pressed={i === index}
          className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
        >
          {b.area || b.city}
        </button>
      ))}
    </div>
  )
}
