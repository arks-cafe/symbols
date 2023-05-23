import AppShell from './AppShell.svelte';
import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import html from 'svelte-htm';

describe('AppShell', () => {
	it('should render', () => {
		render(AppShell);
		expect(screen.getByRole('heading')).toHaveTextContent('Symbol Bucket');
	});
	it('Should render slots', () => {
		render(html`<${AppShell}>this that content baybee</${AppShell}>`);
		expect(screen.getByRole('heading')).toHaveTextContent('Symbol Bucket');
		expect(screen.getByText('this that content baybee')).toBeInTheDocument();
	});
});
