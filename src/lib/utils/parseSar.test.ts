import parseSar from './parseSar';

import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

import example from '$fixtures/example.json';

describe('parseSar', () => {
	it('should parse sar files given a File with arrayBuffer()', async () => {
		console.log(__dirname);
		const fixturePath = path.join(__dirname, '..', '..', '..', 'tests', 'fixtures', 'example.sar');
		console.log(fixturePath);

		// ? This implementation sucks but oh well lmao
		const sar = fs.readFileSync(fixturePath);
		const sarAsFile = {
			arrayBuffer: async () => sar
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const parsed = await parseSar(sarAsFile as any satisfies File);
		expect(parsed).toEqual(example);
	});
	it('should throw an error if the sar file is invalid', async () => {
		const fixturePath = path.join(__dirname, '..', '..', '..', 'tests', 'fixtures', 'invalid.sar');
		const sar = fs.readFileSync(fixturePath);
		const sarAsFile = {
			arrayBuffer: async () => sar
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await expect(parseSar(sarAsFile as any satisfies File)).rejects.toThrow();
	});
});
