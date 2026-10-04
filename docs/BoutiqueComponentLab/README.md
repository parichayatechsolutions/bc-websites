# Boutique Component Lab — handoff

Open `Component Library.dc.html` in a browser to browse every section and version.

## Files
- `Component Library.dc.html` — the browser: boutique picker, fonts, version and motion pickers, phone + desktop previews, full-site preview (1100/1440/1920).
- `Section Preview.dc.html` — core sections (nav, hero, gallery, services, reviews, contact, footer, story, process, FAQ, Instagram, bridal, before/after, offers, trust, map). Each has 26 versions, `is.<section><LETTER>`.
- `Speciality Preview.dc.html` — speciality sections (fabric, blouse designer, measurements, lookbook, rental, kids, men, embroidery, saree services, alterations, tracker, wedding planner, gift voucher, classes, team, blog, sticky WhatsApp, cinematic hero).
- `alive.js` — shared motion layer (scroll reveals, parallax, tilt, magnetic buttons, count-ups, gold shimmer, grain, pulse/spin/marquee).
- `support.js` — the preview runtime only; not needed in React.

## How a .dc.html maps to React
Each file holds a template (markup between `<x-dc>` tags) and a `Component` class whose `renderVals()` returns the values used in `{{ holes }}`.
- `<sc-if value>` → `{cond && …}`; `<sc-for list as>` → `.map()`
- `<dc-import name="Section Preview" …>` → `<SectionPreview … />`
- `style="…"` is inline CSS → move to CSS modules / Tailwind.
- Boutique data (BOUTIQUES, PRICES, STORY, REVIEWS, CONTACT) lives at the top of the script in `Component Library.dc.html`.
- Colours are CSS variables (`--c-primary`, `--c-accent`, `--c-dark`, `--c-light`, `--c-ink`, `--c-paper`, `--c-muted`, `--c-thread`, `--f-display`, `--f-body`) computed per boutique in `renderVals()`.
- Layout uses container queries (`cqw` units); the section root sets `container-type:inline-size`.

## Libraries used
- React (class components, via the preview runtime)
- Tabler Icons webfont 3.19 (`ti ti-*` classes)
- Google Fonts: Marcellus, Karla, Allura, DM Sans and the font-pair list in FONTS
- Native browser APIs: Web Animations API, IntersectionObserver, MutationObserver, container queries, `color-mix()`, `backdrop-filter`

## Suggested React stack
- Next.js or Vite + React + TypeScript
- `@tabler/icons-react` for icons, `next/font` or Fontsource for fonts
- `motion` (Framer Motion) for reveals, parallax, magnetic buttons — or port `alive.js` as a `useAlive(ref)` hook
- `lenis` for smooth scroll (optional)
- Tailwind CSS or CSS modules for styles
- WhatsApp links: `https://wa.me/<number>?text=<encoded message>`

## Photos
Images load from `photos/<slug>/<file>.jpg`, falling back to `photos/<slug>/ai-<file>.jpg`, then a placeholder.
