// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// On Vercel this picks up the production domain automatically; set SITE_URL
// to override it once there's a custom domain.
const site =
	process.env.SITE_URL ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: "https://manyeah.vercel.app");

// https://astro.build/config
export default defineConfig({
	site,
	// A fully static site: Vercel builds it with `npm run build` and serves dist/.
	output: "static",

	integrations: [mdx()],

	vite: {
		plugins: [tailwindcss()],
	},
});
