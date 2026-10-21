// Turns a binary STL scan into a small, Draco-compressed .glb for the statue.
//
//   npm run statue -- <in.stl> <out.glb> [triangles=120000] [rx ry rz degrees]
//
// The rotation is baked in so the output is Y-up and facing +Z, which is what
// src/components/Statue.astro expects. For a Z-up scan that's "-90 0 0".
import { readFileSync } from "node:fs";
import { Document, NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { draco, prune, simplify } from "@gltf-transform/functions";
import draco3d from "draco3dgltf";
import { MeshoptSimplifier } from "meshoptimizer";

const [, , input, output, target = "120000", rx = "0", ry = "0", rz = "0"] = process.argv;
if (!input || !output) {
	console.error("usage: npm run statue -- <in.stl> <out.glb> [triangles] [rx ry rz]");
	process.exit(1);
}

const stl = readFileSync(input);
const triangles = stl.readUInt32LE(80);
if (stl.length !== 84 + triangles * 50) {
	console.error("Only binary STL is supported.");
	process.exit(1);
}
const pos = new Float32Array(triangles * 9);
for (let i = 0; i < triangles; i++) {
	const offset = 84 + i * 50 + 12; // skip the facet normal
	for (let k = 0; k < 9; k++) pos[i * 9 + k] = stl.readFloatLE(offset + k * 4);
}

// Rotate (X, then Y, then Z).
const [ax, ay, az] = [rx, ry, rz].map((d) => (Number(d) * Math.PI) / 180);
for (let i = 0; i < pos.length; i += 3) {
	let [x, y, z] = [pos[i], pos[i + 1], pos[i + 2]];
	[y, z] = [y * Math.cos(ax) - z * Math.sin(ax), y * Math.sin(ax) + z * Math.cos(ax)];
	[x, z] = [x * Math.cos(ay) + z * Math.sin(ay), -x * Math.sin(ay) + z * Math.cos(ay)];
	[x, y] = [x * Math.cos(az) - y * Math.sin(az), x * Math.sin(az) + y * Math.cos(az)];
	pos.set([x, y, z], i);
}

// Centre and scale to 2 units, so Draco's quantisation grid is the same for any scan.
const min = [Infinity, Infinity, Infinity];
const max = [-Infinity, -Infinity, -Infinity];
for (let i = 0; i < pos.length; i += 3) {
	for (let k = 0; k < 3; k++) {
		min[k] = Math.min(min[k], pos[i + k]);
		max[k] = Math.max(max[k], pos[i + k]);
	}
}
const centre = min.map((m, k) => (m + max[k]) / 2);
const scale = 2 / Math.max(...max.map((m, k) => m - min[k]));
for (let i = 0; i < pos.length; i += 3) {
	for (let k = 0; k < 3; k++) pos[i + k] = (pos[i + k] - centre[k]) * scale;
}

// STL repeats every corner per triangle; weld them into an indexed mesh.
const ids = new Map();
const verts = [];
const indices = new Uint32Array(triangles * 3);
for (let v = 0; v < triangles * 3; v++) {
	const key = `${pos[v * 3].toFixed(5)},${pos[v * 3 + 1].toFixed(5)},${pos[v * 3 + 2].toFixed(5)}`;
	let id = ids.get(key);
	if (id === undefined) {
		id = verts.length / 3;
		ids.set(key, id);
		verts.push(pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]);
	}
	indices[v] = id;
}

const doc = new Document();
const buffer = doc.createBuffer();
const prim = doc
	.createPrimitive()
	.setAttribute(
		"POSITION",
		doc.createAccessor().setType("VEC3").setArray(new Float32Array(verts)).setBuffer(buffer),
	)
	.setIndices(doc.createAccessor().setType("SCALAR").setArray(indices).setBuffer(buffer));
doc.createScene().addChild(doc.createNode("statue").setMesh(doc.createMesh("statue").addPrimitive(prim)));

// Area-weighted smooth normals. (gltf-transform's normals() unwelds the mesh,
// which would undo most of the size saving.)
function smoothNormals(document) {
	const p = document.getRoot().listMeshes()[0].listPrimitives()[0];
	const P = p.getAttribute("POSITION").getArray();
	const I = p.getIndices().getArray();
	const N = new Float32Array(P.length);
	for (let t = 0; t < I.length; t += 3) {
		const [a, b, c] = [I[t] * 3, I[t + 1] * 3, I[t + 2] * 3];
		const e1 = [P[b] - P[a], P[b + 1] - P[a + 1], P[b + 2] - P[a + 2]];
		const e2 = [P[c] - P[a], P[c + 1] - P[a + 1], P[c + 2] - P[a + 2]];
		const n = [
			e1[1] * e2[2] - e1[2] * e2[1],
			e1[2] * e2[0] - e1[0] * e2[2],
			e1[0] * e2[1] - e1[1] * e2[0],
		];
		for (const v of [a, b, c]) for (let k = 0; k < 3; k++) N[v + k] += n[k];
	}
	for (let i = 0; i < N.length; i += 3) {
		const length = Math.hypot(N[i], N[i + 1], N[i + 2]) || 1;
		for (let k = 0; k < 3; k++) N[i + k] /= length;
	}
	p.setAttribute("NORMAL", document.createAccessor().setType("VEC3").setArray(N).setBuffer(buffer));
}

await MeshoptSimplifier.ready;
await doc.transform(
	simplify({
		simplifier: MeshoptSimplifier,
		ratio: Math.min(1, Number(target) / triangles),
		error: 0.002,
	}),
	smoothNormals,
	prune(),
	draco({ method: "edgebreaker", quantizePosition: 14, quantizeNormal: 10 }),
);

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
	"draco3d.encoder": await draco3d.createEncoderModule(),
	"draco3d.decoder": await draco3d.createDecoderModule(),
});
await io.write(output, doc);

const out = doc.getRoot().listMeshes()[0].listPrimitives()[0];
console.log(`${triangles} → ${out.getIndices().getCount() / 3} triangles, wrote ${output}`);
