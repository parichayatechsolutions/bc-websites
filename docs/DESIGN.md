# Design system

The rules every boutique site follows. One codebase serves hundreds of boutiques, so a shortcut taken once shows up hundreds of times. When a rule here and a request conflict, raise it rather than quietly breaking the rule. If the rule is wrong, change it here first, with a line in the [decision log](#decision-log).

## Who this is for

- **Visitors** are the boutique's customers: mostly women planning a wedding, festival or occasion, mostly on phones, often on mid-range Android and patchy mobile data, and used to reaching a shop on WhatsApp. They want to see the work, trust the tailor, and get in touch.
- **Buyers** are boutique owners seeing a demo of their own site. It has to feel made for them (their name, colours, work and words) and look expensive.

Every design decision should serve one of those two moments. Decoration that serves neither gets cut.

## Non-negotiables

1. **Boutiques look different; the parts are shared.** Each boutique's `Site.tsx` composes its own page from the component library, so boutiques in the same city don't look alike. But `Site.tsx` only arranges: no markup, styling or `if (slug === …)`. A new look is built once as a library component that every boutique can use, and meets every rule here.
2. **Every component survives bad data.** Missing data hides the component or the element, never showing "undefined" or leaving an empty box. Long names (40+ characters), long lists, pale or dark brand colours and zero photos all have to work. Check a new component by temporarily giving `sample-boutique` a long name, a pale colour and no photos.
3. **Phone first.** Design at 390px wide, then widen. No sideways scrolling. Tap targets at least 44px. Nothing depends on hover to be understood.
4. **Contact is never more than a thumb away.** WhatsApp is the primary action everywhere. Calls and directions come second. Every action is a real link (`wa.me`, `tel:`, Maps).
5. **Readable whatever the brand colours.** Brand colour used for text or icons goes through the contrast-safe roles below, never raw.
6. **Complete without animation.** The page's resting markup is the reduced-motion layout. Animation is added on top, never required to reveal content.
7. **Fast.** Photos are lazy-loaded except the hero, and there is no animation library beyond GSAP + Lenis.

## Colour roles

`src/theme/theme.ts` builds the palette from the boutique's `primary` and `accent` (plus optional `dark` and `light`). The safe roles are nudged darker or lighter until they pass WCAG contrast, and strong colours are left exactly as the boutique chose them.

| Class | Use for | Guarantee |
|---|---|---|
| `bg-light` / `text-ink` | Page background / body text | Main reading pair |
| `text-muted` | Secondary text on light | 4.5:1 on light |
| `text-primary-ink` | Brand-coloured headings, names, icons on light | 4.5:1 on light |
| `bg-primary-ink text-on-primary-ink` | Filled primary button on light | Readable label |
| `bg-primary text-on-primary` | Large brand-colour blocks (collection, footer) | Readable text on it |
| `bg-dark text-light` | Dark sections (hero, reviews) | Main dark pair |
| `text-accent-on-dark` | Accent text, stars and numbers on dark | 4.5:1 on dark |
| `bg-accent text-on-accent` | Accent button (hero CTA) | Readable label |
| `text-thread` | The running stitch, step numbers on light | 3:1 on light |

**Never** use `text-primary` or `text-accent` for text: they are raw brand colours with no contrast guarantee. Never hard-code a colour in a section. Neutrals come from mixes of the brand colours, so there are no greys from outside the palette.

## Typography

Each boutique's `Site.tsx` picks a font pair from `src/theme/fonts.ts`: a display face and a body face. The first is Rozha One + Mukta, both from Indian foundries and both supporting Devanagari. New pairs are added there with a reason, never named inside a `Site.tsx`. Sizes come only from the scale in `src/index.css`:

| Class | Role |
|---|---|
| `t-hero` | Boutique name, Google rating. Once or twice per page. |
| `t-1` | Section headings |
| `t-2` | Sub-headings, prices, stat numbers |
| `t-3` | Group titles, quotes, names |
| `t-lead` | The owner's story, large intro text |
| `t-small` | Captions, fine print |

- For text whose length depends on the boutique (the name in the hero and footer), use `fitDisplay()` from `theme.ts`. It scales the size to the length.
- The display face is for headings, names, numbers and quotes only. Everything else uses the body face.
- Sentence case everywhere. No all-caps labels, no letter-spaced eyebrow text above headings, and no single highlighted word inside a heading.
- Keep lines under about 70 characters (`max-w-[44ch]` for body, `max-w-[34ch]` for lead text).

## Layout

- `.wrap` is the content column. Its extra left padding is the lane the running stitch sews down, so don't put content in it.
- `.section` sets the vertical rhythm between sections. Don't add ad-hoc top or bottom padding.
- `.band` is for a slim strip between sections (a row of facts under the hero) that shouldn't take a whole section's rhythm. Same rule: no ad-hoc padding on top of it.
- **Shapes:** the temple arch (`.arch`) for photos, pills for buttons, circles for icon buttons. `rounded-2xl` only for small data blocks (the price table). No other radii, no drop shadows on cards, no gradient washes.
- Numbered markers only for real sequences (the making process). Lists that aren't ordered don't get numbers.
- Photos keep their frame's aspect ratio (`aspect-*` or fixed height), so the layout never jumps while images load.

## Motion

### Budget

Each boutique page gets **one signature motion idea** plus the supporting moves below. For `sample-boutique` it's the thread: the arch opening in the hero, and the running stitch sewing down the page. When composing a `Site.tsx`, don't stack several signature components (say, two pinned heroes, or the stitch plus another page-long effect). Pick one and keep the rest quiet.

Scroll-driven motion has to *mean* something: reveal the work, show progress, or tie the page together. Motion that's only there to show off is cut.

### Timing

All GSAP values come from `src/motion/tokens.ts` (`EASE`, `DURATION`, `STAGGER`, `SCRUB`, `TRIGGER`). CSS transitions use `ease-stitch` with `duration-200` (colour), `duration-300` (small movement) or `duration-700` (photos). A new animation that needs a value not in the tokens is probably the wrong animation.

### Rules

- Import GSAP only from `src/motion/gsap.ts`, never from `'gsap'` directly.
- Wrap every GSAP animation in `gsap.matchMedia()` with `MEDIA.motion`, and return `mm.revert()` from `useGSAP`.
- Build in `useGSAP` with a `scope`. Never animate from `useEffect`. `useMotion(root, build)` does all three of these for you.
- Supporting moves (wipe, settle, draw, count up, sway, stars, drift, letters rise or blur in) come from `src/motion/moves.ts`, not written again inside a section.
- At most two pinned sections per page (heritage: the hero and the collection).
- Arrivals last 1.1s at most. Nothing loops except video.

### Hover

Hover only on things you can click, plus photos. On touch screens, Tailwind's `hover:` doesn't fire, so nothing may depend on it.

| Element | Hover | Press |
|---|---|---|
| Button (`<Button>`) | Colour shift; icon tips (`-rotate-8 scale-110`) | `scale-[0.97]` |
| Main WhatsApp CTA | Also `<Magnetic>`, **one per screen at most** | Same |
| Icon button (footer) | Lifts `-translate-y-1`, fills | Settles back |
| Text link | `.link-stitch`: dashed underline sews in | none |
| Photo | Breathes: `scale-[1.04]`, `duration-700` | none |
| Anything else | Nothing | none |

Every hover state must also appear on `:focus-visible` for keyboard users. Buttons and links get this from the global focus ring.

### Forbidden

These make a site feel cheap, templated or tiring. Don't add them, even when asked, without raising it first:

- Fade-and-slide-up on every section or every card
- Parallax on text; bounce, elastic or spring overshoot
- Auto-advancing carousels or sliders
- Custom cursors or cursor-follower blobs
- Scroll-jacking beyond the pinned sections, and scroll snapping on the page
- Loading screens and intro animations that delay the content
- Particle, confetti or 3D effects

## Copy

Components carry a little built-in copy (headings, process steps, button labels). It's written for the customer, in plain words:

- Buttons say what happens: "Book a fitting", "Chat on WhatsApp", "Get directions", "Call +91…". Never "Submit", "Click here" or "Learn more".
- Sentence case, no exclamation marks, no filler like "Welcome to our website".
- The boutique's own words (story, reviews, highlight) are used as they wrote them, apart from fixing spelling.

## Building blocks

Use these; don't recreate them inside a section.

| Piece | File | Purpose |
|---|---|---|
| `Button` | `components/Button.tsx` | Every action link. Variants: `accent`, `primary`, `outline-light`, `outline-dark`. Takes a Tabler `icon`. |
| `Media` | `components/Media.tsx` | Any boutique photo or clip by file name; shows a labelled placeholder when missing. |
| `Logo` | `components/Logo.tsx` | Logo, or an initials monogram. |
| `Magnetic` | `motion/Magnetic.tsx` | Cursor pull for the main CTA. |
| `StitchLine` | `motion/StitchLine.tsx` | The running stitch around a run of sections. |
| `SmoothScroll` | `motion/SmoothScroll.tsx` | Lenis, already wrapping every page. |
| `useMotion` | `motion/useMotion.ts` | `useGSAP` + scope + `matchMedia(MEDIA.motion)` + revert, in one call. |
| Moves | `motion/moves.ts` | The shared supporting moves: `rise`, `blurIn`, `countUp`, `settle`, `wipe`, `draw`, `sway`, `starsIn`, `drift`. |
| `fitDisplay` | `theme/theme.ts` | Size for text whose length varies. |
| Icons | `@tabler/icons-react` | The only icon set. `stroke={1.5}` in text, `1.75` in buttons. |

## Adding a component

1. Put it in `src/sections/<job>/<LookName>.tsx`, e.g. `hero/SplitHero.tsx`. Name it by its look, so siblings sit side by side.
2. It reads the boutique only through `useBoutique()`, and takes no props that name a boutique.
3. Decide what it does with missing data: return `null`, or drop the missing parts.
4. Use the colour roles, type scale, `.wrap` and `.section`, the building blocks, and the motion tokens.
5. Add it to `src/sections/index.ts` with a one-line description of its look, and note if it's pinned or a signature motion.
6. Look at it in the lab (`/lab` in `npm run dev`) with `sample-boutique` and a boutique with a long name or pale colours, then use it in a design and run the definition of done below.
7. If it's a version from the design lab, mark it `built` in `docs/COMPONENTS.md`.

A new component must be *actually* different from its siblings (layout, rhythm, motion), not an existing one with different spacing.

New versions come from the design lab in `docs/BoutiqueComponentLab/` (34 sections, 26 versions each). `docs/COMPONENTS.md` lists them all with what each needs and what in it breaks these rules; pick from there rather than inventing a look.

## Composing a boutique's page

`src/sites/<slug>/Site.tsx` starts as a copy of `src/sites/_template/Site.tsx`. To give a boutique its own look, swap components for siblings, reorder, drop what their data can't support (no reviews, no story), and pick a font pair. Keep it to one signature motion and at most two pinned components. Before composing, look at the other boutiques in the same city so their pages don't match.

## Definition of done

A UI change is finished when all of these pass:

- [ ] `npm run check` passes (validation, type check and build)
- [ ] `npm run dev` is running and `npm run shots -- <slugs you changed>` passes with no errors
- [ ] You've **looked at** the screenshots in `.shots/` (desktop, mobile, reduced) and checked:
  - [ ] nothing overlaps, overflows or gets cut off, including long names and pale colours
  - [ ] all text is readable on its background
  - [ ] the reduced-motion view shows all content with nothing stacked on top of anything else
  - [ ] the change follows the motion budget and hover rules above
- [ ] New config fields are added to `src/types/boutique.ts`, the data sheet template, the parser and validator in `scripts/lib/`, and `sample-boutique`

## Decision log

Settled questions. Don't reopen these without a new reason; add new decisions at the bottom.

| Date | Decision | Why |
|---|---|---|
| 2026-09-21 | One codebase, boutiques as data folders | 500 sites must improve together; copies drift |
| 2026-09-21 | Heritage: temple arch, Rozha One + Mukta, running stitch | Taken from the subject (Indian tailoring), not from generic "luxury" defaults |
| 2026-09-21 | The stitch passes behind the collection rail | A thread crossing sliding content collided with text; going under the cloth is also truer to stitching |
| 2026-09-21 | No per-section fade-ups; one orchestrated hero moment | Scattered entrances read as templated and tire the eye |
| 2026-09-21 | Contrast-safe colour roles computed in `theme.ts` | Logo colours (pale pinks, dark greens) broke readability in testing |
| 2026-09-21 | `fitDisplay` for the boutique name | Long names like "Sri Venkateswara Designer Boutique and Bridal Studio" overflowed the hero |
| 2026-09-21 | Hover only on clickable things and photos; `Magnetic` once per screen | Hover on static content implies it can be clicked |
| 2026-09-21 | Tabler icons | Has WhatsApp, Instagram and Facebook brand marks; tree-shakes |
| 2026-09-21 | Footer credit links to parichayatechsolutions.com, keeps the referrer | So visits from boutique sites show up in our analytics |
| 2026-09-21 | `data.md` is the source of truth; `config.ts` is generated | The field team edits one familiar form; hand-edited configs drift from it |
| 2026-09-21 | Missing photos stay in the config as named placeholders | The demo shows what's missing and the validator turns it into the team's shot list |
| 2026-09-21 | Validator errors only for things that break the site or misdirect customers | Too many errors and people learn to ignore them; weaker content is a warning |
| 2026-09-21 | Templates replaced by a component library + one `Site.tsx` per boutique, routed by folder | Boutiques must not look alike; composing per boutique gives more variety than a few fixed templates |
| 2026-09-21 | `Site.tsx` only composes; new looks become library components | Keeps 500 pages from turning into 500 one-off codebases |
| 2026-09-21 | No code outside `src/`: boutique data in `boutiques/<slug>/`, its config and page in `src/sites/<slug>/` | The team's folder holds only what they fill in; all code sits together |
| 2026-09-21 | Stress-test boutique removed | Not wanted in the repo; edge cases are now checked by temporarily editing sample-boutique |
| 2026-09-24 | Designs split from boutiques: `src/designs/<id>/Design.tsx`, any boutique viewable in any design at `/<slug>/d/<design>` | All 30 boutiques had byte-identical `Site.tsx`; one design fixed now fixes 500 sites, and the owner picks from a wall of cards |
| 2026-09-24 | A second ornament beside the arch and the stitch: the **zari border** (`.zari`), for the lookbook designs | Five templates need five identities; the arch belongs to the ceremonial ones, and a saree's woven border is as Indian as an arch without repeating it |
| 2026-09-24 | `--c-paper`: the page ground carries 4.5% of the brand colour | A pure neutral ground makes photographs of cloth look dead, and a properly coloured one competes with them; this also keeps every boutique's ground subtly its own |
| 2026-09-24 | Photo categories come from the file name (`work-bridal-01.jpg`), never from the service groups | Every boutique's ticked groups come out identical (Women, Kids, Handwork, Services), so grouping by them would give 500 identical grids |
| 2026-09-24 | Generated photos are named `ai-*` and stand in for the real file of the same name; a **sold** boutique with any left is a validator error | Demos can't wait for photographs, but a paying boutique must never show customers work it didn't make |
| 2026-09-24 | No generated photograph of a person, ever | A generated "owner" is a picture of someone who doesn't exist presented as a real, named woman |
| 2026-10-04 | The design lab (`docs/BoutiqueComponentLab/`) is the menu for new components; versions are ported into `src/sections/` and planned in `docs/COMPONENTS.md` | 866 versions can't all be built or kept working; each one ported has to meet this document, so it's chosen, not copied wholesale |
| 2026-10-04 | GSAP stays the only animation library; Framer Motion (suggested in the lab's README) rejected | Everything `alive.js` does is possible in GSAP; a second library adds weight to every phone page and a second reduced-motion path |
| 2026-10-04 | The lab's allowed motions become shared moves in `src/motion/moves.ts`; its fade-ups, loops, curtain intro, grain, shimmer, background glows, heading drift and photo tilt are dropped | One implementation per move keeps every section's timing alike; the dropped ones are already forbidden above |
| 2026-10-04 | A dev-only component lab at `/lab` draws any library component for any boutique at phone and desktop width | Components are built and checked on their own, with bad data, before any design depends on them |
| 2026-10-04 | Trust, promise and proof components say only what the boutique's data says; no built-in claims, and they hide when the data is too thin | The lab filled gaps with "trial fitting included", "price agreed first" and a 4.9 rating; on a real site those are promises nobody made, to the boutique's own customers |
| 2026-10-04 | Pills only for things you can tap; a row of facts is plain icon-and-text | Pills are the button shape, so pill-shaped facts look tappable and aren't |
| 2026-10-04 | Sticky WhatsApp controls are placed once in a design, beside `SiteShell`, rather than in a page | They belong on every page; putting them in each page's list invites one page without |
| 2026-10-04 | Offers carry a last day and disappear the day after it, by the visitor's date; a coupon layout needs a real code | A stale offer, or "show this at the counter" for an offer the counter doesn't know, is a promise the shop won't keep |
| 2026-10-04 | Nothing is ever said in the owner's name that they didn't write; no "most chosen" or other invented emphasis | A made-up quote under a real person's name misrepresents them to their own customers |
| 2026-10-04 | FAQ answers come from their own list first, then from their data (delivery, prices with permission, payment, branches); no stock answers | Every boutique gets a useful FAQ without writing one, and none of it can be wrong about them |
| 2026-10-04 | Stars go only with the overall Google rating, never on a single review; nothing is labelled "verified" | The config holds what each customer wrote, not what they rated; five stars on every quote would be invented |
| 2026-10-04 | A story is shown in quotation marks or as a signed letter only when it's written as "I" or "we" | The team often writes the story about the owner; quoting it would put words in their mouth |
| 2026-10-04 | Delivery timelines anchor only day 1 and the usual delivery day; the steps between aren't given dates | `pricing.deliveryDays` is one number; dating each step would invent a schedule the shop doesn't keep |
| 2026-10-04 | Four more designs from the expanded library: Pallu, Mosaic, Gazette, Trousseau, with four new font pairs (Laila + Poppins, Yeseva One + Work Sans, Gloock + Figtree, Bodoni Moda + Inter Tight) | Owners see more genuinely different looks on their card wall, including one that needs no photos (Gazette) and one made for bridal boutiques (Trousseau) |
| 2026-10-04 | The default design rotation (`designFor`) is frozen to the first five designs; new designs are on every card wall and assigned by hand | The default is a hash over the rotation list, so adding to it would move nearly every unassigned boutique to a different design overnight |
| 2026-10-04 | Built-in guidance (what a neckline suits, what aari work is, how to measure) is allowed when it's true of the garment or craft itself; never as shop policy, timings or promises | It helps the customer and can't be wrong about the boutique; "ready in 3 days" or "order 8 weeks before" would be |
| 2026-10-04 | Photo-name sections (looks, drapes, groom looks, handwork and matching pairs) are found from the photos folder and from files named in the data sheet's photo notes | The team can plan a shot by writing its note; it shows as a labelled placeholder until it's taken, as every other missing photo does |
| 2026-10-04 | A team member appears with a photo only if they said yes, and a generated stand-in for any person (team or owner) is a validator error | Same reason as the owner rule: a generated face presented as a named, real person misrepresents them |
| 2026-10-04 | Wedding planner versions with no dated tasks (counting outfits, palettes, what guests wear, a save-the-date) are built; versions that schedule tasks wait for the shop's own lead times | Only the dates were the problem; the rest is guidance true of weddings, offered as questions to the boutique |
| 2026-10-04 | The dated wedding planner works only from the shop's own lead times (data sheet 6i: each piece and how many weeks before the wedding to order it), and hides without them | A date on the site is a promise in the shop's name; it can only come from numbers the owner gave |
