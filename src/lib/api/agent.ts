import { cache, clearTempDir } from '$lib/cache';
import { getItemList } from '$lib/items';
import { addFile, listFiles, removeFile } from '$lib/vrf';

export type Agent = {
	id: string;
	name: string;
	side: 'T' | 'CT';
};

export function listAgents() {
	return cache('agents', () => {
		const ids = Array.from(
			new Set(
				listFiles('game/csgo/pak01_dir.vpk', 'characters/models/')
					.filter((file) => file.includes('/'))
					.map((file) => file.split('/')[1])
					.filter((file) => file.endsWith('.vmdl_c'))
					.map((file) => file.replace('.vmdl_c', ''))
			)
		);

		const items = getItemList();

		return ids.map(
			(id) =>
				({
					id,
					name:
						items['CSGO_Customplayer_' + id] ??
						items['CSGO_CustomPlayer_' + id] ??
						(id === 'ctm_sas' ? 'Default CT Agent' : id === 'tm_phoenix' ? 'Default T Agent' : id),
					side: id.startsWith('ctm_') ? 'CT' : 'T'
				}) as Agent
		);
	});
}

export function swapAgents(oldAgent: string, newAgent: string) {
	removeFile(
		'game/csgo/pak01_dir.vpk',
		`characters/models/${oldAgent.split('_', 2).join('_')}/${oldAgent}.vmdl_c`,
		'old'
	);
	removeFile(
		'game/csgo/pak01_dir.vpk',
		`characters/models/${newAgent.split('_', 2).join('_')}/${newAgent}.vmdl_c`,
		'new'
	);

	addFile(
		'game/csgo/pak01_dir.vpk',
		`characters/models/${oldAgent.split('_', 2).join('_')}/${oldAgent}.vmdl_c`,
		'new'
	);
	addFile(
		'game/csgo/pak01_dir.vpk',
		`characters/models/${newAgent.split('_', 2).join('_')}/${newAgent}.vmdl_c`,
		'old'
	);

	clearTempDir();
}
