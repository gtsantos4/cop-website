# City of Promise Website

Static marketing site for the City of Promise nonprofit (Charlottesville, VA).
Plain HTML/CSS, built with [Eleventy](https://www.11ty.dev/). No frameworks
in the output — just files you can FTP anywhere.

## Quick start

```bash
npm install         # one-time
npm start           # local dev server at http://localhost:8080 (live reload)
npm run build       # build to ./_site/
npm run clean       # delete ./_site/
```

Eleventy watches all source files; edit anything, browser auto-refreshes.

## Project structure

```
.
├── _includes/             # Templates Eleventy uses but doesn't output
│   ├── base.njk           # The HTML wrapper every page uses
│   ├── header.njk         # Site nav (one source of truth)
│   └── footer.njk         # Site footer (one source of truth)
├── assets/
│   ├── site.css           # Shared styles (header, footer, body resets)
│   └── *.jpg, *.png       # Site imagery
├── cop-photos/            # All program/team/event photos
│   ├── partner logos/
│   └── team headshots/
├── colors_and_type.css    # Design tokens (colors, fonts, type scale)
├── index.html             # Home
├── our-approach.html      # Our Approach page
├── what-we-do.html        # What We Do page
├── who-we-are.html        # Who We Are page
├── bio-price-thomas.html  # Standalone bio page (NOT in Eleventy yet — see Quirks)
├── constellation.html     # Interactive constellation diagram (standalone)
├── *-Wireframes.html      # Internal design references — not linked from the site
├── .eleventy.js           # Eleventy config (passthroughs, watch targets)
├── .eleventyignore        # Files Eleventy should not template
└── _site/                 # BUILD OUTPUT — never edit by hand
```

## Editing a page

Each main page (`index`, `our-approach`, `what-we-do`, `who-we-are`) starts
with frontmatter, then page-specific `<style>`, then page sections:

```html
---
layout: base.njk
title: "City of Promise — What We Do"
activePage: what-we-do        # which nav link gets the gold underline
permalink: /what-we-do.html   # output URL (must be set so Eleventy doesn't fold to /folder/)
---
<style>
  /* page-specific CSS here */
</style>

<section>...</section>
<section>...</section>
```

The `<header>` and `<footer>` are auto-included by `_includes/base.njk`.
Don't add them in the page itself.

## Editing the nav or footer

- Nav: `_includes/header.njk` — one file, applies to every page.
- Footer: `_includes/footer.njk` — same.
- Active state: set `activePage:` in each page's frontmatter to one of:
  `home`, `what-we-do`, `our-approach`, `who-we-are`.

## Editing colors / fonts / type

`colors_and_type.css` — CSS custom properties (`--color-navy`, `--font-display`,
etc.). Use these via `var(--token)` everywhere instead of hardcoding hex codes.

## The constellation diagram

`constellation.html` is a self-contained interactive SVG/JS demo, embedded as
an `<iframe>` inside `our-approach.html`. It's intentionally outside the
Eleventy template system because it has its own full HTML document, custom
CSS, and a lot of JS — wrapping it in the base layout would break it.

Listed in `.eleventyignore` and pass-through-copied via `.eleventy.js`.

## Quirks / things to know

- **`bio-price-thomas.html`** — standalone page, currently outside the Eleventy
  layout. Not linked from anywhere. If you want to use it, either link to it
  as-is or convert it to use `layout: base.njk` like the other pages.
- **`*-Wireframes.html`** — these are internal design references, not part of
  the live site. They're in `.eleventyignore`. Safe to delete if you don't
  need them.
- **Page navigation flicker** — the base layout uses Speculation Rules
  (Chrome/Edge) to prerender same-origin pages on hover so clicks feel instant.
  Safari/Firefox fall back to normal navigation (small white flash).
- **Fonts** — Inter + Fraunces via Google Fonts (`<link>` in base.njk).
  `display=optional` so cached fonts paint instantly with no text-shift flash.
- **Donate button + many footer links** — currently `href="#"` placeholders.
  Wire to real targets when the donation flow / sub-pages are built.
- **No build step is required to view the site as a person**. Eleventy outputs
  100% plain HTML. The `_site/` folder can be uploaded to any static host
  (Netlify, Cloudflare Pages, S3, an FTP server) with no Node.js needed at
  runtime.

## Deployment

Not configured yet. Recommended next step: connect the GitHub repo
(https://github.com/gtsantos4/cop-website) to Netlify or Cloudflare Pages.
Build command: `npm run build`. Publish directory: `_site`.

## History

Originally a half-converted React-in-browser prototype. The home page and
What We Do page were React apps using Babel-standalone; the other pages
were already static. April 2026 we converted everything to plain static
HTML, then added Eleventy on top to share the header/footer/base layout.
The original `*.jsx` files have been removed — recoverable from git history
if needed.
