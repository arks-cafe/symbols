import { expect } from 'vitest';
import { getPostsCount } from '$lib/constants';
import { UserError } from '$lib/errors';

// Import types file for coverage
import '$lib/types';

test('miscellaneous exports', () => {
	expect(getPostsCount).toBeDefined();
	expect(UserError).toBeDefined();
});
