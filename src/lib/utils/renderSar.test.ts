import renderSar, { convertRGBtoHex } from './renderSar';
import { describe, it, expect } from 'vitest';

import example from '$fixtures/example.json';

describe(
	'renderSar',
	() => {
		it('throws an error in test environment', async () => {
			await expect(renderSar(example)).rejects.toThrow();
		});
	},
	{ timeout: 10000 }
);

describe('convertRGBtoHex', () => {
	it('converts RGB to Hex', () => {
		expect(convertRGBtoHex(255, 255, 255)).toBe(0xffffff);
		expect(convertRGBtoHex(0, 255, 255)).toBe(0x00ffff);
	});
});
