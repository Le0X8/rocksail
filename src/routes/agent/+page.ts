import type { Agent } from '$lib/api/agent';

export async function load({ fetch }) {
	const response = await fetch('/api/agent');
	if (!response.ok) {
		throw new Error('Failed to load agents');
	}
	const agents = (await response.json()) as Agent[];
	return { agents };
}
