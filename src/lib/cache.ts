import { DATA_PATH } from '$env/static/private';
import { existsSync, mkdirSync, readFileSync, renameSync, rmdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { Buffer } from 'node:buffer';

if (!existsSync(DATA_PATH)) {
	mkdirSync(DATA_PATH, { recursive: true });
}

export function cache<T>(key: string, fallback: () => T): T {
	if (existsSync(path.join(DATA_PATH, key + '.json'))) {
		return JSON.parse(readFileSync(path.join(DATA_PATH, key + '.json'), 'utf8'));
	}

	const data = fallback();
	writeFileSync(path.join(DATA_PATH, key + '.json'), JSON.stringify(data), 'utf8');
	return data;
}

export function cacheRaw(key: string, fallback: () => Buffer): Buffer {
	if (existsSync(path.join(DATA_PATH, key + '.dat'))) {
		return readFileSync(path.join(DATA_PATH, key + '.dat'));
	}

	const data = fallback();
	writeFileSync(path.join(DATA_PATH, key + '.dat'), data);
	return data;
}

export function provideTempDir(): string {
	const tempDir = path.join(DATA_PATH, 'temp');
	if (!existsSync(tempDir)) {
		mkdirSync(tempDir, { recursive: true });
	}
	return tempDir;
}

export function clearTempDir(): void {
	const tempDir = path.join(DATA_PATH, 'temp');
	if (existsSync(tempDir)) {
		rmdirSync(tempDir, { recursive: true });
	}
}

export function tempToRaw(key: string, file: string): Buffer {
	const tempDir = provideTempDir();
	const filePath = path.join(tempDir, file);
	renameSync(filePath, path.join(DATA_PATH, key + '.dat'));
	return readFileSync(path.join(DATA_PATH, key + '.dat'));
}

export function getTempFile(file: string): Buffer {
	const tempDir = provideTempDir();
	const filePath = path.join(tempDir, file);
	return readFileSync(filePath);
}
