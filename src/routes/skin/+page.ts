import type { Skin } from '$lib/api/skin';

export async function load({ fetch }) {
	const response = await fetch('/api/skin');
	if (!response.ok) {
		throw new Error('Failed to load skins');
	}
	const skins = ((await response.json()) as Skin[]).sort((a, b) => a.name.localeCompare(b.name));
	return { skins };
}
