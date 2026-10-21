// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	// TODO: swap for the real domain once it's bought.
	site: "https://example.com",
	output: "static",

	// Pages are prerendered; only /api/bricks runs on the worker.
	adapter: cloudflare({ imageService: "compile" }),

	// No sessions needed, so don't ask Cloudflare for a SESSION KV binding.
	session: {
		driver: { entrypoint: "unstorage/drivers/null" },
	},

	integrations: [mdx()],

	vite: {
		plugins: [tailwindcss()],
	},
});
