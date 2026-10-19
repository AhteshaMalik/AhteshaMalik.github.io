# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio site for **Ahtesham Ali (AI Engineer)**, served as a static site by **GitHub Pages** from the repo root at https://ahteshamalik.github.io/. The repo name (`AhteshaMalik.github.io`) is what makes GitHub Pages publish it — pushes to `main` deploy automatically.

There is **no build step, no package manager, no tests, and no framework**. All HTML/CSS/JS is hand-authored or vendored and committed directly.

## Developing & previewing

Open `index.html` directly in a browser, or run a local static server from the repo root:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

To deploy: commit and push to `main`. GitHub Pages picks it up.

## Architecture

Everything the visitor sees lives in **`index.html`** (~480 lines). It is one long scroll built from `<section>`/comment-delimited blocks — `intro`, `ABOUT`, `WHAT I DO`, `SELECTED WORK`, `EXPERIENCE`, `TECH STACK`, `FAQ`, `contact`, footer. All page copy is edited here.

The CSS/JS under `assets/` originates from an exported **WordPress/Tailwind theme**, which explains several conventions you'll encounter:

- `assets/css/core.css` and `assets/css/theme.css` are large, compiled Tailwind + theme output — treat them as generated/vendored; **do not hand-edit them.** Tailwind-style utility classes (e.g. `rotate-[90deg]`, `h-svh`) are used directly in the HTML.
- `assets/css/personal.css` is the **only stylesheet to edit by hand** — it holds site-specific overrides (text-shadow readability tweaks, hero-logo Flip animation) layered on top of the theme.
- Leftover theme machinery (FacetWP `facetwp-loaded` hooks in `core.js`, `wp-blocks.css`, `swiper.css`) is inert here but kept so the theme's behaviors stay intact.

### JavaScript (all jQuery-based, loaded at end of `index.html`)

- **Vendored libraries** in `assets/js/vendor/` (jQuery, GSAP + ScrollTrigger/ScrollSmoother/Flip, ScrollReveal, Swiper, SmoothScroll) — do not edit.
- `assets/js/theme.js` — accordion open/close behavior.
- `assets/js/core.js` — more accordion logic plus FacetWP re-init hook.
- `assets/js/datasr.js` — the scroll-reveal system. Elements animate in via `data-sr` attributes on HTML tags: `data-sr=""` (default up), `data-sr="fade|left|right|scale"`, `data-sr="custom{...JSON...}"`, or `data-sr="function|name"`. Add `no-sr` on a parent (or `no-sr-self`) to opt an element out. This is the mechanism to reach for when adding animated content.
- `assets/js/accessibility.js` — a11y helpers.

## SEO / discoverability (a primary purpose of this site)

The site is heavily optimized for search engines **and LLM crawlers**. When editing content, keep these in sync with each other:

- `index.html` `<head>` — Open Graph + Twitter cards, and two **JSON-LD blocks** (`Person` schema and a `FAQPage` schema). The FAQ JSON-LD must mirror the visible FAQ section.
- `llms.txt` — a Markdown résumé/summary written specifically for LLM retrieval. Keep it consistent with the page's factual claims (roles, projects, metrics).
- `robots.txt` — explicitly allow-lists AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.).
- `sitemap.xml` — update `<lastmod>` on meaningful content changes.
- `google<...>.html` — Google Search Console verification token; leave it in place.

Analytics: Google Analytics 4 (`G-CGW542WYEL`) and Microsoft Clarity (`xg5q2s3hrz`) are inlined in the `<head>`.
