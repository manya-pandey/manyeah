# manyeah

Personal site: an SPQR loading screen (Scientia Per Quaestionem Reperitur), a floating statue that rolls as you scroll, doodled sections, a whoami section, and a menu with a theme picker (cream, midnight, lavender, or your own colours).

Built with [Astro](https://astro.build), Tailwind and three.js, hosted on Vercel, with content edited through [Pages CMS](https://pagescms.org). Inspired by [abhi.now](https://abhi.now) (doodled section links) and [one-space](https://github.com/LHRUN/one-space) (MIT): the floating, scroll-rolling statue, the background texture (`public/background.png`), the About section layout and its github / twitter / gmail / telegram icons come from one-space.

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static site into dist/
npm run check      # type-check
```

## Adding and editing content (Pages CMS)

Everything that changes as things progress has a form in Pages CMS: **whoami** (name, intro line, photo, email, GitHub, LinkedIn, résumé PDF and the whoami text), **work**, **research**, **snippets**, **blog posts**, **quotes** and **people**.

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with GitHub.
2. The first time, install the Pages CMS GitHub app on `manya-pandey/manyeah` when it asks.
3. Open the repo, pick a section, then **Add an entry** (or open one to edit) and **Save**.

Each save is a commit to `main`; Vercel rebuilds and the change is live in about a minute. Lists are newest first by the entry's **date**, so a new snippet, post or quote lands on top. Images uploaded in the forms go to `public/media/`.

The forms are defined in `.pages.yml`; the fields each section accepts are in `src/content.config.ts`. If an entry is missing a required field the build fails and Vercel keeps the previous version live, so nothing breaks for visitors; fix the entry and save again.

**Résumé:** upload a new PDF in the whoami form. The résumé page shows it as an image (`public/resume.webp`, since some embedded browsers block PDFs) with links to the PDF; the GitHub Action in `.github/workflows/resume-preview.yml` redraws that image whenever the PDF changes.

## Where the rest lives

| Want to change…                         | Edit                                     |
| --------------------------------------- | ---------------------------------------- |
| Anything with a Pages CMS form          | Pages CMS, or the files in `src/content/`|
| The statue                              | `npm run statue` (below), set `STATUE`   |
| Built-in themes                         | `src/consts.ts` → `THEMES`, `global.css` |
| Menu (links, theme presets, colour bars)| `src/components/SiteMenu.astro`          |
| Custom-theme rules (text colour, etc.)  | theme engine in `src/layouts/Base.astro` |
| Section doodles                         | `src/components/Doodle.astro`            |
| Loading screen / SPQR mark              | `src/components/Loader.astro`, `SpqrMark.astro` |
| Favicons                                | `npm run favicon`, then render `design/favicon*.svg` to PNGs in `public/` |

## The statue

The bust is a scan of Augustus, cut from a 16 MB, 323k-triangle STL down to a 300 KB Draco-compressed `.glb` (120k triangles). To swap in another scan:

```sh
npm run statue -- path/to/scan.stl public/statue.glb 120000 -90 0 0
```

The last three numbers rotate the scan (degrees about X, Y and Z) so it ends up upright and facing the viewer; `-90 0 0` fixes the usual Z-up STL. Lower the triangle count for a smaller file. Then point `STATUE.SRC` in `src/consts.ts` at the new file. `STATUE.TURN` sets how far he looks to the side. Augustus has a flat back, so keep that small.

## Type

The whole site, the SPQR mark included, is set in Bree Serif (`--font-main` in `src/styles/global.css`).

## SPQR

On this site SPQR stands for *Scientia Per Quaestionem Reperitur*, "knowledge is found through questioning" (`MOTTO` in `src/consts.ts`). The mark is { SPQR } with the curly braces drawn as laurel sprigs, with circuit traces and node dots branching off among the leaves (geometry in `src/lib/spqr.ts`). The loading screen, in the current theme, grows the laurels, lights the circuit, glitches the letters on, types the Latin motto, then brings in the English translation, which holds for a couple of seconds while the Latin dims. The tab icon uses the same laurels: `npm run favicon` writes `design/favicon*.svg`, which are rendered to the PNGs in `public/`.

## The landing page

- The nav stays pinned to the top as you scroll. **whoami** (first in the nav) scrolls to the whoami section; **menu** (the three bars, last) opens the menu.
- **scroll** and **contact** boxes sit at the bottom of the first screen. Contact (here and in the menu) opens a card with the email, a copy button, and the GitHub and LinkedIn links.
- Below the first screen is the whoami section: a flip-card photo (a pixel-art version drawn from the photo on the front, the photo itself on hover) whose corners round off as it scrolls in, a row of contact icons, and the whoami text.
- At the very bottom, a boxed note slides out of the pinned nav with an arrow up at **work**. It lives inside the bar, so it never covers the text.
- As the page scrolls the statue looks one way, then the other, and nods a little (never far enough to show the scan's flat back or turn upside down), then glides to the middle of the screen as whoami scrolls in and fades back behind its text.
- Every page opens at the top, even after a reload or a restored tab; links like `/#whoami` still jump to their section.

## Bricks on the section pages

Every section page (work, research, people, blogs, snippets, résumé) has a dashed outline of five bricks at the bottom of the screen. Clicking the outline lays a brick. The fifth turns the course into a marble column that rises up the page, solid in the bottom quarter of the screen and fading out above it, and the outline steps on to the next spot.

Columns only stand in the empty margins either side of the text, never behind it, filling right to left: the right margin from the screen edge inwards, then the left margin from beside the text out to the far edge. When every spot is full, the colonnade fades and starts again from zero. How many fit depends on the window width; on screens too narrow for any, the feature hides. The count is kept in the visitor's own browser (`src/components/Colonnade.astro`).


## The theme menu

The three-bar menu holds quick links (whoami, résumé, contact) and the theme picker:

- **Auto** (the default) shows Cream in light mode and Midnight in dark mode, following the visitor's system.
- **Cream** and **Midnight** pin one of them.
- **Lavender** is `#c39ff9` fading into a soft pink (`#f8c5e2`) across the page, with deep violet (`#3f1d7a`) for links.
- **Primary** (background) and **secondary** (accent) colours can each be dragged on hue, strength and shade bars, typed as a hex code (`#1e3a5f` or `#abc`), or picked from the colour well. The page, including the statue's lighting, updates as you drag.

For a custom theme the text colour is worked out from the background (dark text on light backgrounds, light text on dark ones). The choice is saved in that visitor's browser only.

## Hosting (Vercel)

The site is fully static. To put it online:

1. At [vercel.com/new](https://vercel.com/new), sign in with GitHub and **Import** `manya-pandey/manyeah`.
2. Leave the settings Vercel detects (framework **Astro**, build `npm run build`, output `dist`) and press **Deploy**.

After that, every push to `main` (including every Pages CMS save) deploys automatically. The site's canonical URL follows Vercel's production domain; add a custom domain in the Vercel project's **Domains** settings, and set a `SITE_URL` environment variable if you want links to use it before Vercel does.

## Open items (from the design doc)

- **Statue credit**: the footer says "statue: Augustus". Add the scan's source to `STATUE.CREDIT` / `STATUE.CREDIT_URL` if it needs attribution.
- **People and blog posts**: still placeholders; replace them from Pages CMS.
- **Overall design**: the layout follows the paper sketch (`design/sketch.webp`).
