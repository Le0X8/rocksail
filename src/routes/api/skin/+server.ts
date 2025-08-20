import { getSkinList, swapSkins } from '$lib/api/skin';
import { json } from '@sveltejs/kit';

export function GET() {
	return json(getSkinList());
}

export async function POST({ request }) {
	const { oldSkin, newSkin } = await request.json();
	if (!oldSkin && !newSkin) {
		return json({ error: 'Invalid request' }, { status: 400 });
	}

	swapSkins(oldSkin, newSkin);
	return json({ success: true });
}
