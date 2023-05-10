import { describe, it, expect } from 'vitest';
import { getPostsCount } from '$lib/constants';
import { UserError } from '$lib/errors';

test('miscellaneous exports', () => {
	expect(getPostsCount).toBeDefined();
	expect(UserError).toBeDefined();
});
