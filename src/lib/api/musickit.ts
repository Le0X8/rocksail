import { cache, clearTempDir, getTempFile } from '$lib/cache';
import { addFolder, getFile, listFiles, removeFolder } from '$lib/vrf';
import { parse } from 'vdf';

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
		const items = cache('items', () => {
			getFile('game/csgo/pak01_dir.vpk', 'resource/csgo_english.txt');
			const file = getTempFile('resource/csgo_english.txt').toString('utf8');
			clearTempDir();
			return parse(file).lang.Tokens as Record<string, string>;
		});

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
