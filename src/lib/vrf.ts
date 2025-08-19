import { STEAM_DIR, VPKEDITCLI_PATH, VRFCLI_PATH } from '$env/static/private';
import { provideTempDir } from '$lib/cache';
import { execSync } from 'node:child_process';
import { renameSync } from 'node:fs';
import path from 'node:path';

export function listFiles(file: string, prefix: string): string[] {
	const files = execSync(`${VRFCLI_PATH} -i "${file}" -f "${prefix}" -l`, {
		cwd: path.join(STEAM_DIR, 'common', 'Counter-Strike Global Offensive')
	});
	return files
		.toString('utf8')
		.trim()
		.split('\n')
		.map((line) => line.split(' CRC:')[0].replace(prefix, ''));
}

export function getFile(file: string, prefix: string) {
	execSync(`${VRFCLI_PATH} -i "${file}" -f "${prefix}" -o "${path.resolve(provideTempDir())}"`, {
		cwd: path.join(STEAM_DIR, 'common', 'Counter-Strike Global Offensive')
	});
}

export function removeFolder(file: string, prefix: string, local: string) {
	getFile(file, prefix);
	renameSync(path.join(provideTempDir(), prefix), path.join(provideTempDir(), local));
	execSync(`${VPKEDITCLI_PATH} "${file}" --remove-dir "${prefix}"`, {
		cwd: path.join(STEAM_DIR, 'common', 'Counter-Strike Global Offensive')
	});
}

export function addFolder(file: string, prefix: string, local: string) {
	execSync(
		`${VPKEDITCLI_PATH} "${file}" --add-dir "${path.resolve(path.join(provideTempDir(), local))}" "${prefix}"`,
		{
			cwd: path.join(STEAM_DIR, 'common', 'Counter-Strike Global Offensive')
		}
	);
}
