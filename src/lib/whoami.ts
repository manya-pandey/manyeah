import { getEntry } from "astro:content";

// The whoami entry, plus the contact links built from it.
export async function getWhoami() {
	const entry = await getEntry("whoami", "whoami");
	if (!entry) throw new Error("src/content/whoami.md is missing");
	const d = entry.data;
	const socials = [
		d.github && { name: "github" as const, href: d.github },
		d.linkedin && { name: "linkedin" as const, href: d.linkedin },
		{ name: "gmail" as const, href: `mailto:${d.email}` },
	].filter(Boolean) as { name: "github" | "linkedin" | "gmail"; href: string }[];
	return { entry, ...d, socials };
}
