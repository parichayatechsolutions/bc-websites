// src/sections/instagram/PhoneInstagram.tsx
// Their Instagram as it looks on a phone: a phone outline holding their
// profile (logo, handle, name) and a grid of their work, beside a short
// invitation to follow. (Lab: ig B, "Phone profile".)
//
// Drawn, not a screenshot, and shows nothing Instagram would (no follower
// counts or likes). Needs `social.instagram`; hides without it. No motion.

import { useBoutique } from '../../app/BoutiqueContext'
import Logo from '../../components/Logo'
import Media from '../../components/Media'
import { FollowButton, useInstagram } from './igShared'

export default function PhoneInstagram() {
  const { boutique } = useBoutique()
  const instagram = useInstagram()
  if (!instagram) return null
  const posts = boutique.media.work.slice(0, 9)

  return (
    <section className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Follow our work</h2>
          <p className="t-lead mt-5 max-w-[30ch] text-muted">See more of our work on Instagram.</p>
          <p className="mt-6 break-words">{instagram.handle}</p>
          <div className="mt-8">
            <FollowButton href={instagram.href} />
          </div>
        </div>
        <div className="md:col-span-6">
          <a
            href={instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${instagram.handle} on Instagram`}
            className="mx-auto block w-full max-w-[18rem] rounded-[2.5rem] border-[10px] border-ink bg-light p-3 transition-transform duration-300 ease-stitch hover:-translate-y-1"
          >
            <span aria-hidden="true" className="mx-auto block h-1.5 w-16 rounded-full bg-ink/20" />
            <span className="mt-4 flex items-center gap-3 px-1">
              <Logo className="h-12 w-12 shrink-0 rounded-full" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{instagram.handle}</span>
                <span className="block truncate text-xs text-muted">{boutique.brand.name}</span>
              </span>
            </span>
            {posts.length > 0 && (
              <span className="mt-4 grid grid-cols-3 gap-0.5">
                {posts.map((f) => (
                  <span key={f} className="block aspect-square overflow-hidden bg-paper">
                    <Media file={f} alt="" />
                  </span>
                ))}
              </span>
            )}
          </a>
        </div>
      </div>
    </section>
  )
}
