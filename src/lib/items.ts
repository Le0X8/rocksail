import { cache, clearTempDir, getTempFile } from '$lib/cache';
import { getFile } from '$lib/vrf';
import { parse } from 'vdf';

export function getItemList() {
	return cache('items', () => {
		getFile('game/csgo/pak01_dir.vpk', 'resource/csgo_english.txt');
		const file = getTempFile('resource/csgo_english.txt').toString('utf8');
		clearTempDir();
		return parse(file).lang.Tokens as Record<string, string>;
	});
}

export function getItemList2() {
	return cache('items2', () => {
		getFile('game/csgo/pak01_dir.vpk', 'scripts/items/items_game.txt');
		const file = getTempFile('scripts/items/items_game.txt').toString('utf8');
		clearTempDir();
		return Object.fromEntries(
			Object.values(
				parse(file).items_game.paint_kits as Record<string, Record<string, string>>
			).map((item) => [item.name, item])
		) as Record<string, Record<string, string>>;
	});
}
