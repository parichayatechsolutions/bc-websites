// src/sections/classes/TogetherClasses.tsx
// Learn together: one sentence to fill in, "I'd like to join [class] with
// [− 2 +] friends", with the class and the number picked inline, and a
// button that sends it. (Lab: class W, "Learn together".)
//
// It asks rather than promises a group place. Needs `classes`; the class
// picker only with more than one. No motion.

import { useId, useState } from 'react'
import { IconBrandWhatsapp, IconMinus, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const ROUND =
  'grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-ink/25 align-middle transition-[background-color,color] duration-200 ease-stitch hover:bg-ink hover:text-light disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink'

export default function TogetherClasses() {
  const { boutique } = useBoutique()
  const id = useId()
  const classes = boutique.classes ?? []
  const [index, setIndex] = useState(0)
  const [friends, setFriends] = useState(1)
  if (!classes.length) return null
  const course = classes[index] ?? classes[0]

  return (
    <section id="classes" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Learn together</h2>
        <p className="t-2 mt-8 leading-[1.6]">
          I’d like to join{' '}
          {classes.length > 1 ? (
            <>
              <label htmlFor={id} className="sr-only">
                Class
              </label>
              <select
                id={id}
                value={index}
                onChange={(e) => setIndex(Number(e.target.value))}
                className="max-w-full cursor-pointer border-b-2 border-primary-ink bg-transparent text-primary-ink focus:outline-none"
              >
                {classes.map((c, i) => (
                  <option key={c.name} value={i}>
                    {c.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <span className="text-primary-ink">{course.name}</span>
          )}{' '}
          with{' '}
          <span className="inline-flex items-center gap-3 align-middle">
            <button type="button" onClick={() => setFriends(friends - 1)} disabled={friends <= 1} aria-label="One fewer friend" className={ROUND}>
              <IconMinus size={20} stroke={1.75} aria-hidden="true" />
            </button>
            <span className="tabular-nums text-primary-ink" aria-live="polite">
              {friends}
            </span>
            <button type="button" onClick={() => setFriends(Math.min(friends + 1, 10))} disabled={friends >= 10} aria-label="One more friend" className={ROUND}>
              <IconPlus size={20} stroke={1.75} aria-hidden="true" />
            </button>
          </span>{' '}
          {friends === 1 ? 'friend' : 'friends'}.
        </p>
        <div className="mt-10">
          <Button
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to join the ${course.name} class with ${friends} ${friends === 1 ? 'friend' : 'friends'}. Do you have room for us?`)}
            variant="primary"
            icon={IconBrandWhatsapp}
          >
            Ask for {friends + 1} places
          </Button>
        </div>
      </div>
    </section>
  )
}
