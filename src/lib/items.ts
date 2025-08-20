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
