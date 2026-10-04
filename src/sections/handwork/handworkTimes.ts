// src/sections/handwork/handworkTimes.ts
// The handwork rows of their work times (data sheet 6j): the ones naming a
// kind of handwork, longest last. Saree jobs in the same table are left
// to the saree sections.

import { useBoutique } from '../../app/BoutiqueContext'

const HANDWORK = /aari|maggam|zardosi|zardozi|zari|mirror|bead|stone|sequin|embroider|kantha|chikan|cutwork|handwork|hand work/i

export function useHandworkTimes() {
  const { boutique } = useBoutique()
  return (boutique.workTimes ?? []).filter((w) => HANDWORK.test(w.item)).sort((a, b) => a.days - b.days)
}
