// src/sections/contact/StepsContact.tsx
// How ordering works, in three steps joined by a thread: send a photo or
// an idea on WhatsApp, talk it through, come in to be measured. Then the
// button that starts step one. (Lab: contact K, "How ordering works".)
//
// The steps are how made-to-measure ordering goes anywhere, not promises
// of times or replies. Always shown.
//
// Motion: the thread draws across once. Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconMessageCircle, IconPhoto, IconRulerMeasure } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Magnetic from '../../motion/Magnetic'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const STEPS = [
  { title: 'Send a photo', body: 'A design you love, your fabric, or just the idea, on WhatsApp.', icon: IconPhoto },
  { title: 'Talk it through', body: 'The design, the fabric, the price and when you need it.', icon: IconMessageCircle },
  { title: 'Come in to be measured', body: 'Bring your fabric, and we take it from there.', icon: IconRulerMeasure },
]

export default function StepsContact() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)

  useMotion(root, ({ desktop }) => {
    draw('[data-thread]', { trigger: root.current, from: desktop ? 'start' : 'top' })
  })

  return (
    <section ref={root} id="contact" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">How ordering works</h2>
        <div className="relative mt-14">
          <span
            data-thread
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-7 border-l-2 border-dashed border-thread md:right-[16.7%] md:bottom-auto md:left-[16.7%] md:border-t-2 md:border-l-0"
          />
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {STEPS.map(({ title, body, icon: Icon }, i) => (
              <li key={title} className="grid grid-cols-[3.5rem_1fr] gap-x-5 md:block md:text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-thread bg-light text-primary-ink md:mx-auto">
                  <Icon size={24} stroke={1.5} aria-hidden="true" />
                </span>
                <div className="md:mt-5">
                  <h3 className="t-3">
                    <span className="text-thread">{i + 1}. </span>
                    {title}
                  </h3>
                  <p className="mt-2 text-muted md:mx-auto md:max-w-[28ch]">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-14 md:text-center">
          <Magnetic>
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to order something stitched. Here's a photo:`)} variant="primary" icon={IconBrandWhatsapp}>
              Send a photo on WhatsApp
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
