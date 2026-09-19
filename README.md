# TeaPlace

Portfolio piece: a tea-brand landing page built to demonstrate modern CSS and vanilla-JS
frontend skills, no framework. Live at [teaplace.design](https://teaplace.design).

Originally built for a "use these exact colors, mobile-first" design challenge, the site has
since gone through a redesign toward an "Elevated Minimal with Interactive Storytelling"
direction: a sage-green palette, `scroll-timeline` scroll-driven animation, CSS `@property`
for animatable custom properties, container queries, and `backdrop-filter`. See
`docs/plans/2025-02-26-teaplace-portfolio-redesign.md` for the full design spec.

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
pnpm check          # biome:check && build (what CI runs)
pnpm audit          # pnpm audit --audit-level high
```

## Project structure

- `index.html`, `index.css`, `index.js`: the entire site, flat at repo root
- `assets/images/`: `favicon.png`, `hero.png`, `og-image.png`, `product-black.png`,
  `product-green.png`
- `dist/`: webpack build output, not committed source
- `docs/plans/`: redesign planning notes (current design source of truth)

## Deployment

Deployed on Vercel. The build copies `index.html`, `index.css`, `sitemap.xml`, `robots.txt`,
and `assets/` into `dist/` alongside the webpack bundle (see `vercel.json`).
