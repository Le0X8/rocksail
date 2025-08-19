import type { MusicKit } from '$lib/api/musickit.js';

export async function load({ fetch }) {
	const response = await fetch('/api/musickit');
	if (!response.ok) {
		throw new Error('Failed to load music kits');
	}
	const musicKits = (await response.json()) as MusicKit[];
	return { musicKits };
}
