import { cache, clearTempDir } from '$lib/cache';
import { getItemList, getItemList2 } from '$lib/items';
import { addFile, listFiles, removeFile } from '$lib/vrf';

export type Skin = {
	id: string;
	name: string;
};

export function getSkinList() {
	return cache('skins', () => {
		const ids = listFiles(
			'game/csgo/pak01_dir.vpk',
			'materials/models/weapons/customization/paints/vmats/'
		)
			.filter((file) => file.endsWith('.vmat_c'))
			.map((file) => file.replace('.vmat_c', ''));

		const items2 = getItemList2();
		const items = getItemList();

		return ids.map(
			(id) =>
				({
					id,
					name: items[items2[id]?.description_tag.slice(1) ?? id] ?? id
				}) as Skin
		);
	});
}

export function swapSkins(oldSkin: string, newSkin: string) {
	removeFile(
		'game/csgo/pak01_dir.vpk',
		`materials/models/weapons/customization/paints/vmats/${oldSkin}.vmat_c`,
		'old'
	);
	removeFile(
		'game/csgo/pak01_dir.vpk',
		`materials/models/weapons/customization/paints/vmats/${newSkin}.vmat_c`,
		'new'
	);

	addFile(
		'game/csgo/pak01_dir.vpk',
		`materials/models/weapons/customization/paints/vmats/${oldSkin}.vmat_c`,
		'new'
	);
	addFile(
		'game/csgo/pak01_dir.vpk',
		`materials/models/weapons/customization/paints/vmats/${newSkin}.vmat_c`,
		'old'
	);

	clearTempDir();
}
