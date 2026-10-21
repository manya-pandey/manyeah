# manyeah

Personal site: a techno SPQR loading screen, a floating statue that rolls as you scroll, five doodled sections, an About section, and a menu with a theme picker (cream, midnight, or your own colours).

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
| Loading screen / SPQR mark              | `src/components/SpqrMark.astro`          |
| Favicons                                | `design/favicon*.svg` → PNGs in `public/`|

Front-matter fields for each section are defined in `src/content.config.ts`. Everything in `src/content` right now is placeholder text.

**Résumé:** `public/resume.pdf`. Replace the file to update it; every résumé link points there.

## The statue

The bust is a scan of Augustus, cut from a 16 MB, 323k-triangle STL down to a 300 KB Draco-compressed `.glb` (120k triangles). To swap in another scan:

```sh
npm run statue -- path/to/scan.stl public/statue.glb 120000 -90 0 0
```

The last three numbers rotate the scan (degrees about X, Y and Z) so it ends up upright and facing the viewer; `-90 0 0` fixes the usual Z-up STL. Lower the triangle count for a smaller file. Then point `STATUE.SRC` in `src/consts.ts` at the new file. `STATUE.TURN` sets how far he looks to the side. Augustus has a flat back, so keep that small.

## Type

The whole site is set in Bree Serif (`--font-main` in `src/styles/global.css`). The only other face is JetBrains Mono, used just for the SPQR mark.

## The landing page

- The nav stays pinned to the top as you scroll. **about** scrolls to the About section; **menu** (the three bars, last in the nav) opens the menu.
- **scroll** and **contact** boxes sit at the bottom of the first screen. Contact opens an email to `ABOUT.EMAIL`.
- Below the first screen is the About section: a flip-card photo (pixel art on the front, the photo on hover) whose corners round off as it scrolls in, a row of contact icons, and a few paragraphs. The photos in `public/about/` are placeholders rendered from the statue.
- At the very bottom a note points up at the nav's **work** link.
- The statue turns a full roll as the page scrolls.

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
