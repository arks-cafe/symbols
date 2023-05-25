import ThemeHandler from './ThemeHandler.svelte';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import html from 'svelte-htm';

const pageDataWithoutUser = {
	data: {
		profile: null,
		user: null
	}
};

vi.mock('$app/stores', () => {
	const authenticatedPageStore = {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		subscribe: (fn: any) => {
			fn(pageDataWithoutUser);
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			return () => {};
		}
	};
	return {
		page: authenticatedPageStore
	};
});

vi.mock('$app/environment', () => {
	return {
		browser: false
	};
});

describe('AppShell', () => {
	it('Should not access localstorage when not in browser', async () => {
		render(html`<${ThemeHandler} />`); //
	});
});
