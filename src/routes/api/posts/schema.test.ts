import { describe, expect, it } from 'vitest';
import { postsCreateSchema } from './schema';

describe('postsCreateSchema', () => {
	it('should be defined', () => {
		expect(postsCreateSchema).toBeDefined();
	});
});
