/**
 * Deterministic palette slot for a chat participant in a room.
 *
 * Pass a stable per-user key (ideally `session.user.id` once messages carry it).
 * Until then, `message.author` keeps colors stable across clients for a given display name.
 */
export const USERNAME_PALETTE_SIZE = 16;

export function usernamePaletteIndex(userKey: string, roomId: string): number {
	const s = `${userKey}\0${roomId}`;
	let h = 2_166_136_261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16_777_619);
	}
	// FNV-1a yields unsigned 32-bit; force non-negative for %.
	return (h >>> 0) % USERNAME_PALETTE_SIZE;
}
