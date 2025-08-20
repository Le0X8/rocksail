import { listAgents, swapAgents } from '$lib/api/agent';
import { json } from '@sveltejs/kit';

export function GET() {
	return json(listAgents());
}

export async function POST({ request }) {
	const { oldAgent, newAgent } = await request.json();
	if (!oldAgent && !newAgent) {
		return json({ error: 'Invalid request' }, { status: 400 });
	}

	swapAgents(oldAgent, newAgent);
	return json({ success: true });
}
