// Everything a non-developer is likely to want to change lives in this file.

export const SITE = {
	// TODO: confirm name + intro.
	NAME: "Manya",
	INTRO: "Builds things, reads papers, and keeps a small city of bricks.",
	DESCRIPTION: "Work, research, people, blogs and snippets.",
	RESUME: "/resume.pdf",
	// Still an open item in the design doc; set to a string to show it under the intro.
	TAGLINE: null as string | null,
};

// Any draco- or plain-.glb bust in /public works: Y up, facing +Z. The loader
// centres and scales it. scripts/stl2glb.mjs makes one from an STL scan.
export const STATUE = {
	SRC: "/augustus.glb",
	// Resting turn in radians; negative looks toward the name on the left.
	// The scan has a flat back, so keep this (plus the sway) well under 90°.
	TURN: -0.3,
	CREDIT: "Augustus",
	CREDIT_URL: undefined as string | undefined,
};

export type RouteName = "work" | "research" | "people" | "blogs" | "snippets";

export const ROUTES: { NAME: RouteName; PATH: string; BLURB: string }[] = [
	{ NAME: "work", PATH: "/work", BLURB: "Internships and projects." },
	{ NAME: "research", PATH: "/research", BLURB: "Papers and the research I'm working on." },
	{
		NAME: "people",
		PATH: "/people",
		BLURB: "You can't know me without knowing my favourite people.",
	},
	{ NAME: "blogs", PATH: "/blogs", BLURB: "Writing, and the quotes I keep coming back to." },
	{ NAME: "snippets", PATH: "/snippets", BLURB: "Events I've run and rooms I've been in." },
];

// The two built-in themes. Visitors get the light one or the dark one to
// match their system, and can pick their own colours from the theme menu.
// A / B are each theme's two primaries (background and accent); the other
// tokens live in src/styles/global.css.
export const THEMES = {
	LIGHT: { ID: "paper-clay", NAME: "Cream", A: "#f2eadb", B: "#b4532a" },
	DARK: { ID: "midnight-chalk", NAME: "Midnight", A: "#131a24", B: "#ece6d8" },
} as const;

// Bricks per marble block.
export const BRICKS_PER_MARBLE = 5;
