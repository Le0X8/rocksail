import { listMusicKits, swapMusicKits } from '$lib/api/musickit';
import { json } from '@sveltejs/kit';

export function GET() {
	return json(listMusicKits());
}

export async function POST({ request }) {
	const { oldKit, newKit } = await request.json();
	if (!oldKit && !newKit) {
		return json({ error: 'Invalid request' }, { status: 400 });
	}

	swapMusicKits(oldKit, newKit);
	return json({ success: true });
}
