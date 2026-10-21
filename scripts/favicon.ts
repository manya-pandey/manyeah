// Writes the tab icon, design/favicon.svg and design/favicon-16.svg: just
// the two laurel braces from the SPQR mark with their circuit traces, no
// letters and no background. The SVG switches palette with the browser's
// light/dark mode: deep techno green and blue on light tabs, bright neon on
// dark ones. Run with:  npm run favicon  (then render the PNGs, see README).
import { writeFileSync } from "node:fs";
import { brace, LEAF } from "../src/lib/spqr.ts";

const style = `<style>
    .leaf { fill: #0b7a4b } .stem { stroke: #0b7a4b } .trace { stroke: #1f4fbf } .node { fill: #1f4fbf }
    @media (prefers-color-scheme: dark) {
      .leaf { fill: #3cf2a0 } .stem { stroke: #3cf2a0 } .trace { stroke: #3a8dff } .node { fill: #3a8dff }
    }
  </style>`;

// Far enough apart to read as { } rather than a closed wreath.
const W = 172;
const sprig = (side: "left" | "right", stem: number, trace: number) => {
	const b = brace(side, W);
	return (
		`<path class="stem" d="${b.stem}" fill="none" stroke-width="${stem}" stroke-linecap="round"/>` +
		b.leaves
			.map((l) => `<path class="leaf" d="${LEAF}" transform="translate(${l.x} ${l.y}) rotate(${l.angle}) scale(${l.size * 1.35})"/>`)
			.join("") +
		// the long trace out of each brace's point is too much at tab size
		b.traces
			.filter((d) => !/ 55H/.test(d))
			.map((d) => `<path class="trace" d="${d}" fill="none" stroke-width="${trace}" stroke-linecap="round" stroke-linejoin="round"/>`)
			.join("") +
		b.nodes
			.filter((n) => n.r < 2.5)
			.map((n) => `<circle class="node" cx="${n.x}" cy="${n.y}" r="${n.r * 2}"/>`)
			.join("") +
		// a node on the brace's point instead
		`<circle class="node" cx="${side === "left" ? 42 : W - 42}" cy="55" r="4.4"/>`
	);
};

// Crop to the two braces.
const full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="27 -4 118 118">
  ${style}
  ${sprig("left", 6, 4)}${sprig("right", 6, 4)}
</svg>
`;

// At 16px leaves turn to noise: two bold braces, each with its knot node.
const tiny = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
  ${style}
  <path class="stem" d="M6 1.5C4 1.6 4.3 6.6 2.6 8 4.3 9.4 4 14.4 6 14.5M10 1.5C12 1.6 11.7 6.6 13.4 8 11.7 9.4 12 14.4 10 14.5" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle class="node" cx="1.3" cy="8" r="1.1"/><circle class="node" cx="14.7" cy="8" r="1.1"/>
</svg>
`;

writeFileSync(new URL("../design/favicon.svg", import.meta.url), full);
writeFileSync(new URL("../design/favicon-16.svg", import.meta.url), tiny);
console.log("wrote design/favicon.svg, design/favicon-16.svg");
