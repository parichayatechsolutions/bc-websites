// src/sections/process/steps.ts
// How a garment gets made, from first conversation to final fitting: the
// built-in copy every process section tells, so the steps read the same
// whichever layout a design picks.

import { IconHanger, IconMessageCircle, IconNeedleThread, IconRulerMeasure, IconScissors, type Icon } from '@tabler/icons-react'

export interface IStep {
  title: string
  /** One line, for layouts with little room. */
  short: string
  body: string
  icon: Icon
}

export const STEPS: IStep[] = [
  {
    title: 'Consultation',
    short: 'Bring your fabric, a photo or an idea.',
    body: 'Bring your fabric, a photo you love, or just an idea. We sketch the design with you and suggest what will suit the occasion.',
    icon: IconMessageCircle,
  },
  {
    title: 'Measurements',
    short: 'Taken by hand, kept under your name.',
    body: 'Every measurement is taken by hand and kept under your name, so your next order starts from a perfect fit.',
    icon: IconRulerMeasure,
  },
  {
    title: 'Cutting',
    short: 'Drafted to your measurements.',
    body: 'Your pattern is drafted to your own measurements, not a standard size, and cut by the master tailor.',
    icon: IconScissors,
  },
  {
    title: 'Stitching and handwork',
    short: 'Stitched, then embroidered by hand.',
    body: 'The garment is stitched, then embroidered by hand wherever the design calls for it.',
    icon: IconNeedleThread,
  },
  {
    title: 'Trial and finishing',
    short: 'You try it on; we adjust until it sits right.',
    body: 'You try it on. We adjust until it sits exactly right, then press it and pack it for you.',
    icon: IconHanger,
  },
]
