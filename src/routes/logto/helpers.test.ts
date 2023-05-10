import { describe, it, expect } from 'vitest';
import { isSvelteKitRedirect } from './helpers';
import { redirect } from '@sveltejs/kit';

describe('isSvelteKitRedirect', () => {
	it('should be defined', () => {
		expect(isSvelteKitRedirect).toBeDefined();
	});

	it('should return true for a valid redirect', () => {
		expect(isSvelteKitRedirect(redirect(302, 'babaooey'))).toBe(true);
	});
	it('should return false for an invalid redirect', () => {
		expect(isSvelteKitRedirect('meoowww :3')).toBe(false);
	});
});
