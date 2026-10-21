import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One folder (or file) per section under src/content. Add a .md file to add an entry.

const work = defineCollection({
	loader: glob({ base: "./src/content/work", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string(),
		kind: z.enum(["internship", "leadership", "project", "certification"]),
		org: z.string().optional(),
		role: z.string().optional(),
		location: z.string().optional(),
		period: z.coerce.string().optional(),
		// Used for ordering only (newest first); undated items get a nominal one.
		date: z.coerce.date(),
		link: z.url().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

const research = defineCollection({
	loader: glob({ base: "./src/content/research", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string(),
		status: z.enum(["published", "accepted", "preprint", "under review", "in progress"]),
		venue: z.string().optional(),
		authors: z.string().optional(),
		date: z.coerce.date(),
		link: z.url().optional(),
	}),
});

const people = defineCollection({
	loader: glob({ base: "./src/content/people", pattern: "**/*.md" }),
	schema: z.object({
		name: z.string(),
		who: z.string(),
		link: z.url().optional(),
		order: z.number().default(0),
	}),
});

const blogs = defineCollection({
	loader: glob({ base: "./src/content/blogs", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

const quotes = defineCollection({
	loader: glob({ base: "./src/content/quotes", pattern: "**/*.md" }),
	schema: z.object({
		text: z.string(),
		by: z.string(),
		// Newest first on the blogs page.
		date: z.coerce.date(),
	}),
});

// The whoami section (and the name and intro on the landing page): one file.
const whoami = defineCollection({
	loader: glob({ base: "./src/content", pattern: "whoami.md" }),
	schema: z.object({
		name: z.string(),
		intro: z.string(),
		photo: z.string(),
		photo_alt: z.string().default("Portrait"),
		email: z.email(),
		github: z.url().optional(),
		linkedin: z.url().optional(),
		// The résumé page's preview image (public/resume.webp) is regenerated
		// from this PDF by .github/workflows/resume-preview.yml.
		resume: z.string(),
	}),
});

const snippets = defineCollection({
	loader: glob({ base: "./src/content/snippets", pattern: "**/*.md" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		// Shown instead of the full date when only the month or year is known.
		when: z.coerce.string().optional(),
		where: z.string().optional(),
		role: z.string().optional(),
		link: z.url().optional(),
	}),
});

export const collections = { work, research, people, blogs, quotes, snippets, whoami };
