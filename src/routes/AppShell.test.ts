import AppShell from './AppShell.svelte';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';
import html from 'svelte-htm';

const pageDataWithoutUser: App.PageData = {
	profile: null,
	user: null
};

const pageDataWithUser: App.PageData = {
	profile: {
		userId: 'test-id',
		name: 'test-name',
		createdAt: new Date(),
		updatedAt: new Date(),
		description: 'test-description'
	},
	user: {
		sub: 'test-id'
	}
};

let pageData: { data: App.PageData };

vi.mock('$app/stores', () => {
	const authenticatedPageStore = {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		subscribe: (fn: any) => {
			fn(pageData);
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
		browser: true
	};
});

describe('AppShell', () => {
	beforeEach(() => {
		vi.doUnmock('$app/environment');
	});

	it('Should render when not authenticated', async () => {
		pageData = { data: pageDataWithoutUser };

		render(html`<${AppShell}>this that content baybee</${AppShell}>`);
		expect(screen.getByRole('heading')).toHaveTextContent('Symbol Bucket');
		expect(screen.getByTitle('Home')).toHaveAttribute('href', '/');
		expect(screen.getByText('this that content baybee')).toBeInTheDocument();
		await fireEvent.click(screen.getByTitle('Account'));
		expect(screen.getByText('Sign In')).toHaveAttribute('href', '/logto/signin'); // DaisyUI drawer keeps this in the DOM even when closed.
	});

	it('Should render when authenticated', async () => {
		pageData = { data: pageDataWithUser };

		render(html`<${AppShell}>this that content baybee</${AppShell}>`);

		await fireEvent.click(screen.getByTitle('Account'));
		expect(screen.getByText('@test-name')).toBeInTheDocument(); // DaisyUI drawer keeps this in the DOM even when closed.
		expect(screen.getByText('Profile')).toHaveAttribute('href', '/users/test-id'); // DaisyUI drawer keeps this in the DOM even when closed.
		expect(screen.getByText('Sign Out')).toHaveAttribute('href', '/logto/signout'); // DaisyUI drawer keeps this in the DOM even when closed.
	});

	it('Should handle theme changes', async () => {
		pageData = { data: pageDataWithoutUser };

		render(html`<${AppShell}>this that content baybee</${AppShell}>`);

		await fireEvent.click(screen.getByTitle('Theme Settings'));
		expect(document.documentElement.dataset.theme).toBeUndefined();
		await fireEvent.click(screen.getByText('Light'));
		expect(document.documentElement.dataset.theme).toBe('light');
		await fireEvent.click(screen.getByText('Dark'));
		expect(document.documentElement.dataset.theme).toBe('dark');
		await fireEvent.click(screen.getByText('Use System Default'));
		expect(document.documentElement.dataset.theme).toBeUndefined();
	});
});
