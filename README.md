# manyeah

Personal site: an SPQR loading screen (Scientia Per Quaestionem Reperitur), a floating statue that rolls as you scroll, doodled sections, a whoami section, and a menu with a theme picker (cream, midnight, lavender, or your own colours).

Built with [Astro](https://astro.build), Tailwind and three.js, deployed on Cloudflare Workers. Inspired by [abhi.now](https://abhi.now) (doodled section links) and [one-space](https://github.com/LHRUN/one-space) (MIT): the floating, scroll-rolling statue, the background texture (`public/background.png`), the About section layout and its github / twitter / gmail / telegram icons come from one-space.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static site into dist/
npm run check      # type-check
```

## Where things live

| Want to change…                         | Edit                                     |
| --------------------------------------- | ---------------------------------------- |
| Name, intro, résumé link, tagline       | `src/consts.ts` → `SITE`                 |
| About text, photos, email, social links | `src/consts.ts` → `ABOUT`, `public/about/` |
| The statue                              | `npm run statue` (below), set `STATUE`   |
| Built-in themes (cream / midnight)      | `src/consts.ts` → `THEMES`, `global.css` |
| Menu (links, theme presets, colour bars)| `src/components/SiteMenu.astro`          |
| Custom-theme rules (text colour, etc.)  | theme engine in `src/layouts/Base.astro` |
| Work / research / people / snippets     | add a `.md` file in `src/content/<name>/`|
| Blog posts                              | `src/content/blogs/*.md`                 |
| Favourite quotes                        | `src/content/quotes.json`                |
| Section doodles                         | `src/components/Doodle.astro`            |
| Loading screen / SPQR mark              | `src/components/Loader.astro`, `SpqrMark.astro` |
| Favicons                                | `design/favicon*.svg` → PNGs in `public/`|

Front-matter fields for each section are defined in `src/content.config.ts`. Everything in `src/content` right now is placeholder text.

**Résumé:** the résumé links open `/resume`, a page showing `public/resume.webp` with links to `public/resume.pdf` (some embedded browsers refuse to open a PDF directly). After replacing the PDF, regenerate the image:

```sh
pdftoppm -r 200 -png -singlefile public/resume.pdf resume && convert resume.png -quality 82 public/resume.webp && rm resume.png
```

## The statue

The bust is a scan of Augustus, cut from a 16 MB, 323k-triangle STL down to a 300 KB Draco-compressed `.glb` (120k triangles). To swap in another scan:

```sh
npm run statue -- path/to/scan.stl public/statue.glb 120000 -90 0 0
```

The last three numbers rotate the scan (degrees about X, Y and Z) so it ends up upright and facing the viewer; `-90 0 0` fixes the usual Z-up STL. Lower the triangle count for a smaller file. Then point `STATUE.SRC` in `src/consts.ts` at the new file. `STATUE.TURN` sets how far he looks to the side. Augustus has a flat back, so keep that small.

## Type

The whole site, the SPQR mark included, is set in Bree Serif (`--font-main` in `src/styles/global.css`).

## SPQR

On this site SPQR stands for *Scientia Per Quaestionem Reperitur*, "knowledge is found through questioning" (`MOTTO` in `src/consts.ts`). The mark is { SPQR } with the curly braces drawn as laurel sprigs, with circuit traces and node dots branching off among the leaves (geometry in `src/lib/spqr.ts`). The loading screen, in the current theme, grows the laurels, lights the circuit, glitches the letters on, types the Latin motto, then brings in the English translation, which holds for a couple of seconds while the Latin dims. The tab icon uses the same laurels: `node --experimental-strip-types scripts/favicon.ts` writes `design/favicon*.svg`, which are rendered to the PNGs in `public/`.

## The landing page

- The nav stays pinned to the top as you scroll. **whoami** (first in the nav) scrolls to the About section; **menu** (the three bars, last) opens the menu.
- **scroll** and **contact** boxes sit at the bottom of the first screen. Contact (here and in the menu) opens a card with the email, a copy button, and the GitHub and LinkedIn links.
- Below the first screen is the About section: a flip-card photo (pixel art on the front, the photo on hover) whose corners round off as it scrolls in, a row of contact icons, and a few paragraphs. The photos in `public/about/` are placeholders rendered from the statue.
- At the very bottom, a boxed note slides out of the pinned nav with an arrow up at **work**. It lives inside the bar, so it never covers the text.
- The statue turns a full roll as the page scrolls.

## Bricks on the section pages

Every section page (work, research, people, blogs, snippets, résumé) has a dashed outline of five bricks at the bottom of the screen. Clicking the outline lays a brick. The fifth turns the course into a marble column that rises up the page, solid in the bottom quarter of the screen and fading out above it, and the outline steps on to the next spot.

Columns only stand in the empty margins either side of the text, never behind it, filling right to left: the right margin from the screen edge inwards, then the left margin from beside the text out to the far edge. When every spot is full, the colonnade fades and starts again from zero. How many fit depends on the window width; on screens too narrow for any, the feature hides. The count is kept in the visitor's own browser (`src/components/Colonnade.astro`).

- The statue glides from beside the name to the middle of the screen as the About section scrolls in.

## The theme menu

The three-bar menu holds quick links (about, résumé, contact) and the theme picker:

- **Auto** (the default) shows Cream in light mode and Midnight in dark mode, following the visitor's system.
- **Cream** and **Midnight** pin one of them.
- **Lavender** is `#c39ff9` fading into a soft pink (`#f8c5e2`) across the page, with deep violet (`#3f1d7a`) for links.
- **Primary** (background) and **secondary** (accent) colours can each be dragged on hue, strength and shade bars, typed as a hex code (`#1e3a5f` or `#abc`), or picked from the colour well. The page, including the statue's lighting, updates as you drag.

For a custom theme the text colour is worked out from the background (dark text on light backgrounds, light text on dark ones). The choice is saved in that visitor's browser only.

## Deploy (Cloudflare)

```sh
npx wrangler types   # after any wrangler.jsonc change
npm run deploy
```

Set the real domain in `astro.config.mjs` (`site`).

## Open items (from the design doc)

- **Statue credit**: the footer says "statue: Augustus". Add the scan's source to `STATUE.CREDIT` / `STATUE.CREDIT_URL` if it needs attribution.
- **Tagline**: none yet. Set `SITE.TAGLINE` to show one under the intro.
- **About**: the photos in `public/about/` are placeholders rendered from the statue.
- **Overall design**: the layout follows the paper sketch (`design/sketch.webp`).
