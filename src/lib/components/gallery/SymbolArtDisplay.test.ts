// @vitest-environment jsdom
import SymbolArtDisplay from './SymbolArtDisplay.svelte';
import '@testing-library/jest-dom';
import { posts } from '$routes/api/posts/fixtures';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';

let pageData: any;

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

describe('SymbolArtDisplay', () => {
	posts.forEach((post) => {
		it('Should render properly without delete button by default.', () => {
			// Set page's profile to empty object
			pageData = { data: { profile: {} } };

			render(SymbolArtDisplay, { post });
			expect(screen.getByText(post.title)).toBeInTheDocument();
			expect(screen.getByText('@' + post.author.name)).toBeInTheDocument();
			expect(screen.getByText('Download')).toHaveAttribute('href', post.fileUrl);
			expect(screen.getByRole('img')).toHaveAttribute('src', post.thumbnailUrl);
			expect(screen.queryByText('Delete')).not.toBeInTheDocument();
		});
	});
	posts.forEach((post) => {
		it('Should render properly', () => {
			// Set page's profile with userId to testing value from fixtures.
			pageData = { data: { profile: { userId: post.authorId } } };

			render(SymbolArtDisplay, { post });
			expect(screen.getByText(post.title)).toBeInTheDocument();
			expect(screen.getByText('@' + post.author.name)).toBeInTheDocument();
			expect(screen.getByText('Download')).toHaveAttribute('href', post.fileUrl);
			expect(screen.getByRole('img')).toHaveAttribute('src', post.thumbnailUrl);
			expect(screen.queryByText('Delete')).toBeInTheDocument();
		});
	});
});
