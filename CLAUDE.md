# tea-design (TeaPlace)

Portfolio piece: a tea-brand landing page built to demonstrate modern CSS and vanilla-JS
frontend skills (no framework). Live at teaplace.design. Originally a "use these exact
colors, mobile-first" design challenge; `docs/plans/2025-02-26-teaplace-portfolio-redesign.md`
records a later redesign pass toward an "Elevated Minimal with Interactive Storytelling"
direction using scroll-timeline, CSS `@property`, container queries, and backdrop-filter.

## Stack

- Vanilla HTML5 + CSS3 + ES6+ JavaScript, no framework
- Webpack 5.110 (webpack-cli 7, webpack-dev-server 6) bundles `index.js` to `dist/`
- Biome 2.5 for lint + format (flat config in `biome.json`)
- pnpm 10.34 (lockfile: `pnpm-lock.yaml`)
- Node 22 in CI
- Deployed on Vercel (`vercel.json`): build copies `index.html`, `index.css`,
  `sitemap.xml`, `robots.txt`, and `assets/` into `dist/` alongside the webpack bundle

## Commands

```bash
pnpm start          # webpack serve, dev mode, opens browser on :3000
pnpm build          # webpack production build -> dist/
pnpm watch          # webpack --watch, dev mode
pnpm biome:check    # lint check
pnpm biome:fix      # lint check, auto-fix
pnpm biome:format   # format only
pnpm check          # biome:check && build (what CI runs)
pnpm audit / pnpm security   # pnpm audit --audit-level high
```

CI (`.github/workflows/ci.yml`) runs `pnpm install --frozen-lockfile`, `pnpm run check`,
`pnpm run security` on push/PR to `main`.

## Layout

- `index.html`, `index.css`, `index.js`: the entire site, flat at repo root
- `assets/images/`: hero.png, product-black.png, product-green.png, og-image.png, favicon.png
- `dist/`: webpack build output, not committed source
- `docs/plans/`: redesign planning notes

## Conventions

- Biome enforces single quotes, no semicolons (ASI), 2-space indent, 100-char lines,
  organized imports on save/check.
- No test runner is wired up despite `vitest` and `@testing-library/react` sitting in
  devDependencies; there are no test files and no `test` script.
- CSP is locked down in `vercel.json` (`script-src 'self' 'unsafe-inline'`, Google Fonts
  allowed for style/font, `images.unsplash.com` allowed for img). Adding a new external
  resource domain means updating that header.
- `pnpm.overrides` in `package.json` pins several transitive deps (webpack,
  serialize-javascript, webpack-dev-server, vite, nanoid, shell-quote, uuid) for CVE
  fixes; check there before assuming a dependency version is unconstrained.

## Gotchas

- `vitest` and `@testing-library/react` are unused dependencies (no React in this repo).
