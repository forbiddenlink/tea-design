# TeaPlace

Portfolio piece: a tea-brand landing page laid out like a tea merchant's cupping sheet, built with vanilla HTML, CSS and JavaScript and no framework. Live at [tea-design.vercel.app](https://tea-design.vercel.app).

It is a demo: there is no cart and no mailing list (the newsletter form says so).

## Features

- Six loose-leaf teas compared side by side in a scoring table
- A brew bench with a timer and a water-to-leaf ratio calculator, with deep links such as `#tea=emerald-sencha` (`bench-link.js`)
- Stamp-to-add buttons that tally your picks
- Scroll-driven animation (`animation-timeline`), a CSS `@property` custom property, and `prefers-reduced-motion` handling

The site began as a "use these exact colors, mobile-first" design challenge. `docs/plans/2025-02-26-teaplace-portfolio-redesign.md` is the earlier redesign plan; the current design (a cupping sheet) replaced it.

## Stack

- Vanilla HTML5, CSS3, ES6+ JavaScript, no framework
- Webpack 5 bundles `index.js` to `dist/`
- Biome for lint and format
- pnpm (lockfile: `pnpm-lock.yaml`)

## Getting started

```bash
pnpm install
pnpm start    # webpack serve, dev mode, opens at http://localhost:3000
```

## Scripts

```bash
pnpm start          # webpack serve, dev mode
pnpm watch          # webpack --watch, dev mode
pnpm build          # webpack production build -> dist/
pnpm biome:check    # lint check
pnpm biome:fix      # lint check, auto-fix
pnpm test           # vitest run (covers bench-link.js)
pnpm biome:format   # format only
pnpm check          # biome:check, test and build (what CI runs)
pnpm audit          # pnpm audit --audit-level high
```

## Project structure

- `index.html`, `index.css`, `index.js`: the entire site, flat at repo root
- `bench-link.js` and `bench-link.test.js`: deep-link helper for the brew bench and its test
- `assets/images/`: `favicon.png`, `hero.png`, `og-image.png`, `product-black.png`,
  `product-green.png`
- `dist/`: webpack build output, not committed source
- `docs/plans/`: earlier redesign plan (superseded by the cupping-sheet rebuild)

## Deployment

Deployed on Vercel. The build copies `index.html`, `index.css`, `sitemap.xml`, `robots.txt`,
and `assets/` into `dist/` alongside the webpack bundle (see `vercel.json`).

## License

MIT. See [LICENSE](LICENSE).
