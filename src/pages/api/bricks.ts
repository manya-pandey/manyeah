import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

const COUNT_KEY = "count";
// Per-visitor limit, so one person can't hold the button down and pave the city.
const LIMIT_PER_MINUTE = 12;

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		status,
		headers: { "content-type": "application/json", "cache-control": "no-store" },
	});

async function readCount(kv: KVNamespace) {
	return Number((await kv.get(COUNT_KEY)) ?? 0) || 0;
}

export const GET: APIRoute = async () => {
	return json({ count: await readCount(env.BRICKS) });
};

export const POST: APIRoute = async ({ request }) => {
	const kv = env.BRICKS;
	const ip = request.headers.get("cf-connecting-ip") ?? "local";
	const rateKey = `rate:${ip}`;
	const recent = Number((await kv.get(rateKey)) ?? 0) || 0;
	if (recent >= LIMIT_PER_MINUTE) {
		return json({ count: await readCount(kv), error: "slow down, the mortar needs to set" }, 429);
	}
	await kv.put(rateKey, String(recent + 1), { expirationTtl: 60 });

	// KV has no atomic increment; two bricks laid in the same instant may
	// land as one. Fine for a guestbook-of-bricks.
	const count = (await readCount(kv)) + 1;
	await kv.put(COUNT_KEY, String(count));
	return json({ count });
};
