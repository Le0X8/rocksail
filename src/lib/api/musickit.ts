import { cache, clearTempDir } from '$lib/cache';
import { getItemList } from '$lib/items';
import { addFolder, listFiles, removeFolder } from '$lib/vrf';

export type MusicKit = {
	id: string;
	name: string;
};

export function listMusicKits() {
	return cache('music-kits', () => {
		const ids = Array.from(
			new Set(
				listFiles('game/csgo/pak01_dir.vpk', 'sounds/music/')
					.filter((file) => file.includes('/'))
					.map((file) => file.split('/')[0])
			)
		);
		const items = getItemList();

		return ids.map((id) => {
			console.log(id);
			return {
				id,
				name: items['musickit_' + id] ?? id
			} as MusicKit;
		});
	});
}

export function swapMusicKits(oldKit: string, newKit: string) {
	removeFolder('game/csgo/pak01_dir.vpk', `sounds/music/${oldKit}`, 'old');
	removeFolder('game/csgo/pak01_dir.vpk', `sounds/music/${newKit}`, 'new');

	addFolder('game/csgo/pak01_dir.vpk', `sounds/music/${oldKit}`, 'new');
	addFolder('game/csgo/pak01_dir.vpk', `sounds/music/${newKit}`, 'old');

	clearTempDir();
}
