// @vitest-environment jsdom
import SymbolArtDisplay from './SymbolArtDisplay.svelte';
import { posts } from './SymbolArtDisplay.fixtures';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

describe('SymbolArtDisplay', () => {
	posts.forEach((post) => {
		it('Should render properly', () => {
			render(SymbolArtDisplay, { post });
			expect(screen.getByText(post.title)).toBeInTheDocument();
			expect(screen.getByText('@' + post.author.name)).toBeInTheDocument();
			expect(screen.getByText('Download')).toHaveAttribute('href', post.fileUrl);
			expect(screen.getByRole('img')).toHaveAttribute('src', post.thumbnailUrl);
		});
	});
});
