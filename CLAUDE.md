# bc-websites

Demo and production websites for boutiques (Indian tailoring and ethnic wear), built by Parichaya Tech Solutions. One React + Vite codebase serves every boutique. Each boutique is a folder of data in `boutiques/<slug>/`, and the design, sections and motion are shared. The aim is hundreds of sites that all stay clean, readable and fast.

## Before changing anything visual

Read `docs/DESIGN.md`. It holds the colour roles, type scale, motion budget, hover rules, forbidden effects, the definition of done, and a decision log of settled questions. Follow it even when a request would be quicker to meet by breaking it. If a rule seems wrong, say so, and update the doc (with a decision-log line) before changing code.

## Rules that matter most

- **No code outside `src/`** (apart from build tooling in `scripts/` and root config files). A boutique has two folders:
  - `boutiques/<slug>/`: data only, what the team fills in: `data.md` and `photos/`
  - `src/sites/<slug>/`: code: `config.ts` (generated from data.md) and `Site.tsx` (its page)
  The route `/<slug>` is created automatically from `src/sites/<slug>/`.
- `Site.tsx` only picks components from `src/sections` (via `src/sections/index.ts`), orders them, and picks a font pair from `src/theme/fonts.ts`. No markup, styling or logic of its own. A look the library doesn't have becomes a new component in `src/sections/<type>/`, added to the catalog in `index.ts` with a one-line description, so every boutique can use it.
- Components read the boutique only through `useBoutique()`, never by slug.
- A boutique's `data.md` is its source of truth. Never hand-edit a generated `config.ts` (it starts with "Generated from data.md"); change `data.md` and run `npm run config -- <slug>`.
- A new config field means changing all of these together: `src/types/boutique.ts`, the data sheet template, the parser (`scripts/lib/data-sheet.mjs`), the validator (`scripts/lib/validate.mjs`), and `sample-boutique`.
- Every component must handle missing and extreme data: no photos, long names (40+ characters), pale or dark brand colours, one branch or five.
- Brand colour for text and icons uses the contrast-safe roles (`text-primary-ink`, `text-accent-on-dark`, …), never `text-primary` / `text-accent`.
- Motion values come from `src/motion/tokens.ts` (GSAP) or `ease-stitch` (CSS). Import GSAP from `src/motion/gsap.ts`. Wrap animations in `gsap.matchMedia()` with `MEDIA.motion`.
- Hover only on clickable things and photos. One `Magnetic` per screen.
- Reuse `Button`, `Media`, `Logo`, `Magnetic` and `StitchLine`, and Tabler icons. Don't add another UI, icon or animation library.
- Phone first (390px). WhatsApp is the primary action.

## Commands

```bash
npm run dev                          # http://localhost:3000 (demo list), /<slug> (one boutique)
npm run config -- <slug>             # data.md → config.ts, then validates it (--dry-run to preview)
npm run validate                     # check every boutique's data and photos
npm run check                        # validate + type check + production build
npm run shots                        # screenshots of sample-boutique → .shots/
npm run shots -- <slug>              # screenshots of one boutique
npm run new-boutique "Name"          # boutiques/<slug>/ (data.md, photos/) + src/sites/<slug>/Site.tsx
VITE_TENANT=<slug> npm run build     # one boutique's site, for its own domain
```

## Definition of done for UI work

`npm run check` passes, `npm run shots` passes with the dev server running, and you have **opened and looked at** the desktop, mobile and reduced-motion screenshots for both example boutiques. The full checklist is in `docs/DESIGN.md`.

## Where things live

- `src/types/boutique.ts`: the config contract
- `src/theme/theme.ts`: palette derivation, contrast safety, `fitDisplay`
- `src/motion/`: tokens, GSAP setup, smooth scroll, stitch line, magnetic
- `src/components/`: Button, Media, Logo
- `src/sections/`: the component library, one folder per job (hero/, gallery/, reviews/…); `index.ts` is the catalog
- `src/theme/fonts.ts`: approved font pairs
- `src/sites/<slug>/Site.tsx`: a boutique's page, composed from the library
- `src/sites/<slug>/config.ts`: a boutique's details, generated from its data.md
- `src/sites/_template/Site.tsx`: the starter page every new boutique gets
- `boutiques/_template/sample-data-template.md`: the sheet the field team fills in
- `scripts/lib/data-sheet.mjs`: reads a filled sheet and builds a config (forgiving of how people write)
- `scripts/lib/validate.mjs`: what counts as an error or a warning for a boutique
- `prompts/`: Gemini image and Veo video prompts for mood shots
