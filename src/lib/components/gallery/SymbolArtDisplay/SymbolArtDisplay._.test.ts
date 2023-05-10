// @vitest-environment jsdom
import SymbolArtDisplay from './SymbolArtDisplay.svelte';
import '@testing-library/jest-dom';
import { posts } from './SymbolArtDisplay.fixtures';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import type { Navigation, Page } from '@sveltejs/kit';
import { readable } from 'svelte/store';
import type * as stores from '$app/stores';

describe('SymbolArtDisplay', () => {
	vi.mock('$app/stores', (): typeof stores => {
		const getStores: typeof stores.getStores = () => {
			const navigating = readable<Navigation | null>(null);
			const page = readable<Page>({
				url: new URL('http://localhost'),
				params: {},
				route: {
					id: null
				},
				status: 200,
				error: null,
				data: { profile: { userId: 'testing' } },
				form: undefined
			});
			const updated = { subscribe: readable(false).subscribe, check: async () => false };

			return { navigating, page, updated };
		};

		const page: typeof stores.page = {
			subscribe(fn) {
				return getStores().page.subscribe(fn);
			}
		};
		const navigating: typeof stores.navigating = {
			subscribe(fn) {
				return getStores().navigating.subscribe(fn);
			}
		};
		const updated: typeof stores.updated = {
			subscribe(fn) {
				return getStores().updated.subscribe(fn);
			},
			check: async () => false
		};

		return {
			getStores,
			navigating,
			page,
			updated
		};
	});

	const post = posts[0];
	it('Should render properly with authentication', () => {
		render(SymbolArtDisplay, { post });
		expect(screen.getByText(post.title)).toBeInTheDocument();
		expect(screen.queryByText('Delete')).toBeInTheDocument();
	});
});
