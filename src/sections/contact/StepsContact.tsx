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
import { draw, rise } from '../../motion/moves'
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
    rise('[data-step-card]', { trigger: root.current })
  })

  return (
    <section
      ref={root}
      id="contact"
      className="relative pt-8 pb-12 md:pt-10 md:pb-14 text-white border-t border-b border-white/15 backdrop-blur-md overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(35, 11, 52, 0.92), rgba(25, 6, 37, 0.96)), url('/botanical-luxe-bg.jpg')",
      }}
    >
      {/* Background clean soft purple glow (no muddy gold) */}
      <div
        className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-[#6B2C85]/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-[#521C69]/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        <h2 className="t-1 text-white">How ordering works</h2>
        <div className="relative mt-14">
          <span
            data-thread
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-7 border-l-2 border-dashed border-white/30 md:right-[16.7%] md:bottom-auto md:left-[16.7%] md:border-t-2 md:border-l-0"
          />
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {STEPS.map(({ title, body, icon: Icon }, i) => (
              <li key={title} data-step-card className="grid grid-cols-[3.5rem_1fr] gap-x-5 md:block md:text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/40 bg-white/10 text-white shadow-lg shadow-black/40 backdrop-blur-md md:mx-auto transition-transform duration-300 hover:scale-110 hover:border-white">
                  <Icon size={24} stroke={1.75} aria-hidden="true" />
                </span>
                <div className="md:mt-5">
                  <h3 className="t-3 text-white">
                    <span className="text-white/90 font-serif italic">{i + 1}. </span>
                    {title}
                  </h3>
                  <p className="mt-2 text-white/80 md:mx-auto md:max-w-[28ch]">{body}</p>
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
