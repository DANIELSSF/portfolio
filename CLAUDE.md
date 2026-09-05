# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Astro dev with HMR)
- **Build:** `npm run build` (static output to `dist/`)
- **Preview:** `npm run preview` (serve built site locally)

No test runner or linter is configured.

## Architecture

**Astro 6 + React islands** portfolio site deployed as a static site to https://danielssf.dev.

### Rendering model

Astro components render at build time with zero JavaScript. React components (`src/components/*.tsx`) hydrate client-side as islands using `client:load`. Keep this split intentional — only use React when client interactivity is required (animations, state).

### Internationalization

Custom i18n (no library). Default language is Spanish (`es`).

- All UI strings live in `src/i18n/translations.ts` — use `t(lang, key)` helper for lookups.
- Language is determined by URL: `/` = Spanish, `/en/` = English. `getLangFromUrl(url)` extracts it.
- When adding new UI text, add keys to both `es` and `en` in the translations object.
- `src/pages/index.astro` (ES) and `src/pages/en/index.astro` (EN) are parallel page shells with the same component list — structural changes to one must be mirrored in the other. Components themselves are language-agnostic; they resolve strings via `getLangFromUrl(Astro.url)` + `t()`.
- Project markdown content is Spanish-only and rendered identically on both language pages; only UI chrome is translated.

### Content collections

Defined in `src/content.config.ts` using Astro Content Layer with Zod schemas:

- **projects** (`src/content/projects/*.md`) — title, description, tech[], github?, live?, featured, order

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin (no tailwind.config file — v4 uses CSS-first config in `src/styles/global.css`).
- **Theme system:** semantic `--color-*` custom properties defined twice in `global.css` — `:root` (dark, the default) and `:root.light`. Tailwind v4 exposes them as utilities (`bg-surface`, `text-accent`, `text-title-section`, etc.); use these semantic utilities, never raw palette colors, and add new tokens to both theme blocks. The `dark:` variant is custom-defined as `:root:not(.light)`.
- **Theme behavior** (init-before-paint, toggle, localStorage persistence) lives in inline `is:inline` scripts in `src/layouts/Layout.astro` — not React.
- **Animations:** Framer Motion only for truly interactive islands (terminal, nav). Scroll reveals are CSS transitions driven by one IntersectionObserver inline script in `Layout.astro`: put `data-reveal` on a single element, or `data-reveal-group` on a container with `data-reveal-child` + inline `--reveal-delay` on staggered children. Hidden states are gated on `html.js` + `prefers-reduced-motion: no-preference`, so content is never trapped invisible. Stat counters use `data-counter`/`data-target`/`data-suffix` (same script). Respects `prefers-reduced-motion`.

### Agent skills

`.agents/skills/` contains project-local skills (astro, tailwind-design-system, liquid-glass-design, web-design-guidelines, etc.) with detailed design and framework guidance — consult them when doing visual/design work.

### Path aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`).
