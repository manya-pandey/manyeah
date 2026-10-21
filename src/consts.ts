// Site-wide settings. Day-to-day content lives in src/content (see README).

// What SPQR stands for on this site.
export const MOTTO = {
	LATIN: "Scientia Per Quaestionem Reperitur",
	ENGLISH: "knowledge is found through questioning",
};

// The name, intro, whoami text, photo and contact links live in
// src/content/whoami.md, so they can be edited from Pages CMS.
export const SITE = {
	DESCRIPTION: "Work, research, people, blogs and snippets.",
	// The résumé page; the PDF itself is set in src/content/whoami.md.
	RESUME: "/resume",
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
	// Picked from the menu only. B here is the far end of its background gradient.
	LAVENDER: { ID: "lavender", NAME: "Lavender", A: "#c39ff9", B: "#f8c5e2" },
} as const;
