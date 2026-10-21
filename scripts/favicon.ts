// Writes design/favicon.svg and design/favicon-16.svg from the same laurel
// geometry as the on-page mark. Run with:  node scripts/favicon.ts
// then render the PNGs into public/ (see README).
import { writeFileSync } from "node:fs";
import { brace, LEAF } from "../src/lib/spqr.ts";

const PAPER = "#f2eadb";
const INK = "#2a211b";
const ACCENT = "#b4532a";

// Braces sit 64 units apart inside, enough for SP over QR.
const W = 196;
const sprig = (side: "left" | "right") => {
	const b = brace(side, W);
	const leaves = b.leaves
		.map((l) => `<path d="${LEAF}" transform="translate(${l.x} ${l.y}) rotate(${l.angle}) scale(${l.size})"/>`)
		.join("");
	return (
		`<path d="${b.stem}" fill="none" stroke="${ACCENT}" stroke-width="3.6" stroke-linecap="round"/>` +
		`<g fill="${ACCENT}">${leaves}</g>`
	);
};

// Crop to the braces and centre them in a square.
const full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 -23 156 156">
  <rect x="20" y="-23" width="156" height="156" rx="30" fill="${PAPER}"/>
  ${sprig("left")}${sprig("right")}
  <g fill="${INK}" font-family="Bree Serif" font-size="40" text-anchor="middle" letter-spacing="1">
    <text x="98.5" y="52">SP</text>
    <text x="98.5" y="94">QR</text>
  </g>
</svg>
`;

// At 16px leaves are noise: stacked letters between two plain accent arcs.
const tiny = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  <rect width="16" height="16" rx="3" fill="${PAPER}"/>
  <g fill="${INK}" font-family="Bree Serif" font-size="7.6" text-anchor="middle">
    <text x="8" y="7.3">SP</text>
    <text x="8" y="14.6">QR</text>
  </g>
  <path d="M2.4 1.8C1 4 1 12 2.4 14.2M13.6 1.8C15 4 15 12 13.6 14.2" fill="none" stroke="${ACCENT}" stroke-width="1.1" stroke-linecap="round"/>
</svg>
`;

writeFileSync(new URL("../design/favicon.svg", import.meta.url), full);
writeFileSync(new URL("../design/favicon-16.svg", import.meta.url), tiny);
console.log("wrote design/favicon.svg, design/favicon-16.svg");
