import type { AuthContext } from "better-auth";
import { APIError } from "better-auth/api";

/** Lowercase a-z only; keep lists modest for Workers bundle size. */
const ADJECTIVES = [
	"calm",
	"swift",
	"quiet",
	"bright",
	"gentle",
	"wild",
	"ancient",
	"silent",
	"hollow",
	"golden",
	"silver",
	"frozen",
	"ember",
	"velvet",
	"crimson",
	"amber",
	"jade",
	"ivory",
	"rustic",
	"cosmic",
	"lunar",
	"solar",
	"timber",
	"marble",
	"granite",
	"coral",
	"azure",
	"olive",
	"sage",
	"noble",
	"humble",
	"keen",
	"bold",
	"soft",
	"clear",
	"deep",
	"high",
	"low",
	"far",
	"near",
] as const;

const NOUNS = [
	"river",
	"meadow",
	"harbor",
	"cipher",
	"beacon",
	"oracle",
	"compass",
	"harvest",
	"thistle",
	"willow",
	"cedar",
	"maple",
	"oak",
	"pine",
	"brook",
	"stone",
	"cloud",
	"flint",
	"quartz",
	"anchor",
	"vessel",
	"signal",
	"thread",
	"canvas",
	"ledger",
	"archive",
	"atlas",
	"vertex",
	"matrix",
	"vector",
	"pixel",
	"kernel",
	"socket",
	"packet",
	"token",
	"harbor",
	"ember",
	"ridge",
	"delta",
	"summit",
	"glacier",
	"prairie",
	"canyon",
	"fjord",
	"lagoon",
	"reef",
	"island",
] as const;

function randomUint32(): number {
	const buf = new Uint32Array(1);
	crypto.getRandomValues(buf);
	const v = buf[0];
	if (v === undefined) return 0;
	return v;
}

function pick<const T extends readonly string[]>(arr: T): T[number] {
	const i = randomUint32() % arr.length;
	const word = arr[i];
	if (word === undefined) return arr[0] as T[number];
	return word;
}

export function buildGeneratedUsernameCandidate(): string {
	const adj = pick(ADJECTIVES);
	const noun = pick(NOUNS);
	const suffix = (randomUint32() % 99_999) + 1;
	return `${adj}-${noun}(${suffix})`;
}

/** Matches server-generated handles: word-word(digits). */
export const GENERATED_USERNAME_PATTERN = /^[a-z]+-[a-z]+\(\d+\)$/;

export function isGeneratedUsernameFormat(username: string): boolean {
	return (
		username.length >= 5 &&
		username.length <= 64 &&
		GENERATED_USERNAME_PATTERN.test(username)
	);
}

const DEFAULT_MAX_ATTEMPTS = 32;

export async function assignUniqueUsername(
	authContext: AuthContext | null | undefined,
	maxAttempts = DEFAULT_MAX_ATTEMPTS,
): Promise<{ username: string; displayUsername: string }> {
	const adapter = authContext?.adapter;
	if (!adapter) {
		throw APIError.from("INTERNAL_SERVER_ERROR", {
			code: "USERNAME_GEN_CONTEXT",
			message: "Auth context unavailable for username generation.",
		});
	}

	for (let i = 0; i < maxAttempts; i++) {
		const candidate = buildGeneratedUsernameCandidate();
		const existing = await adapter.findOne({
			model: "user",
			where: [{ field: "username", value: candidate }],
		});
		if (!existing) {
			return { username: candidate, displayUsername: candidate };
		}
	}

	throw APIError.from("INTERNAL_SERVER_ERROR", {
		code: "USERNAME_GEN_EXHAUSTED",
		message: "Could not allocate a unique username.",
	});
}
