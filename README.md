# manyeah

Personal site: a floating statue, five doodled sections, four colour palettes, a techno SPQR loading screen, and a wall of bricks every visitor helps build.

Built with [Astro](https://astro.build), Tailwind and three.js, deployed on Cloudflare Workers. Inspired by [abhi.now](https://abhi.now) (doodled section links) and [one-space](https://github.com/LHRUN/one-space) (the floating statue, MIT).

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static pages + the /api/bricks worker into dist/
npm run check      # type-check
```

The dev server runs the brick API against a local KV store, so bricks work offline.

## Where things live

| Want to change…                         | Edit                                     |
| --------------------------------------- | ---------------------------------------- |
| Name, intro, résumé link, tagline       | `src/consts.ts` → `SITE`                 |
| The statue                              | `npm run statue` (below), set `STATUE`   |
| Palettes (swatch colours)               | `src/consts.ts` → `PALETTES`             |
| Palettes (text/accent/statue lighting)  | `src/styles/global.css`                  |
| Work / research / people / snippets     | add a `.md` file in `src/content/<name>/`|
| Blog posts                              | `src/content/blogs/*.md`                 |
| Favourite quotes                        | `src/content/quotes.json`                |
| Section doodles                         | `src/components/Doodle.astro`            |
| Loading screen / SPQR mark              | `src/components/SpqrMark.astro`          |
| Favicons                                | `design/favicon*.svg` → PNGs in `public/`|

Front-matter fields for each section are defined in `src/content.config.ts`. Everything in `src/content` right now is placeholder text.

**Résumé:** put the PDF at `public/resume.pdf`. The landing-page link already points there.

## The statue

The bust is a scan of Augustus, cut from a 16 MB, 323k-triangle STL down to a 300 KB Draco-compressed `.glb` (120k triangles). To swap in another scan:

```sh
npm run statue -- path/to/scan.stl public/statue.glb 120000 -90 0 0
```

The last three numbers rotate the scan (degrees about X, Y and Z) so it ends up upright and facing the viewer; `-90 0 0` fixes the usual Z-up STL. Lower the triangle count for a smaller file. Then point `STATUE.SRC` in `src/consts.ts` at the new file. `STATUE.TURN` sets how far he looks to the side. Augustus has a flat back, so keep that small.

## The bricks

Each click on **Click to add a brick** calls `POST /api/bricks`, which adds one to a counter in Cloudflare KV (max 12 per visitor per minute). Every 5 bricks stacked become one marble block; the rest stay brick. If the API can't be reached (for example in a static preview), the wall falls back to the visitor's own browser and says so in the `?` popup.

## Deploy (Cloudflare)

```sh
npx wrangler kv namespace create BRICKS   # once; paste the id into wrangler.jsonc
npx wrangler types                        # after any wrangler.jsonc change
npm run deploy
```

Set the real domain in `astro.config.mjs` (`site`).

## Open items (from the design doc)

- **Statue credit**: the footer says "statue: Augustus". Add the scan's source to `STATUE.CREDIT` / `STATUE.CREDIT_URL` if it needs attribution.
- **Final palette set and default**: the first entry in `PALETTES` is the default.
- **Tagline**: "a city of bricks, left in marble" isn't approved yet. Set `SITE.TAGLINE` to show one.
- **Overall design**: the layout follows the paper sketch (`design/sketch.webp`).
