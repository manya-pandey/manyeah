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

// Each palette is two primary colours (the halves of its swatch) plus the
// tokens the rest of the site derives from them. The first one is the default.
export const PALETTES = [
	{ ID: "paper-clay", NAME: "Paper & clay", A: "#f2eadb", B: "#b4532a" },
	{ ID: "midnight-chalk", NAME: "Midnight chalk", A: "#131a24", B: "#ece6d8" },
	{ ID: "orchid-ink", NAME: "Orchid ink", A: "#1c1931", B: "#c97fbc" },
	{ ID: "peacock-ledger", NAME: "Peacock ledger", A: "#eee6cf", B: "#0e5e63" },
] as const;

export const DEFAULT_PALETTE = PALETTES[0].ID;

// Bricks per marble block.
export const BRICKS_PER_MARBLE = 5;
