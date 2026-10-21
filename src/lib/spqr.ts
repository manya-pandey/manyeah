// Geometry for the SPQR mark: two curly braces drawn as laurel sprigs, with
// circuit traces and node dots growing out of them like extra leaves. Pure
// functions, so the same shapes feed the page (SpqrMark.astro) and the tab
// icon (scripts/icons.ts).

type Pt = [number, number];

// A brace is two cubic arms meeting at the point in its middle.
// Coordinates are for the left brace in a 260×110 box; the right one mirrors.
const ARMS: [Pt, Pt, Pt, Pt][] = [
	[[42, 55], [49, 52], [50, 44], [51, 34]],
	[[51, 34], [52, 22], [55, 13], [66, 11]],
	[[42, 55], [49, 58], [50, 66], [51, 76]],
	[[51, 76], [52, 88], [55, 97], [66, 99]],
];

const at = ([p0, p1, p2, p3]: [Pt, Pt, Pt, Pt], t: number): Pt => {
	const u = 1 - t;
	return [0, 1].map(
		(k) => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k],
	) as Pt;
};

const tangent = ([p0, p1, p2, p3]: [Pt, Pt, Pt, Pt], t: number): number => {
	const u = 1 - t;
	const d = [0, 1].map(
		(k) => 3 * u * u * (p1[k] - p0[k]) + 6 * u * t * (p2[k] - p1[k]) + 3 * t * t * (p3[k] - p2[k]),
	);
	return (Math.atan2(d[1], d[0]) * 180) / Math.PI;
};

const f = (n: number) => Math.round(n * 10) / 10;

export interface Brace {
	stem: string;
	leaves: { x: number; y: number; angle: number; size: number }[];
	traces: string[];
	nodes: { x: number; y: number; r: number }[];
}

export function brace(side: "left" | "right", width = 260): Brace {
	const mx = (x: number) => (side === "left" ? x : width - x);
	const flip = side === "left" ? 1 : -1;
	const [a, b, c, d] = ARMS;
	const p = (pt: Pt) => `${f(mx(pt[0]))} ${f(pt[1])}`;
	const stem =
		`M${p(a[0])}C${p(a[1])} ${p(a[2])} ${p(a[3])}C${p(b[1])} ${p(b[2])} ${p(b[3])}` +
		`M${p(c[0])}C${p(c[1])} ${p(c[2])} ${p(c[3])}C${p(d[1])} ${p(d[2])} ${p(d[3])}`;

	// Leaves sit on the outer side of each arm and lean away from the knot in
	// the middle, the way two sprigs tied together fan out.
	const leaves: Brace["leaves"] = [];
	const traces: string[] = [];
	const nodes: Brace["nodes"] = [];
	// [arm, position along it, side]: "out" leans away from the letters,
	// "in" towards them, "trace" is a circuit branch ending in a node.
	const spots: [number, number, "out" | "in" | "trace"][] = [];
	for (const [short, long] of [
		[0, 1],
		[2, 3],
	]) {
		spots.push(
			[short, 0.35, "out"],
			[short, 0.75, "in"],
			[long, 0.12, "out"],
			[long, 0.3, "trace"],
			[long, 0.42, "in"],
			[long, 0.58, "out"],
			[long, 0.78, "in"],
			[long, 0.9, "out"],
		);
	}

	// Angles are worked out for the left brace (outer side = -x) and mirrored.
	const mirror = (deg: number) => (side === "left" ? deg : 180 - deg);
	spots.forEach(([arm, t, kind]) => {
		const curve = ARMS[arm];
		const [x, y] = at(curve, t);
		const upper = arm < 2;
		const along = tangent(curve, t); // knot towards tip
		if (kind === "trace") {
			const rad = (mirror(upper ? -150 : 150) * Math.PI) / 180;
			const ex = mx(x) + Math.cos(rad) * 9;
			const ey = y + Math.sin(rad) * 9;
			const hx = ex - 8 * flip;
			traces.push(`M${f(mx(x))} ${f(y)}L${f(ex)} ${f(ey)}H${f(hx)}`);
			nodes.push({ x: f(hx), y: f(ey), r: 1.8 });
			return;
		}
		const lean = (kind === "out" ? 1 : -1) * (upper ? -42 : 42);
		leaves.push({
			x: f(mx(x)),
			y: f(y),
			angle: f(mirror(along + lean)),
			size: kind === "out" ? 1.05 : 0.75,
		});
	});

	// The knot: a trace running out from the brace's point to a node, as on
	// the original mark, and nodes capping both tips.
	traces.push(`M${f(mx(42))} 55H${f(mx(14))}`);
	nodes.push({ x: f(mx(14)), y: 55, r: 2.6 });
	nodes.push({ x: f(mx(66)), y: 11, r: 2 }, { x: f(mx(66)), y: 99, r: 2 });

	return { stem, leaves, traces, nodes };
}

// A pointed leaf, 12 units long, from the origin along +x.
export const LEAF = "M0 0C3.4-3 8.4-3.2 12 0C8.4 3.2 3.4 3 0 0Z";
