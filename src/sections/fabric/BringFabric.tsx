// src/sections/fabric/BringFabric.tsx
// Bring your own fabric: a dashed card inviting a photo of her fabric on
// WhatsApp, with what to include, beside quick links to ask about the
// fabrics they stock. (Lab: fabric W, "Bring your own".)
//
// Works for any boutique that stitches; the quick links appear only when
// `fabrics` lists some. No motion.

import { IconArrowRight, IconBrandWhatsapp, IconPhoto } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const INCLUDE = ['A photo in daylight, so the colour is true', 'How many metres you have', 'What you’d like made from it']

export default function BringFabric() {
  const { boutique } = useBoutique()
  const fabrics = boutique.fabrics ?? []

  return (
    <section id="bring-fabric" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="rounded-2xl border-2 border-dashed border-ink/25 p-7 md:col-span-7 md:p-10">
          <IconPhoto size={32} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
          <h2 className="t-2 mt-5 max-w-[16ch] text-balance">Have your own fabric?</h2>
          <p className="mt-4 text-muted">Send us a photo on WhatsApp and tell us what you’d like. Include:</p>
          <ul className="mt-4 space-y-2">
            {INCLUDE.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-thread" />
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have my own fabric. Here's a photo.`)} variant="primary" icon={IconBrandWhatsapp}>
              Send a photo of your fabric
            </Button>
          </div>
        </div>

        {fabrics.length > 0 && (
          <div className="md:col-span-5">
            <h3 className="t-3">Or choose one of ours</h3>
            <ul className="mt-5 border-t border-ink/15">
              {fabrics.map((f) => (
                <li key={f.name} className="border-b border-ink/15">
                  <a
                    href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your ${f.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-14 items-center justify-between gap-4 py-3"
                  >
                    <span>
                      <span className="block">{f.name}</span>
                      {f.bestFor && <span className="t-small text-muted">{f.bestFor}</span>}
                    </span>
                    <IconArrowRight size={18} stroke={1.75} aria-hidden="true" className="shrink-0 text-primary-ink transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
