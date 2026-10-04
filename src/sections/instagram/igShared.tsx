// src/sections/instagram/igShared.tsx
// Pieces the Instagram sections share. There's no live feed: the "posts"
// are the boutique's own work photos, and every one links to their profile.
// So nothing here pretends to be Instagram (no like counts, no captions
// they didn't write); it's their work, with a way to follow more of it.

import { IconBrandInstagram } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import type { PhotoFile } from '../../types/boutique'

/** Handle and profile link from whatever the data sheet holds: a URL, "@name" or "name". */
export function useInstagram() {
  const { boutique } = useBoutique()
  const raw = boutique.social.instagram?.trim()
  if (!raw) return null
  const name = raw.match(/instagram\.com\/([^/?#]+)/i)?.[1] ?? raw.replace(/^@/, '')
  return { handle: `@${name}`, href: /^https?:/.test(raw) ? raw : `https://instagram.com/${name}` }
}

/** Only whole rows of three: 9, 6 or 3 photos, or every photo when there are fewer than three. */
export function fullRows(files: PhotoFile[], max: number): PhotoFile[] {
  const count = Math.min(files.length, max)
  return files.slice(0, count < 3 ? count : count - (count % 3))
}

/** One work photo as a link to their profile. The parent sets its size. */
export function Post({ file, href, className = '' }: { file: PhotoFile; href: string; className?: string }) {
  const { boutique } = useBoutique()
  const caption = boutique.media.captions?.[file]
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${caption ?? 'Our work'}, more on Instagram`}
      data-post
      className={`group block h-full w-full overflow-hidden bg-paper ${className}`}
    >
      <Media file={file} alt={caption ?? ''} className="transition-transform duration-700 ease-stitch group-hover:scale-[1.04]" />
    </a>
  )
}

export function FollowButton({ href }: { href: string }) {
  return (
    <Button href={href} variant="outline-dark" icon={IconBrandInstagram}>
      Follow on Instagram
    </Button>
  )
}
